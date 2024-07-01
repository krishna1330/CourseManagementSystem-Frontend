import { coursesReducer } from "../core/components/courses/store/courses.reducer";
import { authReducer } from "../core/components/login/store/auth.reducer";
import { signupReducer } from "../core/components/signup-page/store/signup.reducer";

export const appReducer = {
    auth: authReducer,
    signup: signupReducer,
    courses: coursesReducer
}