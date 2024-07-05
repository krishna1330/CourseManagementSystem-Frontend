import { ICourses } from "../../../models/courses.model";

export interface MasterCoursesState {
    courses: ICourses[] | null
}

export const masterCoursesInitialState: MasterCoursesState = {
    courses: null
};