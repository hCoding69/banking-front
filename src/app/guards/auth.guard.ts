import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate() {
    // 🧠 On vérifie si le user est encore connecté via /auth/refresh
    return this.http.post('http://localhost:8082/api/auth/refresh-token', {}, { withCredentials: true }).pipe(
      map(() => true), // ✅ Token valide → accès autorisé
      catchError(() => {
        // ❌ Token expiré → redirection login
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
