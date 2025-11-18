import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserResponse } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate() {
      return this.http.post(
        'http://localhost:8082/api/auth/refresh-token',
        {},
        { withCredentials: true }
      ).pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/auth/login']);
          return of(false);
        })
      );
    }
}
