import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('banking-front');
    constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
