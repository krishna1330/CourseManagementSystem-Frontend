import { AuthState } from "../core/components/login/store/auth.state";
import { SignupState } from "../core/components/signup-page/store/signup.state";

export interface AppState {
    auth: AuthState
    signup: SignupState
}