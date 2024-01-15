import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonComponent } from './button/button.component';
import { SelectPaginacaoComponent } from './form/select-paginacao/select-paginacao.component';
import { BotaoEditarGridComponent } from './grid/buttons/botao-editar-grid/botao-editar-grid.component';
import { BotaoRemoverGridComponent } from './grid/buttons/botao-remover-grid/botao-remover-grid.component';

@NgModule({
  providers: [],
  declarations: [ButtonComponent, BotaoEditarGridComponent, BotaoRemoverGridComponent, SelectPaginacaoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    NgxSpinnerModule,
    MatSelectModule,
  ],
  exports: [ButtonComponent, BotaoEditarGridComponent, BotaoRemoverGridComponent, SelectPaginacaoComponent],
})
export class SharedComponentModule {}
