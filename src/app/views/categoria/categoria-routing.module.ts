import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@nvs-guards/auth.guard';
import { CategoriaComponent } from './categoria.component';
import { ListagemCategoriaComponent } from './listagem-categoria/listagem-categoria.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: CategoriaComponent,
    data: {
      title: 'categoria'
    }
  },
  {
    path: 'listagem',
    canActivate: [AuthGuard],
    component: ListagemCategoriaComponent,
    data: {
      title: 'listagem'
    }
  },
  {
    path: ':codigoCategoria',
    canActivate: [AuthGuard],
    component: CategoriaComponent,
    data: {
      title: 'categoria'
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CategoriaRoutingModule { }
