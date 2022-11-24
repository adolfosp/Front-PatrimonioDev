import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerdaService } from '@nvs-services/perda/perda.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PerdaRoutingModule } from './perda-routing.module';

@NgModule({
  imports: [
    PerdaRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  providers: [PerdaService],
  declarations: [ ]

})
export class PerdaModule { }
