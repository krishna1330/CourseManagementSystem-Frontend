import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { createCourse } from '../../../store/master-courses/master-courses.action';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  @Output() closeEvent = new EventEmitter<{ initialWidth: number; showAddCourse: string }>();

  addCourseForm!: FormGroup;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  store = inject(Store);

  initialWidth: number = 100;
  showAddCourse: string = 'none';

  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      courseName: ['', [Validators.required]],
      coursePrice: ['', [Validators.required]],
      courseDuration: ['', [Validators.required]],
      courseLanguage: ['', [Validators.required]],
      courseThumbnail: [null, [Validators.required]],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.addCourseForm.patchValue({
        courseThumbnail: file,
      });
      this.addCourseForm.get('courseThumbnail')!.updateValueAndValidity();
    }
  }

  masterId(): number {
    return this.authService.getUserDetails().userId;
  }

  onSubmit(): void {
    if (this.addCourseForm.valid) {
      const formData = new FormData();
      formData.append('CourseName', this.addCourseForm.get('courseName')!.value);
      formData.append('MasterId', this.masterId().toString());
      formData.append('CoursePrice', this.addCourseForm.get('coursePrice')!.value);
      formData.append('CourseAccessDurationInMonths', this.addCourseForm.get('courseDuration')!.value);
      formData.append('CourseLanguage', this.addCourseForm.get('courseLanguage')!.value);
      formData.append('thumbnail', this.addCourseForm.get('courseThumbnail')!.value);

      this.store.dispatch(createCourse({ formData }));
    }
  }

  btnClose(): void {
    this.initialWidth = 100;
    this.showAddCourse = 'none';
    this.closeEvent.emit({ initialWidth: this.initialWidth, showAddCourse: this.showAddCourse });
  }
}
