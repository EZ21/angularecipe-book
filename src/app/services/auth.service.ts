import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromAppState from '../models/app-state.model';
import * as AuthActions from '../store/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseApiKey = environment.firebaseApiKey;
  firebaseAuthSignUpURL: string = `${environment.firebaseAuthSignUpURL}${this.firebaseApiKey}`;
  firebaseAuthLoginURL: string = `${environment.firebaseAuthLoginURL}${this.firebaseApiKey}`;
  private idTokenExpirationTimer: any;

  constructor(private store: Store<fromAppState.AppState>) { };

  setLogoutTimer(expirationDuration: number) {
    this.idTokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationDuration);
  };

  clearLogoutTimer() {
    if (this.idTokenExpirationTimer) {
      clearTimeout(this.idTokenExpirationTimer);
      this.idTokenExpirationTimer = null;
    };
  };
};