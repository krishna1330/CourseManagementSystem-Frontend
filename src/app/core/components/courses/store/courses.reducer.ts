import { createReducer, on } from "@ngrx/store";
import { CoursesState, coursesInitialState } from "./courses.state";
import { getCoursesSuccess } from "./courses.action";

export const coursesReducer = createReducer(
    coursesInitialState,

    on(getCoursesSuccess, (state, action): CoursesState => {
        return {
            ...state,
            courses: action.courses,
        };
    })
);