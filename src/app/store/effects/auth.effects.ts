import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, filter, map, of, switchMap, tap } from "rxjs";
import { AuthResponseData } from "src/app/models/auth-response-data";
import { User } from "src/app/models/user.model";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import * as AuthActions from '../actions/auth.actions';


@Injectable()
export class AuthEffects {
    authRedirect$ = createEffect(
        () => this.actions$.pipe(ofType(AuthActions.LOGIN_SUCCESS),
        tap(
            (loginAction: AuthActions.Login) => {
                if(loginAction.payload.redirect) {
                    this.router.navigateByUrl('/');
                };
            })
        ),
        {dispatch: false}
    );

    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGIN_START),
            switchMap((authData: AuthActions.LoginStart) => {
                return this.http.post<AuthResponseData>(`${environment.firebaseAuthLoginURL}${environment.firebaseApiKey}`,
                {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                }).pipe(
                    tap(resData => {
                        const userTokenExpiration = (+resData.expiresIn) * 1000;
                        this.authService.setLogoutTimer(userTokenExpiration);
                    }),

                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse)
                    })
                );
            }),
        );
    });

    authSignup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.SIGNUP_START),
            switchMap((signupAction: AuthActions.SignupStart) => {
                return this.http.post<AuthResponseData>(`${environment.firebaseAuthSignUpURL}${environment.firebaseApiKey}`,
                    {
                        email: signupAction.payload.email,
                        password: signupAction.payload.password,
                        returnSecureToken: true
                    }
                ).pipe(
                    tap(resData => {
                        const userTokenExpiration = (+resData.expiresIn) * 1000;
                        this.authService.setLogoutTimer(userTokenExpiration);
                    }),
                    map(resData => {
                        return handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
                    }),
                    catchError(errorResponse => {
                        return handleError(errorResponse)
                    })
                );
            })
        );
    });

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.LOGOUT),
            tap(() => {
                this.authService.clearLogoutTimer();
                localStorage.removeItem('userData');
                this.router.navigateByUrl('/signin');
            })
        )
    }, {dispatch: false}
    );

    autoLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.AUTO_LOGIN),
            map(() => {
                const userData: {
                    email: string,
                    id: string,
                    _token: string,
                    _tokenExpirationDate: string,
                } = JSON.parse(localStorage.getItem('userData'));
                if (userData) {
                    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

                    if(loadedUser.token) {
                        const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                        this.authService.setLogoutTimer(expirationDuration);

                        return new AuthActions.Login({
                            email: loadedUser.email,
                            userId: loadedUser.id,
                            token: loadedUser.token,
                            expirationDate: new Date(userData._tokenExpirationDate),
                            redirect: false
                        }); 
                    };
                };
                return undefined;
            }),
            filter(action => !!action)
        );
    });

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService
    ) {};
};

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user) || null);

    return new AuthActions.Login({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
        redirect: true
    });
};

const handleError = (errorResponse: any) => {
    let errorMessage = 'An unknown error occurred.';
    if(!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.LoginFail(errorMessage));
    };
    switch(errorResponse.error.error.message) {
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid or the user does not have a password.';
            break;
        case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.';
            break;
        case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.';
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
    };
    return of(new AuthActions.LoginFail(errorMessage));
};