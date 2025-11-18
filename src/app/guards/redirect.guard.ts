import { HttpClient } from "@angular/common/http";
import { UserResponse } from "../services/auth/auth.service";
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { catchError, map, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  canActivate() {
    return this.http.get<UserResponse>(
      'http://localhost:8082/api/users/me',
      { withCredentials: true }
    ).pipe(
      map(user => {
        if (!user) return this.router.parseUrl('/auth/login');

        switch (user.userStatus) {
          case 'ACTIVE':
            return this.router.parseUrl('/dashboard/home');
           case 'INACTIVE':
            case 'BLOCKED':
              case 'SUSPENDED':
            return this.router.parseUrl('/auth/waiting-screen');
          default:
            return this.router.parseUrl('/forbidden');
        }
      }),
      catchError(() => {
        return of(this.router.parseUrl('/auth/login'));
      })
    );
  }
}
