import { ILoginResponse } from "../../../models/loginResponse.model";

export interface AuthState {
    user: ILoginResponse | null
}

export const authInitialState: AuthState = {
    user: null
};