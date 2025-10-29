import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';




@Component({
  selector: 'app-register',
  imports: [CommonModule,
            ReactiveFormsModule,
            ReactiveFormsModule,
            MatButtonModule,
            MatStepperModule,
            ReactiveFormsModule,
            MatInputModule,
            MatInputModule,
            MatIconModule
          ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  // registerForm :FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  message: string = '';
  qrCodeUrl: string = '';

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   confirmPassword: ['', Validators.required],
    //   birthDate: ['', Validators.required],
    //   roleIds: [[], Validators.required]
    // });
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      packId: ['', Validators.required],
    });

  }

onSubmit() {
  if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
    const request = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      roleIds: [1]
    };

    this.authService.register(request).subscribe({
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
