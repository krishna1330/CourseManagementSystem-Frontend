import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISignupDetails } from '../../models/signupDetails';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ValidationService } from '../../../shared/services/validation.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ISignupResponse } from '../../models/signupResponse';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

  signupForm!: FormGroup;
  signupDetails: ISignupDetails = { userType: '', firstName: '', lastName: '', emailId: '', password: '' };

  formBuilder = inject(FormBuilder);
  validationService = inject(ValidationService);
  authService = inject(AuthService);
  router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20), this.validationService.nameValidator()]],
      lastName: ['', [Validators.required, Validators.maxLength(20), this.validationService.nameValidator()]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12), this.validationService.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      termsAndPolicy: [false, Validators.requiredTrue]
    },
      { validators: this.validationService.confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  btnSignup(): void {
    if (this.signupForm.valid) {

      this.signupDetails.userType = "Student";
      this.signupDetails.firstName = this.signupForm.get('firstName')?.value ?? '';
      this.signupDetails.lastName = this.signupForm.get('lastName')?.value ?? '';
      this.signupDetails.emailId = this.signupForm.get('emailId')?.value ?? '';
      this.signupDetails.password = this.signupForm.get('password')?.value ?? '';

      this.authService.signup(this.signupDetails).subscribe({

        next: (response: HttpResponse<ISignupResponse>) => {
          if (response.status === 200) {
            alert(response.body);
            this.router.navigate(['/home']);
          } else {
            alert('Signup failed');
          }
        },

        error: (error: HttpErrorResponse) => {
          if (error.status === 409) {
            alert(error.error);
          } else {
            alert('Signup failed with status: ' + error.status);
          }
        }
      });
    }

    else {
      this.signupForm.markAllAsTouched();
    }
  }
}
