import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, switchMap } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Ajoute toujours withCredentials pour les cookies
    const clonedReq = req.clone({ withCredentials: true });

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(clonedReq);
            }),
            catchError(err => {
              this.isRefreshing = false;
              this.authService.logout();
              this.router.navigate(['/auth/login']);
              return throwError(() => err);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
