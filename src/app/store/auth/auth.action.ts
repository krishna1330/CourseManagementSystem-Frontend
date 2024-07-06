import { createAction, props } from "@ngrx/store";
import { ILoginResponse } from "../../core/models/loginResponse.model";
import { HttpErrorResponse } from "@angular/common/http";

export const login = createAction(
    '[Auth] login',
    props<{ emailId: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] login success',
    props<{ user: ILoginResponse }>()
)

export const loginFailure = createAction(
    '[Auth] login failure',
    props<{ error: HttpErrorResponse }>()
)