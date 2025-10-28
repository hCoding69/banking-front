import { Routes } from '@angular/router';
import { Register } from './auth/register/register';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/register', pathMatch: 'full' },
    { path: 'auth/register', component: Register },
];
