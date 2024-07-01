import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ICourses } from '../../models/courses';
import { MasterCoursesService } from '../../services/master-courses.service';
import { HTTP_INTERCEPTORS, HttpResponse } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { authInterceptor } from '../../intercepors/auth.interceptor';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-master-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: authInterceptor,
      multi: true
    }
  ],
  templateUrl: './master-courses.component.html',
  styleUrl: './master-courses.component.scss'
})
export class MasterCoursesComponent {

  courses: ICourses[] = [];
  showModal: boolean = false;

  masterCoursesService = inject(MasterCoursesService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.GetMasterCourses()
  }

  masterId(): number {
    return this.authService.getUserDetails().userId;
  }

  GetMasterCourses(): void {
    this.masterCoursesService.GetMasterCourses(this.masterId()).subscribe({
      next: (response: HttpResponse<ICourses[]>) => {
        if (response.status === 200) {
          this.courses = response.body || [];
        }
      },
      error: (err) => {
        console.error('Failed to fetch courses', err);
      }
    });
  }

  btnCreateCoure(): void {
    this.showModal = true;
  }
}
