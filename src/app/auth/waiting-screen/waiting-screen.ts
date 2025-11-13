import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-waiting-screen',
  imports: [CommonModule],
  templateUrl: './waiting-screen.html',
  styleUrl: './waiting-screen.scss',
})
export class WaitingScreen {
  message : string = '';
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout().subscribe({
      next : (response)=>{
        this.router.navigate(['/auth/login']);
      },
      error : (error) =>{
        console.error('Logout failed:', error);
        this.message = error.error.error || 'Logout failed. Please try again.';
      }
    })
  }

}
