import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private router: Router,
    private loginService : LoginService
  ) {

  }

  canActivate() {
    // Aquí   

   
    if (!this.loginService.isAuthenticated()) {
      return false;
    } else {
      return true;
    }
  }
  
}
