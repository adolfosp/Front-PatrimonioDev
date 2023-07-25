import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FabricanteComponent } from './fabricante.component';
import { ListagemFabricanteComponent } from './listagem-fabricante/listagem-fabricante.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  },
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    component: ListagemFabricanteComponent,
    data: {
      title: 'listagem'
    }
  },
  {
    path: ':codigoFabricante',
    canActivate: [AuthGuard],
    component: FabricanteComponent,
    data: {
      title: 'Fabricante'
    }
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FabricanteRoutingModule { }
