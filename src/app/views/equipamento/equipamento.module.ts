import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FabricanteService } from '@nvs-services/fabricante/fabricante.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EquipamentoService } from '../../services/equipamento/equipamento.service';
import { EquipamentoRoutingModule } from './equipamento-routing.module';
import { EquipamentoComponent } from './equipamento.component';
import { ListagemEquipamentoComponent } from './listagem-equipamento/listagem-equipamento.component';
import { SharedComponentModule } from '../shared/shared-component.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HeaderGridComponent } from '../shared/grid/header-grid/header-grid.component';


@NgModule({
  imports: [
    EquipamentoRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    SharedComponentModule,
    HeaderGridComponent,
    MatPaginatorModule
  ],
  providers: [EquipamentoService, FabricanteService, BsModalService],
  declarations: [ EquipamentoComponent, ListagemEquipamentoComponent]

})
export class EquipamentoModule { }
