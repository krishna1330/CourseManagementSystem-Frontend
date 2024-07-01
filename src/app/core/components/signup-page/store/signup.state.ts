export interface SignupState {
    userType: string | null;
    firstName: string | null;
    lastName: string | null;
    emailId: string | null;
    // mobile: string;
    password: string | null;
}

export const signupInitialState: SignupState = {
    userType: null,
    firstName: null,
    lastName: null,
    emailId: null,
    password: null
};