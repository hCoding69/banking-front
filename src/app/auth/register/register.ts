import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule], // ajoute ReactiveFormsModule si tu utilises FormBuilder
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  registerForm :FormGroup;
  message: string = '';
  qrCodeUrl: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required],
      roleIds: [[], Validators.required]
    });
  }

  onSubmit() {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          this.message = response.message;
          this.qrCodeUrl = response.qrCodeUrl;
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.message = error.error.message || 'Registration failed. Please try again.';
        }
      });
    }
  }
}
