import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PerdaService } from '@nvs-services/perda/perda.service';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { RelatorioPerdaComponent } from './relatorio-perda/relatorio-perda.component';
import { RelatorioRoutingModule } from './relatorio-routing.module';

@NgModule({
  providers: [PerdaService, ToastrService, NgxSpinnerService],
  declarations: [RelatorioPerdaComponent],
  imports: [
    RelatorioRoutingModule,
    NgxSpinnerModule,
    TableModule,
    CommonModule,
    MatInputModule,
    MatIconModule,
    HeaderGridComponent,
    MatPaginatorModule,
  ],
})
export class RelatorioModule {}
