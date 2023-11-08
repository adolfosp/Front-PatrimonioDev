import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NgSelectModule } from '@ng-select/ng-select';
import { EquipamentoService } from '@nvs-services/equipamento/equipamento.service';
import { FuncionarioService } from '@nvs-services/funcionario/funcionario.service';
import { PatrimonioService } from '@nvs-services/patrimonio/patrimonio.service';
import { QRCodeModule } from 'angularx-qrcode';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxCurrencyModule } from 'ngx-currency';
import { TableModule } from 'ngx-easy-table';
import { NgxMaskModule } from 'ngx-mask';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EtiquetaCanvasComponent } from '../etiqueta-canvas/etiqueta-canvas.component';
import { PerdaComponent } from '../perda/perda.component';
import { SharedComponentModule } from '../shared/shared-component.module';
import { ListagemPatrimonioComponent } from './listagem-patrimonio/listagem-patrimonio.component';
import { PatrimonioRoutingModule } from './patrimonio-routing.module';
import { PatrimonioComponent } from './patrimonio.component';
import { HeaderGridComponent } from "../shared/grid/header-grid/header-grid.component";
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  providers: [PatrimonioService, EquipamentoService, FuncionarioService, BsModalService],
  declarations: [
    PatrimonioComponent,
    ListagemPatrimonioComponent,
    EtiquetaCanvasComponent,
    PerdaComponent
  ],
  imports: [
    PatrimonioRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TableModule,
    NgSelectModule,
    QRCodeModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskModule,
    NgxCurrencyModule,
    SharedComponentModule,
    MatPaginatorModule,
    HeaderGridComponent,
  ],
})
export class PatrimonioModule {}