import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@nvs-services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(
    private router: Router,
    private token: TokenService) { }

  canActivate(): boolean {
    if (!this.token.usuarioEstaAutenticado())
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
