import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { SetorService } from '@nvs-services/setor/setor.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ListagemSetorComponent } from './listagem-setor/listagem-setor.component';
import { SetorRoutingModule } from './setor-routing.module';
import { SetorComponent } from './setor.component';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

@NgModule({
  providers: [SetorService, BsModalService],
  declarations: [SetorComponent, ListagemSetorComponent],
  imports: [
    SetorRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    SharedComponentModule,
    HeaderGridComponent,
    MatPaginatorModule,
  ],
})
export class SetorModule {}
