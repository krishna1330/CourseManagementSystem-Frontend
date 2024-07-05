import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { ICourses } from "../../../models/courses.model";

export const getMasterCourses = createAction(
    '[Master Courses] get master courses',
    props<{ masterId: number; }>()
);

export const getMasterCoursesSuccess = createAction(
    '[Master Courses] get master courses success',
    props<{  courses: ICourses[] }>()
)

export const getMasterCoursesFailure = createAction(
    '[Master Courses] get master courses failure',
    props<{ error: HttpErrorResponse }>()
)