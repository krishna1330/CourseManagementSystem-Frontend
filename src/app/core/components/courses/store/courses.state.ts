import { ICourses } from "../../../models/courses.model";

export interface CoursesState {
    courses: ICourses[] | null;
}

export const coursesInitialState: CoursesState = {
    courses: null,
}