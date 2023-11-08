import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxCurrencyModule } from 'ngx-currency';
import { TableModule } from 'ngx-easy-table';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared.module';
import { SharedComponentModule } from '../shared/shared-component.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { MatLegacyPaginatorModule as MatPaginatorModule } from "@angular/material/legacy-paginator";

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
    NgxCurrencyModule,
    SharedModule,
    SharedComponentModule,
    HeaderGridComponent,
    MatPaginatorModule

  ]
})
export class EmpresaModule { }
