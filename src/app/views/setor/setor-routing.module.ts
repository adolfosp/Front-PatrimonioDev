import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '@nvs-models/enums/permissao.enum';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { ListagemSetorComponent } from './listagem-setor/listagem-setor.component';
import { SetorComponent } from './setor.component';

const routes: Routes = [
  {
    path: '',
    component: SetorComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listagem',
    component: ListagemSetorComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'listagem',
      permissaoEsperada: [Permissao.Administrador]
    }
  },
  {
    path: ':codigoSetor',
    component: SetorComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'Setor',
      permissaoEsperada: [Permissao.Administrador]
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetorRoutingModule { }
