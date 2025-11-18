import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { map } from "rxjs";
import { Injectable } from "@angular/core";


  @Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(){
    return this.authService.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) {
          this.router.navigate(['auth/redirect']);
          return false;
        }
        // utilisateur NON connecté → accès au login
        return true;
      })
    );

  }
}
