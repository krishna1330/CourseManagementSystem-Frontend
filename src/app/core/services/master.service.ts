import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IGetMastersResponse } from '../models/getMastersResponse';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  router = inject(Router);
  http = inject(HttpClient);

  private baseUrl = 'https://localhost:44353/api/Masters/';

  constructor() { }

  GetAllMasters(): Observable<HttpResponse<IGetMastersResponse[]>> {
    return this.http.get<IGetMastersResponse[]>(this.baseUrl + 'GetMasters', { observe: 'response' });
  }
}
