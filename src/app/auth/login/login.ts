import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email: string = '';
  password: string = '';
  message: string = '';
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
    }

    onSubmit() {
      if(this.loginForm.valid) {
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.message = response.message;
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.message = error.error.message || 'Login failed. Please try again.';
          }
        });
      }
    }




}

