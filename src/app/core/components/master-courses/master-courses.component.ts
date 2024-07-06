import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ICourses } from '../../models/courses.model';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { getMasterCourses } from '../../../store/master-courses/master-courses.action';
import { selectMasterCourses } from '../../../store/master-courses/master-courses.selector';
import { AddCourseComponent } from '../add-course/add-course.component';
import { authInterceptor } from '../../intercepors/auth.interceptor';

@Component({
  selector: 'app-master-courses',
  standalone: true,
  imports: [CommonModule, RouterModule, AddCourseComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true,
    },
  ],
  templateUrl: './master-courses.component.html',
  styleUrls: ['./master-courses.component.scss'],
})
export class MasterCoursesComponent implements OnInit {
  courses: ICourses[] | null = [];
  showModal: boolean = false;
  initialWidth: number = 100;
  showAddCourse: string = 'none';

  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  ngOnInit(): void {
    const masterId = this.masterId();
    this.store.dispatch(getMasterCourses({ masterId }));
    this.store.select(selectMasterCourses).subscribe((courses) => {
      this.courses = courses;
    });
  }

  masterId(): number {
    return this.authService.getUserDetails().userId;
  }

  btnCreateCourse(): void {
    this.initialWidth = 75;
    this.showAddCourse = 'block';
  }

  onClose(event: { initialWidth: number; showAddCourse: string }) {
    this.initialWidth = event.initialWidth;
    this.showAddCourse = event.showAddCourse;
  }
}
