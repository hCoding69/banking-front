import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatError, MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Pack, PackService } from '../../services/pack-service';
import { Router } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-login',
  imports: [CommonModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatStepperModule,
            ReactiveFormsModule,
            MatInputModule,
            MatInputModule,
            MatIconModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatRadioModule,
          ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  email: string = '';
  password: string = '';
  message: string = '';
  firstFormGroup: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  secondFormGroup: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
    this.secondFormGroup = this.formBuilder.group({
      otp: ['', Validators.required],
    });
    }

    onSubmit() {
      if(this.firstFormGroup.valid &&this.secondFormGroup.valid) {
        const request = {
          ...this.firstFormGroup.value,
          ...this.secondFormGroup.value
        }
        this.authService.login(request).subscribe({
          next: (response) => {
            console.log('Login successful:', response);
            this.successMessage = response.message;
            this.router.navigate(['/auth/waiting-screen']);
          },
          error: (error) => {
            console.error('Login failed:', error);
            this.errorMessage = error.error.error || 'Login failed. Please try again.';
          }
        });
      }
    }

     assignRole() {


    this.authService.getCurrentUser().subscribe({
      next: (res) => console.log('Succès:', res),
      error: (err) => console.error('Erreur:', err)
    });
  }

  createRole() {
    const body = {
      name: 'ROLE_TEST'
    };

    this.http.post('http://localhost:8082/api/users/roles/create', body, {
      withCredentials: true // ✅ important pour envoyer les cookies
    }).subscribe({
      next: (res) => console.log('Succès:', res),
      error: (err) => console.error('Erreur:', err)
    });
  }




}

