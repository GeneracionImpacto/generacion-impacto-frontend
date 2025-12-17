import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest, AuthResponse } from '../../models/auth.model';
import { Role } from '../../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string = '';
  ADMIN_SECRET_CODE = 'GENIMPACTO2025';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      studentCode: ['', [Validators.required]],
      role: [Role.STUDENT, [Validators.required]],
      adminSecretCode: ['']
    });

    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      const adminCodeControl = this.registerForm.get('adminSecretCode');
      if (role === Role.ADMIN) {
        adminCodeControl?.setValidators([Validators.required]);
      } else {
        adminCodeControl?.clearValidators();
      }
      adminCodeControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    console.log('Form submitted, valid:', this.registerForm.valid);
    console.log('Form errors:', this.registerForm.errors);
    console.log('Form value:', this.registerForm.value);
    
    if (this.registerForm.valid) {
      this.error = '';
      const formValue = this.registerForm.value;
      const request: RegisterRequest = {
        email: formValue.email,
        password: formValue.password,
        name: formValue.name,
        phoneNumber: formValue.phoneNumber,
        studentCode: formValue.studentCode,
        role: formValue.role,
        adminSecretCode: formValue.role === Role.ADMIN ? formValue.adminSecretCode : undefined
      };

      console.log('Sending register request:', request);
      
      this.authService.register(request).subscribe({
        next: (response: AuthResponse) => {
          console.log('Register successful:', response);
          this.redirectBasedOnRole(response.role);
        },
        error: (err) => {
          console.error('Register error:', err);
          this.error = err.error?.message || err.error || err.message || 'Error al registrar usuario';
          if (typeof err.error === 'string') {
            this.error = err.error;
          }
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.get(key)?.markAsTouched();
      });
      this.error = 'Por favor, completa todos los campos requeridos correctamente';
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

  get Role() {
    return Role;
  }
}




