import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '@nvs-services/categoria/categoria.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedComponentModule } from '../shared/shared-component.module';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { ListagemCategoriaComponent } from './listagem-categoria/listagem-categoria.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid/header-grid.component";

@NgModule({
  imports: [
    CategoriaRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    SharedComponentModule,
    MatPaginatorModule,
    HeaderGridComponent

  ],
  providers: [CategoriaService, BsModalService],
  declarations: [ CategoriaComponent, ListagemCategoriaComponent ]

})
export class CategoriaModule { }
