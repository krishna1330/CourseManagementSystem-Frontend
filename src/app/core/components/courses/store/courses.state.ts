import { ICourses } from "../../../models/courses";

export interface CoursesState {
    courses: ICourses[] | null;
}

export const coursesInitialState: CoursesState = {
    courses: null,
}