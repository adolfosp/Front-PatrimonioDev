import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '@nvs-services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private token: TokenService,
    private router: Router) {
  }

  canActivate(): boolean{
    return true;
    if(!this.token.usuarioEstaAutenticado()){
      this.router.navigate(['login']);
      return false
    }

    return true;
  }

}
