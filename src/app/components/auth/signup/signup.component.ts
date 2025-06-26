import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;

  //  Toast signals
  toastMessage = signal('');
  toastType = signal<'success' | 'error' | 'info'>('info');
  showToast = signal(false);

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
  if (this.signupForm.valid) {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;

    const success = this.authService.signup(email, password);

    if (success) {
      this.toastMessage.set('Signup successful!');
      this.toastType.set('success');
      this.showToast.set(true);

      // Navigate only if signup succeeded
      setTimeout(() => {
        this.showToast.set(false);
        this.router.navigate(['/notes-dashboard']);
      }, 1000);
    } else {
      this.toastMessage.set('Email is already registered.');
      this.toastType.set('error');
      this.showToast.set(true);
    }
  } else {
    this.signupForm.markAllAsTouched();
    this.toastMessage.set('Please fix the errors in the form.');
    this.toastType.set('error');
    this.showToast.set(true);
  }
   setTimeout(() => this.showToast.set(false), 3000);
}

  closeToast(): void {
    this.showToast.set(false);
  }
}
