import { ILoginResponse } from "../../../models/loginResponse";

export interface AuthState {
    user: ILoginResponse | null
}

export const authInitialState: AuthState = {
    user: null
};