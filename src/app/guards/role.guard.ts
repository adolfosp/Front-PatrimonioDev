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
    return true;
    const permissaoEsperada: number[] = route.data['permissaoEsperada'];
    const permissaoToken = this.token.obterPermissaoToken()
    const permissaoEncontrada = permissaoEsperada.find(x => x == permissaoToken);

    if (!this.token.usuarioEstaAutenticado() || permissaoEncontrada == undefined)
    {
      this.router.navigate(['403']);
      return false;
    }

    return true;

  }
}
