import { createReducer, on } from "@ngrx/store";
import { masterCoursesInitialState, MasterCoursesState } from "./master-courses.state";
import { getMasterCoursesSuccess } from "./master-courses.action";

export const masterCoursesReducer = createReducer(
    masterCoursesInitialState,

    on(getMasterCoursesSuccess, (state, action): MasterCoursesState => {
        return {
            ...state,
            courses: action.courses
        };
    })
);
