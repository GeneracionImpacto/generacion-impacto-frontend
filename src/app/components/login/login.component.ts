import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest, AuthResponse } from '../../models/auth.model';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const request: LoginRequest = this.loginForm.value;
      this.authService.login(request).subscribe({
        next: (response: AuthResponse) => {
          console.log('Login successful:', response);
          this.redirectBasedOnRole(response.role);
        },
        error: (err) => {
          console.error('Login error:', err);
          if (err.status === 401) {
            this.error = 'Credenciales inválidas';
          } else if (err.error && typeof err.error === 'string') {
            this.error = err.error;
          } else {
            this.error = 'Error al iniciar sesión. Por favor intenta de nuevo.';
          }
        }
      });
    }
  }

  private redirectBasedOnRole(role: Role): void {
    switch (role) {
      case Role.TUTOR:
        this.router.navigate(['/tutor/home']);
        break;
      case Role.STUDENT:
        this.router.navigate(['/student/home']);
        break;
      case Role.ADMIN:
        this.router.navigate(['/admin/home']);
        break;
    }
  }
}




