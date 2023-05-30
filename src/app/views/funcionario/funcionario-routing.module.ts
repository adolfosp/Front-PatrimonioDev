import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FuncionarioComponent } from './funcionario.component';
import { ListagemFuncionarioComponent } from './listagem-funcionario/listagem-funcionario.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  },
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    component: ListagemFuncionarioComponent,
    data: {
      title: 'listagem'
    }
  },
  {
    path: ':codigoFuncionario',
    canActivate: [AuthGuard],
    component: FuncionarioComponent,
    data: {
      title: 'Funcionário'
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
