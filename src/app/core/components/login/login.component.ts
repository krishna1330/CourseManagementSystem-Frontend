import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ILoginCredentials } from '../../models/loginCredentials';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { ILoginResponse } from '../../models/loginResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  loginForm!: FormGroup;
  credentials: ILoginCredentials = { emailId: '', password: '' };

  constructor() { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.credentials.emailId = this.loginForm.get('email')?.value || '';
      this.credentials.password = this.loginForm.get('password')?.value || '';

      this.authService.login(this.credentials)
        .subscribe({
          next: (response: HttpResponse<ILoginResponse>) => {
            const data = response.body;
            const statusCode = response.status;

            if (statusCode === 200 && this.authService.isLoggedIn() && data != null) {
              //this.toastrService.successToastr("Login Successful");
              //alert("Login Successful");
              this.router.navigate(['/home']);
            } else {
              //this.toastrService.successToastr("Login Failed");
              alert("Login Failed");
            }
          },
          error: (err) => {
            if (err.status === 401) {
              //this.toastrService.successToastr("Invalid credentials");
              alert("Invalid credentials");
            } else {
              //this.toastrService.successToastr("Login Failed");
              alert("Login Failed");
            }
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
