import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { RelatorioPerdaComponent } from "./relatorio-perda/relatorio-perda.component";


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: RelatorioPerdaComponent,
    data: {
      title: 'relatorio-perda'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class RelatorioRoutingModule { }
