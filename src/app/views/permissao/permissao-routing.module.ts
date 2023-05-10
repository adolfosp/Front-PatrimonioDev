import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Permissao } from "@nvs-models/enums/permissao.enum";
import { AuthGuard } from "@nvs-guards/auth.guard";
import { RoleGuard } from "@nvs-guards/role.guard";
import { ListagemPermissaoComponent } from "./listagem-permissao/listagem-permissao.component";
import { PermissaoComponent } from "./permissao.component";

const routes: Routes = [
  {
    path: '',
    component: PermissaoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'Permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  },
  {
    path: 'listagem',
    component: ListagemPermissaoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'listagem-permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  },
  {
    path: ':codigoPermissao',
    component: PermissaoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      title: 'Permissao',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor]

    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PermissaoRoutingModule { }
