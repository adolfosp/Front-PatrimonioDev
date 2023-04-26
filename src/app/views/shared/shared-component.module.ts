import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { ButtonComponent } from './button/button.component';
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { BotaoEditarGridComponent } from './grid/buttons/botao-editar-grid/botao-editar-grid.component';
import { BotaoRemoverGridComponent } from './grid/buttons/botao-remover-grid/botao-remover-grid.component';
import { SelectPaginacaoComponent } from './form/select-paginacao/select-paginacao.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    providers: [],
    declarations: [ButtonComponent, BotaoEditarGridComponent, BotaoRemoverGridComponent, SelectPaginacaoComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  exports: [ButtonComponent, BotaoEditarGridComponent, BotaoRemoverGridComponent, SelectPaginacaoComponent]
})
export class SharedComponentModule { }
