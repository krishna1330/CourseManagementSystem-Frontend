import { Component, OnInit, inject } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ICourses } from '../../models/courses';
import { CommonModule } from '@angular/common';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {

  coursesService = inject(CoursesService);

  courses: ICourses[] = [];
  filteredCourses: ICourses[] = [];
  searchText: string = '';

  ngOnInit(): void {
    this.GetCourses();
  }

  GetCourses(): void {
    this.coursesService.GetCourses().subscribe({
      next: (response: HttpResponse<ICourses[]>) => {
        if (response.status === 200) {
          this.courses = response.body || [];
          this.filteredCourses = this.courses;
        }
      },
      error: (err) => {
        console.error('Failed to fetch courses', err);
      }
    });
  }

  applyFilter(): void {    
    const searchText = this.searchText.toLowerCase().trim();

    this.filteredCourses = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(searchText)  
    );
  }
}
