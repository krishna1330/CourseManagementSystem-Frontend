import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { ICourses } from "../../core/models/courses.model";

export const getMasterCourses = createAction(
    '[Master Courses] get master courses',
    props<{ masterId: number; }>()
);

export const getMasterCoursesSuccess = createAction(
    '[Master Courses] get master courses success',
    props<{ courses: ICourses[] }>()
)

export const getMasterCoursesFailure = createAction(
    '[Master Courses] get master courses failure',
    props<{ error: HttpErrorResponse }>()
)

export const createCourse = createAction(
    '[Master Courses] Create Course',
    props<{ formData: FormData }>()
);

export const createCourseSuccess = createAction(
    '[Master Courses] create course success',
    props<{ course: ICourses }>()
);

export const createCourseFailure = createAction(
    '[Master Courses] create course failure',
    props<{ error: HttpErrorResponse }>()
)