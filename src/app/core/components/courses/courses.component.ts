import { Component, OnInit, inject } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { ICourses } from '../../models/courses.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { getCourses } from '../../../store/courses/courses.action';
import { Observable } from 'rxjs';
import { selectAllCourses } from '../../../store/courses/courses.selector';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  coursesService = inject(CoursesService);
  store = inject(Store);

  courses$!: Observable<ICourses[]>;
  courses: ICourses[] = [];
  filteredCourses: ICourses[] = [];
  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
    this.store.dispatch(getCourses());
    this.courses$ = this.store.pipe(
      select(selectAllCourses),
      filter((courses): courses is ICourses[] => courses !== null)
    );
    this.courses$.subscribe((data) => {
      this.courses = data;
      this.filteredCourses = this.courses;
    });
  }

  applyFilter(): void {
    const searchText = this.searchText.toLowerCase().trim();
    this.filteredCourses = this.courses.filter(course =>
      course.courseName.toLowerCase().includes(searchText)
    );
  }
}
