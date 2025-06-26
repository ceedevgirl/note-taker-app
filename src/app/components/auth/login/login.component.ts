import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['test@example.com', [Validators.required, Validators.email]],
      password: ['password123', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.showValidationErrors();
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.authService.login(email, password);

    if (success) {
      this.toastr.success('Successfully logged in!', 'Welcome');
      this.router.navigate(['/notes-dashboard']);
    } else {
      this.toastr.error('Login failed. Please check your credentials.', 'Error');
    }
  }

  showValidationErrors(): void {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.toastr.error('Email is required', 'Validation Error');
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.toastr.error('Please enter a valid email address', 'Validation Error');
    } else if (this.loginForm.get('password')?.hasError('required')) {
      this.toastr.error('Password is required', 'Validation Error');
    } else if (this.loginForm.get('password')?.hasError('minlength')) {
      this.toastr.error('Password must be at least 6 characters', 'Validation Error');
    }
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.hasError('required')) return `${fieldName} is required`;
    if (field?.hasError('email')) return 'Please enter a valid email';
    if (field?.hasError('minlength')) return 'Password must be at least 6 characters';
    return '';
  }
}
