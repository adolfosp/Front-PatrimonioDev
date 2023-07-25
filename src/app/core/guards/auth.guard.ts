import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@nvs-services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private token: TokenService,
    private router: Router) {
  }

  canActivate(): boolean{
    if(!this.token.usuarioEstaAutenticado()){
      this.router.navigate(['login']);
      return false
    }

    return true;
  }

}
