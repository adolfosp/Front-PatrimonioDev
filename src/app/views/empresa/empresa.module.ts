import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EmpresaService } from '@nvs-services/empresa/empresa.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxCurrencyModule } from 'ngx-currency';
import { TableModule } from 'ngx-easy-table';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from '../../shared.module';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaComponent } from './empresa.component';
import { ListagemEmpresaComponent } from './listagem-empresa/listagem-empresa.component';

@NgModule({
  imports: [
    EmpresaRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    TableModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskModule.forChild(),
    NgxCurrencyModule


  ],
  providers: [EmpresaService, BsModalService],
  declarations: [ EmpresaComponent, ListagemEmpresaComponent]

})
export class EmpresaModule { }
