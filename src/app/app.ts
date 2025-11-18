import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('banking-front');
    constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.loadCurrentUser().subscribe();
  }
}
