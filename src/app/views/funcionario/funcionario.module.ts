import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared.module';
import { SetorService } from '../../services/setor/setor.service';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { SharedComponentModule } from '../shared/shared-component.module';
import { FuncionarioRoutingModule } from './funcionario-routing.module';
import { FuncionarioComponent } from './funcionario.component';
import { ListagemFuncionarioComponent } from './listagem-funcionario/listagem-funcionario.component';

@NgModule({
    providers: [FuncionarioService, BsModalService, SetorService],
    declarations: [FuncionarioComponent, ListagemFuncionarioComponent],
    imports: [
        FuncionarioRoutingModule,
        FormsModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        CommonModule,
        TableModule,
        SharedModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        HeaderGridComponent,
        MatPaginatorModule,
        SharedComponentModule,
    ]
})
export class FuncionarioModule { }
