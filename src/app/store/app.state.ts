import { AuthState } from "./auth/auth.state";
import { CoursesState } from "./courses/courses.state";
import { MasterCoursesState } from "./master-courses/master-courses.state";
import { SignupState } from "./signup/signup.state";

export interface AppState {
    auth: AuthState,
    signup: SignupState,
    courses: CoursesState,
    masterCourses: MasterCoursesState
}