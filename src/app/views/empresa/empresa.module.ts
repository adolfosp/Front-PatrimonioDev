import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxCurrencyDirective } from "ngx-currency";
import { TableModule } from 'ngx-easy-table';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared.module';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { SharedComponentModule } from '../shared/shared-component.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';

@NgModule({
  providers: [EmpresaService, BsModalService],
  declarations: [EmpresaComponent, ListagemEmpresaComponent],
  imports: [
    EmpresaRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskModule.forChild(),
    SharedModule,
    SharedComponentModule,
    HeaderGridComponent,
    MatPaginatorModule,
    NgxCurrencyDirective,
  ],
})
export class EmpresaModule {}
