import { ILoginResponse } from "../../core/models/loginResponse.model";

export interface AuthState {
    user: ILoginResponse | null
}

export const authInitialState: AuthState = {
    user: null
};