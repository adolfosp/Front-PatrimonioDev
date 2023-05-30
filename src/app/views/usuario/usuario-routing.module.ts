import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Permissao } from '@nvs-models/enums/permissao.enum';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from '../../core/guards/role.guard';
import { ListagemUsuarioComponent } from './listagem-usuario/listagem-usuario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'perfil',
      permissaoEsperada: [Permissao.Administrador, Permissao.Gestor, Permissao.Usuario]

    }
  },
  {
    path: '',
    component: UsuarioComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'usuario',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: 'listagem',
    component: ListagemUsuarioComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'listagem',
      permissaoEsperada: [Permissao.Administrador]

    }
  },
  {
    path: ':codigoUsuario',
    component: UsuarioComponent,
    canActivate: [AuthGuard,RoleGuard],
    data: {
      title: 'usuario',
      permissaoEsperada: [Permissao.Administrador]

    }
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule]
})
export class UsuarioRoutingModule { }
