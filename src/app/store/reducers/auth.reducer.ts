import { AuthState } from "src/app/models/auth-state.model";
import { User } from "src/app/models/user.model";
import * as AuthActions from "../actions/auth.actions";


const initialState: AuthState = {
    user: null,
    authError: null,
    isLoading: false
};


export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN_SUCCESS:
            const loggedInUser = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);

            return {
                ...state,
                user: loggedInUser,
                authError: null,
                isLoading: false
            };

        case AuthActions.LOGOUT:
            return {
                ...state,
                authError: null,
                user: null
            };

        case AuthActions.LOGIN_START:
        case AuthActions.SIGNUP_START:
            return {
                ...state,
                authError: null,
                isLoading: true
            };

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                authError: action.payload,
                user: null,
                isLoading: false
            };

        case AuthActions.CLEAR_ERROR:
            return {
                ...state,
                authError: null
            };

        default:
            return state; 
    };
};