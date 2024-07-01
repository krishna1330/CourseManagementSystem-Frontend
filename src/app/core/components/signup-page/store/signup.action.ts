import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";

export const signup = createAction(
    '[Signup] signup',
    props<{
        userType: string;
        firstName: string;
        lastName: string;
        emailId: string;
        password: string
    }>()
);

export const signupSuccess = createAction(
    '[Signup] signup success',
    props<{
        userType: string;
        firstName: string;
        lastName: string;
        emailId: string;
        password: string
    }>()
)

export const signupFailure = createAction(
    '[Signup] signup failure',
    props<{ error: HttpErrorResponse }>()
)