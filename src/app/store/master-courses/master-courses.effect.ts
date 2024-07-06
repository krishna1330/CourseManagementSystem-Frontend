import { inject, Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { getMasterCourses, getMasterCoursesSuccess, getMasterCoursesFailure, createCourse, createCourseSuccess, createCourseFailure } from "./master-courses.action";
import { exhaustMap, map, catchError, tap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ICourses } from "../../core/models/courses.model";
import { selectMasterCourses } from "./master-courses.selector";
import { Store } from "@ngrx/store";
import { CoursesService } from "../../core/services/courses.service";
import { response } from "express";
import { Router } from "@angular/router";

@Injectable()
export class MasterCoursesEffect {
    actions$ = inject(Actions);
    coursesService = inject(CoursesService);
    store = inject(Store);

    getMasterCourses$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getMasterCourses),
            withLatestFrom(this.store.select(selectMasterCourses)),
            exhaustMap(([action, courses]) => {
                if (courses && courses.length > 0) {
                    return of(getMasterCoursesSuccess({ courses }));
                } else {
                    return this.coursesService.GetMasterCourses(action.masterId).pipe(
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

    createCourse$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourse),
            exhaustMap((action) => {
                return this.coursesService.CreateCourse(action.formData)
                    .pipe(
                        map((response: HttpResponse<ICourses>) => {
                            if (response.status === 200) {
                                alert('Course created successuuly');
                                const course: ICourses = {
                                    courseId: response.body?.courseId ?? 0,
                                    courseName: response.body?.courseName ?? '',
                                    masterId: response.body?.masterId ?? 0,
                                    masterName: response.body?.masterName ?? '',
                                    coursePrice: response.body?.coursePrice ?? 0,
                                    courseAccessDurationInMonths: response.body?.courseAccessDurationInMonths ?? 0,
                                    courseLanguage: response.body?.courseLanguage ?? '',
                                    courseCreatedDate: response.body?.courseCreatedDate ? new Date(response.body.courseCreatedDate) : new Date(),
                                    thumbnail: response.body?.thumbnail ?? ''
                                }
                                return createCourseSuccess({ course: course });
                            } else {
                                return createCourseFailure({ error: new HttpErrorResponse({ status: response.status, statusText: response.statusText }) });
                            }
                        }),
                        catchError((error: HttpErrorResponse) => of(createCourseFailure({ error })))
                    );
            })
        );
    });

    createCourseFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createCourseFailure),
            tap((action) => {
                console.log('Failed to create courses');
            })
        );
    }, { dispatch: false });
}
