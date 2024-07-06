import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store, select } from '@ngrx/store';
import { CoursesService } from "../../core/services/courses.service";
import { getCourses, getCoursesFailure, getCoursesSuccess } from "./courses.action";
import { catchError, map, mergeMap, of, tap, withLatestFrom } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { selectAllCourses } from "./courses.selector";

@Injectable()
export class CoursesEffect {

    actions$ = inject(Actions);
    coursesService = inject(CoursesService);
    store = inject(Store);

    getCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCourses),
            withLatestFrom(this.store.pipe(select(selectAllCourses))),
            mergeMap(([action, loaded]) => {
                if (loaded) {
                    return of({ type: '[Courses] No Operation' });
                }
                return this.coursesService.GetCourses().pipe(
                    map((response) => {
                        if (response.status === 200) {
                            return getCoursesSuccess({ courses: response.body! });
                        } else {
                            const error = new HttpErrorResponse({
                                status: response.status,
                                statusText: response.statusText,
                                url: response.url || '',
                            });
                            return getCoursesFailure({ error });
                        }
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(getCoursesFailure({ error }));
                    })
                );
            })
        );
    });

    getCoursesFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCoursesFailure),
            tap((action) => {
                console.log("Failed to get courses" + action.error.message);
            })
        );
    }, { dispatch: false });
}
