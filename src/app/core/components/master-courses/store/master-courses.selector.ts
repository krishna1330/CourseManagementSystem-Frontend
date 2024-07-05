import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MasterCoursesState } from './master-courses.state';

export const selectMasterCoursesState = createFeatureSelector<MasterCoursesState>('masterCourses');

export const selectMasterCourses = createSelector(
  selectMasterCoursesState,
  (state: MasterCoursesState) => state.courses
);
