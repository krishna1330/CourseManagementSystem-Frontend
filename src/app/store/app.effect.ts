import { AuthEffect } from "./auth/auth.effect";
import { CoursesEffect } from "./courses/courses.effect";
import { MasterCoursesEffect } from "./master-courses/master-courses.effect";
import { SignupEffect } from "./signup/signup.effect";

export const appEffect = [
    AuthEffect,
    SignupEffect,
    CoursesEffect,
    MasterCoursesEffect
  ];