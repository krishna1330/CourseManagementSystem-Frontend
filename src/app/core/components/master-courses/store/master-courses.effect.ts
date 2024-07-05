import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MasterCoursesService } from "../../../services/master-courses.service";
import { getMasterCourses, getMasterCoursesSuccess, getMasterCoursesFailure } from "./master-courses.action";
import { exhaustMap, map, catchError, tap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ICourses } from "../../../models/courses.model";
import { selectMasterCourses } from "./master-courses.selector";
import { Store } from "@ngrx/store";

@Injectable()
export class MasterCoursesEffect {
    actions$ = inject(Actions);
    masterCoursesService = inject(MasterCoursesService);
    store = inject(Store);

    getMasterCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getMasterCourses),
            withLatestFrom(this.store.select(selectMasterCourses)),
            exhaustMap(([action, courses]) => {
                if (courses && courses.length > 0) {
                    return of(getMasterCoursesSuccess({ courses }));
                } else {
                    return this.masterCoursesService.GetMasterCourses(action.masterId).pipe(
                        map((response: HttpResponse<ICourses[]>) => {
                            if (response.status === 200) {
                                return getMasterCoursesSuccess({ courses: response.body as ICourses[] });
                            } else {
                                return getMasterCoursesFailure({ error: new HttpErrorResponse({ status: response.status, statusText: response.statusText }) });
                            }
                        }),
                        catchError((error: HttpErrorResponse) => of(getMasterCoursesFailure({ error })))
                    );
                }
            })
        );
    });

    getMasterCoursesFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getMasterCoursesFailure),
            tap((action) => {
                console.log('Failed to load courses');
            })
        );
    }, { dispatch: false });
}
