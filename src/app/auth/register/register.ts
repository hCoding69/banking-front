import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { last } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatError, MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';






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
            MatIconModule,
            MatDatepickerModule,
                MatNativeDateModule

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
    }, { validators: this.passwordMatchValidator });

    this.secondFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$' )]],
      birthDate: ['', Validators.required],

    } , { validators: this.adultValidator });

    this.thirdFormGroup = this.formBuilder.group({
      packId: ['', Validators.required],
    });

  }

passwordMatchValidator(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  if (password !== confirm) {
    group.get('confirmPassword')?.setErrors({ mismatch: true });
    return { mismatch: true };
  } else {
    group.get('confirmPassword')?.setErrors(null);
    return null;
  }
}

adultValidator(group: FormGroup) {
  const birthDateControl = group.get('birthDate');
  if (!birthDateControl?.value) return null;

  const birthDate = new Date(birthDateControl.value);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    birthDateControl.setErrors({ underage: true });
    return { underage: true };
  } else {
    // Supprimer l'erreur si elle existait
    if (birthDateControl.hasError('underage')) {
      birthDateControl.setErrors(null);
    }
    return null;
  }
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
