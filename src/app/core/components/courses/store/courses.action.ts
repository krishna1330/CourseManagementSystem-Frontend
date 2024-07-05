import { HttpErrorResponse } from "@angular/common/http";
import { createAction, props } from "@ngrx/store";
import { ICourses } from "../../../models/courses.model";

export const getCourses = createAction('[courses] get courses');

export const getCoursesSuccess = createAction(
    '[courses] get courses success',
    props<{ courses: ICourses[] }>()
)

export const getCoursesFailure = createAction(
    '[courses] get courses failure',
    props<{ error: HttpErrorResponse }>()
)