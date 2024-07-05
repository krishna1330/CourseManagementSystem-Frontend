import { CoursesEffect } from "../core/components/courses/store/courses.effect";
import { AuthEffect } from "../core/components/login/store/auth.effect";
import { MasterCoursesEffect } from "../core/components/master-courses/store/master-courses.effect";
import { SignupEffect } from "../core/components/signup-page/store/signup.effect";

export const appEffect = [
    AuthEffect,
    SignupEffect,
    CoursesEffect,
    MasterCoursesEffect
  ];