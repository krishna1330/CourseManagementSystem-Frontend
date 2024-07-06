import { authReducer } from "./auth/auth.reducer";
import { coursesReducer } from "./courses/courses.reducer";
import { masterCoursesReducer } from "./master-courses/master-courses.reducer";
import { signupReducer } from "./signup/signup.reducer";

export const appReducer = {
    auth: authReducer,
    signup: signupReducer,
    courses: coursesReducer,
    masterCourses: masterCoursesReducer
}