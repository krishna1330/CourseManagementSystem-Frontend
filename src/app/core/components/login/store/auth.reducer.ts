import { createReducer, on } from "@ngrx/store";
import { AuthState, authInitialState } from "./auth.state";
import { loginSuccess } from "./auth.action";

export const authReducer = createReducer(
    authInitialState,

    on(loginSuccess, (state, action): AuthState => {
        return {
            ...state,
            user: action.user
        };
    })
);
