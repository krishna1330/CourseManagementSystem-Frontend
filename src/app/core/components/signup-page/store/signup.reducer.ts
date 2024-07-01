import { createReducer, on } from "@ngrx/store";
import { SignupState, signupInitialState } from "./signup.state";
import { signupSuccess } from "./signup.action";

export const signupReducer = createReducer(
    signupInitialState,

    on(signupSuccess, (state, action): SignupState => {
        return {
            ...state,
            userType: action.userType,
            firstName: action.firstName,
            lastName: action.lastName,
            emailId: action.emailId
        };
    })
);