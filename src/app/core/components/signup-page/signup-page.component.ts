import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ValidationService } from '../../../shared/services/validation.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { signup } from './store/signup.action';

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

  formBuilder = inject(FormBuilder);
  validationService = inject(ValidationService);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);

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

      const userType = "Student";
      const firstName = this.signupForm.value.firstName;
      const lastName = this.signupForm.value.lastName;
      const emailId = this.signupForm.value.emailId;
      const password = btoa(this.signupForm.value.password);

      this.store.dispatch(signup({ userType, firstName, lastName, emailId, password }));
    }

    else {
      this.signupForm.markAllAsTouched();
    }
  }
}
