import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@nvs-guards/auth.guard';
import { EquipamentoComponent } from './equipamento.component';
import { ListagemEquipamentoComponent } from './listagem-equipamento/listagem-equipamento.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: EquipamentoComponent,
    data: {
      title: 'equipamento'
    }
  },
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    component: ListagemEquipamentoComponent,
    data: {
      title: 'listagem'
    }
  },
  {
    path: ':codigoEquipamento',
    canActivate: [AuthGuard],
    component: EquipamentoComponent,
    data: {
      title: 'equipamento'
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class EquipamentoRoutingModule { }
