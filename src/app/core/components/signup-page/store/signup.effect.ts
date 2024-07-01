import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { signup, signupFailure, signupSuccess } from "./signup.action";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class SignupEffect {

    router = inject(Router);
    actions$ = inject(Actions);
    authService = inject(AuthService);

    signup$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signup),
            exhaustMap((action) => {
                return this.authService.signup(action.userType, action.firstName, action.lastName, action.emailId, action.password)
                    .pipe(
                        map((response) => {
                            if (response.status === 200 && this.authService.isBrowser()) {
                                alert("Account created successfully");
                                this.router.navigate(['/login']);
                                return signupSuccess({
                                    userType: action.userType,
                                    firstName: action.firstName,
                                    lastName: action.lastName,
                                    emailId: action.emailId,
                                    password: action.password
                                });
                            } else {
                                const error = new HttpErrorResponse({
                                    status: response.status,
                                    statusText: response.statusText,
                                    url: response.url || '',
                                });
                                return signupFailure({ error });
                            }
                        }),
                        catchError((error) => {
                            return of(signupFailure({ error }));
                        })
                    );
            })
        );
    });

    signupFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signupFailure),
            tap((action) => {
                if (action.error.status === 409) {
                    alert("Email already registered");
                } else {
                    alert('Signup failed with status: ' + action.error.status);
                }
            })
        );
    }, { dispatch: false });
}
