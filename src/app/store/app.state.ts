import { CoursesState } from "../core/components/courses/store/courses.state";
import { AuthState } from "../core/components/login/store/auth.state";
import { MasterCoursesState } from "../core/components/master-courses/store/master-courses.state";
import { SignupState } from "../core/components/signup-page/store/signup.state";

export interface AppState {
    auth: AuthState,
    signup: SignupState,
    courses: CoursesState,
    masterCourses: MasterCoursesState
}