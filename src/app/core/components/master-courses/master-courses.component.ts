import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICourses } from '../../models/courses.model';
import { MasterCoursesService } from '../../services/master-courses.service';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { authInterceptor } from '../../intercepors/auth.interceptor';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { getMasterCourses } from './store/master-courses.action';
import { selectMasterCourses } from './store/master-courses.selector';

@Component({
  selector: 'app-master-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true,
    },
  ],
  templateUrl: './master-courses.component.html',
  styleUrl: './master-courses.component.scss',
})
export class MasterCoursesComponent {
  courses: ICourses[] | null = [];
  showModal: boolean = false;
  initialWidth: number = 100;
  showAddCourse: string = 'none';

  masterCoursesService = inject(MasterCoursesService);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

  ngOnInit(): void {
    const masterId = this.masterId();
    this.store.dispatch(getMasterCourses({ masterId }));
    this.store.select(selectMasterCourses).subscribe(courses => {
      this.courses = courses;
    });
  }

  masterId(): number {
    return this.authService.getUserDetails().userId;
  }

  btnCreateCoure(): void {
    this.initialWidth = 75;
    this.showAddCourse = 'block';
    this.router.navigate(['masterCourses/addCourse']);
  }
}
