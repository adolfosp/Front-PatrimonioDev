import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PermissaoService } from '../../services/permissao/permissao.service';
import { SharedModule } from '../../shared.module';
import { ListagemPermissaoComponent } from './listagem-permissao/listagem-permissao.component';
import { PermissaoRoutingModule } from './permissao-routing.module';
import { PermissaoComponent } from './permissao.component';
import { SharedComponentModule } from '../shared/shared-component.module';
import { HeaderGridComponent } from '../shared/grid/header-grid/header-grid.component';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';

@NgModule({
  imports: [
    PermissaoRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    SharedModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    SharedComponentModule,
    MatPaginatorModule,
    HeaderGridComponent,

  ],
  providers: [PermissaoService, BsModalService],
  declarations: [PermissaoComponent , ListagemPermissaoComponent]

})
export class PermissaoModule { }
