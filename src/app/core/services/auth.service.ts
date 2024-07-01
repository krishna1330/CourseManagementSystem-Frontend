import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../models/loginResponse.model';
import { ISignupDetails } from '../models/signupDetails';
import { ISignupResponse } from '../models/signupResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  baseUrl = 'https://localhost:44353/api/';

  constructor() { }

  // login(credentials: ILoginCredentials): Observable<HttpResponse<ILoginResponse>> {
  //   return this.httpClient.post<ILoginResponse>(this.baseUrl + 'Auth/Login', credentials, { observe: 'response' })
  //     .pipe(tap((response: HttpResponse<ILoginResponse>) => {
  //       if (response.status === 200 && this.isBrowser()) {
  //         localStorage.setItem('token', response.body?.token ?? '');
  //         localStorage.setItem('userId', response.body?.userId.toString() ?? '');
  //         localStorage.setItem('userType', response.body?.userType ?? '');
  //         localStorage.setItem('firstName', response.body?.firstName ?? '');
  //         localStorage.setItem('lastName', response.body?.lastName ?? '');
  //         localStorage.setItem('emailId', response.body?.emailId ?? '');
  //         localStorage.setItem('mobile', response.body?.mobile ?? '');
  //       }
  //     }));
  // }

  login(emailId: string, password: string): Observable<HttpResponse<ILoginResponse>> {
    return this.httpClient.post<ILoginResponse>(this.baseUrl + 'Auth/Login', { emailId, password }, { observe: 'response' });
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

  // signup(details: ISignupDetails): Observable<HttpResponse<string>> {
  //   return this.httpClient.post<string>(this.baseUrl + 'Users/AddUser', details, { observe: 'response', responseType: 'text' as 'json' });
  // }

  signup(details: ISignupDetails): Observable<HttpResponse<ISignupResponse>> {
    return this.httpClient.post<ISignupResponse>(this.baseUrl + 'Users/AddUser', details, { observe: 'response', responseType: 'text' as 'json' });
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
