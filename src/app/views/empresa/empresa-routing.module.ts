import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '@nvs-enum/permissao.enum';
import { AuthGuard } from '@nvs-guards/auth.guard';
import { RoleGuard } from '@nvs-guards/role.guard';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';

const routes: Routes = [
  {
    path: '',
    component: EmpresaComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'Empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listagem',
    component: ListagemEmpresaComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'listagem',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: ':codigoEmpresa',
    component: EmpresaComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'Empresa',
      permissaoEsperada: [Permissao.Administrador]

    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class EmpresaRoutingModule { }