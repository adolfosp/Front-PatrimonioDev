import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListagemMovimentacaoComponent } from './listagem-movimentacao/listagem-movimentacao.component';
import { MovimentacaoComponent } from './movimentacao.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MovimentacaoComponent,
    data: {
      title: 'movimentacao'
    }
  },
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    component: ListagemMovimentacaoComponent,
    data: {
      title: 'listagem-movimentacao'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class MovimentacaoRoutingModule { }
