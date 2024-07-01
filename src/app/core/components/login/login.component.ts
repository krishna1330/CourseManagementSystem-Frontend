import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from './store/auth.action';

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
  store = inject(Store);

  loginForm!: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const emailId = this.loginForm.value.email;
      const password = btoa(this.loginForm.value.password);
      this.store.dispatch(login({ emailId, password }));

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
