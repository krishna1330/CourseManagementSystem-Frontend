import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { CoursesComponent } from './core/components/courses/courses.component';
import { LoginComponent } from './core/components/login/login.component';
import { MastersComponent } from './core/components/masters/masters.component';
import { authGuard } from './core/guards/auth.guard';
import { SignupPageComponent } from './core/components/signup-page/signup-page.component';
import { MasterCoursesComponent } from './core/components/master-courses/master-courses.component';
import { AddCourseComponent } from './core/components/add-course/add-course.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'masters', component: MastersComponent, canActivate: [authGuard] },
  {
    path: 'masterCourses',
    component: MasterCoursesComponent,
    canActivate: [authGuard],
    children: [{ path: 'addCourse', component: AddCourseComponent }],
  },
];
