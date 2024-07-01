import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../models/loginResponse.model';
import { ISignupResponse } from '../models/signupResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = 'https://localhost:44353/api/';

  constructor() { }

  login(emailId: string, password: string): Observable<HttpResponse<ILoginResponse>> {
    return this.httpClient.post<ILoginResponse>(this.baseUrl + 'Auth/Login',
      { emailId, password }, { observe: 'response' });
  }

  saveToLocalStorage(user: ILoginResponse) {
    if (user != null) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user.userId.toString());
      localStorage.setItem('userType', user.userType);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      localStorage.setItem('emailId', user.emailId);
      localStorage.setItem('mobile', user.mobile);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('emailId');
    localStorage.removeItem('mobile');
  }

  isLoggedIn() {
    return this.isBrowser() ? localStorage.getItem('token') !== null : false
  }

  getUserDetails(): ILoginResponse {
    if (this.isBrowser()) {
      const user: ILoginResponse = {
        token: localStorage.getItem('token') || '',
        userId: parseInt(localStorage.getItem('userId') || '0'),
        userType: localStorage.getItem('userType') || '',
        firstName: localStorage.getItem('firstName') || '',
        lastName: localStorage.getItem('lastName') || '',
        emailId: localStorage.getItem('emailId') || '',
        mobile: localStorage.getItem('mobile') || ''
      };
      return user;
    } else {
      return {
        token: '',
        userId: 0,
        userType: '',
        firstName: '',
        lastName: '',
        emailId: '',
        mobile: ''
      };
    }

  }

  signup(userType: string, firstName: string, lastName: string, emailId: string, password: string): Observable<HttpResponse<ISignupResponse>> {
    return this.httpClient.post<ISignupResponse>(this.baseUrl + 'Users/AddUser',
      { userType, firstName, lastName, emailId, password },
      { observe: 'response', responseType: 'text' as 'json' });
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
