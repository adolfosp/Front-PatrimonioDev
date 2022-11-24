import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SetorService } from '@nvs-services/setor/setor.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ListagemSetorComponent } from './listagem-setor/listagem-setor.component';
import { SetorRoutingModule } from './setor-routing.module';
import { SetorComponent } from './setor.component';

@NgModule({
  imports: [
    SetorRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [SetorService, BsModalService],
  declarations: [SetorComponent , ListagemSetorComponent]

})
export class SetorModule { }
