import { AuthService } from 'src/app/service/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private rota: Router) {

    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      let authenticated = this.authService.isAuthenticate();

      if(authenticated){
        return true;
      } else {
        this.rota.navigate(['login']);
        return false;
      }

  }
  
}
