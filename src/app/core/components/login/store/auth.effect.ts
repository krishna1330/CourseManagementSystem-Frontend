import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../../services/auth.service";
import { login, loginFailure, loginSuccess } from "./auth.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { ILoginResponse } from "../../../models/loginResponse.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class AuthEffect {

    router = inject(Router);
    actions$ = inject(Actions);
    authService = inject(AuthService);

    constructor() { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(login),
            exhaustMap((action) => {
                return this.authService.login(action.emailId, action.password).pipe(
                    map((response) => {
                        if (response.status === 200 && this.authService.isBrowser()) {
                            const user: ILoginResponse = {
                                token: response.body?.token ?? '',
                                userId: response.body?.userId ?? 0,
                                userType: response.body?.userType ?? '',
                                firstName: response.body?.firstName ?? '',
                                lastName: response.body?.lastName ?? '',
                                emailId: response.body?.emailId ?? '',
                                mobile: response.body?.mobile ?? ''
                            };

                            this.authService.saveToLocalStorage(user);
                            alert("Login Successful");
                            this.router.navigate(['/home']);
                            return loginSuccess({ user });
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });

                            return loginFailure({ error });
                        }
                    }),
                    catchError((error) => {
                        return of(loginFailure({ error }));
                    })
                );
            })
        );
    });

    loginFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(loginFailure),
            tap((action) => {
                if (action.error.status === 401) {
                    alert("Invalid credentials");
                }

                else {
                    alert("Login Failed");
                }
            })
        );
    }, { dispatch: false });
}
