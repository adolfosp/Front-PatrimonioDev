import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MovimentacaoService } from '@nvs-services/movimentacao/movimentacao.service';
import { TableModule } from 'ngx-easy-table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from 'src/app/shared.module';
import { HeaderGridComponent } from '../shared/grid/header-grid/header-grid.component';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ListagemMovimentacaoComponent } from './listagem-movimentacao/listagem-movimentacao.component';
import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { MovimentacaoComponent } from './movimentacao.component';

@NgModule({
  imports: [
    MovimentacaoRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    SharedComponentModule,
    HeaderGridComponent,
  ],
  providers: [MovimentacaoService],
  declarations: [MovimentacaoComponent, ListagemMovimentacaoComponent],
})
export class MovimentacaoModule {}
