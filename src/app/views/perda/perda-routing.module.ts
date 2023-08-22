import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { PerdaComponent } from "./perda.component";

const routes: Routes = [
  {
    path: "perda",
    canActivate: [AuthGuard],
    component: PerdaComponent,
    data: {
      title: "perda",
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class PerdaRoutingModule { }
