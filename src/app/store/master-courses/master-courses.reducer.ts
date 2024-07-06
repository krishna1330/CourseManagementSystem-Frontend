import { createReducer, on } from "@ngrx/store";
import { masterCoursesInitialState, MasterCoursesState } from "./master-courses.state";
import { createCourseSuccess, getMasterCoursesSuccess } from "./master-courses.action";

export const masterCoursesReducer = createReducer(
    masterCoursesInitialState,

    on(getMasterCoursesSuccess, (state, action): MasterCoursesState => {
        return {
            ...state,
            courses: action.courses
        };
    }),

    on(createCourseSuccess, (state, action): MasterCoursesState => {
        return {
            ...state,
            courses: state.courses ? [...state.courses, action.course] : [action.course]
        };
    })
);
