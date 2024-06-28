import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourses } from '../models/courses';

@Injectable({
  providedIn: 'root'
})
export class MasterCoursesService {

  http = inject(HttpClient);

  constructor() { }

  private baseUrl = 'https://localhost:44353/api/Courses/';

  GetMasterCourses(masterId: number):  Observable<HttpResponse<ICourses[]>> {
    return this.http.get<ICourses[]>(this.baseUrl + 'GetMasterCourses?masterId=' + masterId, { observe: 'response' });
  }
}
