import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./courses.state";

export const coursesStateSelector = createFeatureSelector<CoursesState>('courses');

export const selectAllCourses = createSelector(
    coursesStateSelector,
    (state: CoursesState) => state.courses
);