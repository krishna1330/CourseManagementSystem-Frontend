import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourses } from '../models/courses.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private baseUrl = 'https://localhost:44353/api/Courses/';

  constructor(private http: HttpClient) { }

  GetCourses():  Observable<HttpResponse<ICourses[]>> {
    return this.http.get<ICourses[]>(this.baseUrl + 'GetCourses', { observe: 'response' });
  }
}
