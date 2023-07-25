import { NgModule } from "@angular/core";
import { BooleanoPipe } from './core/pipes/booleano.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
      BooleanoPipe
  ],
  exports: [
    BooleanoPipe
  ]
})
export class SharedModule { }
