import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// eslint-disable-next-line sort-imports
import { ButtonComponent } from './button/button.component';
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatIconModule } from "@angular/material/icon";
import { BotaoEditarGridComponent } from './grid/buttons/botao-editar-grid/botao-editar-grid.component';
import { BotaoRemoverGridComponent } from './grid/buttons/botao-remover-grid/botao-remover-grid.component';
import { SelectPaginacaoComponent } from './form/select-paginacao/select-paginacao.component';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

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
