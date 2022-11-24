import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@nvs-guards/auth.guard";
import { ListagemPatrimonioComponent } from "./listagem-patrimonio/listagem-patrimonio.component";
import { PatrimonioComponent } from "./patrimonio.component";

const routes: Routes = [
  {
    path: '',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  },
  {
    path: 'listagem',
    component: ListagemPatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'listagem',
    }
  },
  {
    path: ':codigoPatrimonio',
    component: PatrimonioComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'patrimonio',
    }
  }
 
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PatrimonioRoutingModule { }
