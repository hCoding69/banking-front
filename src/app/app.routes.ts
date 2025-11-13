import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Home } from './dashboard/home/home';
import { AuthGuard } from './guards/auth.guard';
import { WaitingScreen } from './auth/waiting-screen/waiting-screen';

export const routes: Routes = [
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: 'auth/register', component: Register},
    { path: 'auth/login', component: Login},
    { path: 'dashboard/home', component: Home, canActivate: [AuthGuard] },
    { path: 'auth/waiting-screen', component: WaitingScreen, canActivate: [AuthGuard] }


];
