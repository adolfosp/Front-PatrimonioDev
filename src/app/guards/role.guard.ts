import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TokenService } from '@nvs-services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private token: TokenService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const permissaoEsperada: number[] = route.data['permissaoEsperada'];
    // const permissaoToken = this.token.obterPermissaoToken()
    // const permissaoEncontrada = permissaoEsperada.find(x => permissaoToken);

    if (!this.token.usuarioEstaAutenticado())
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
