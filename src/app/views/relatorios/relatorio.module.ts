import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PerdaService } from '@nvs-services/perda/perda.service';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RelatorioPerdaComponent } from './relatorio-perda/relatorio-perda.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';

@NgModule({
  imports: [
    RelatorioRoutingModule,
    NgxSpinnerModule,
    TableModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [PerdaService, ToastrService, NgxSpinnerService],
  declarations: [RelatorioPerdaComponent]

})
export class RelatorioModule { }
