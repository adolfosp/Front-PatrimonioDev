import { Component, EventEmitter, Output } from "@angular/core";
import { ConfiguracaoIcone } from "@nvs-utils/configuracao-icone";

@Component({
  selector: 'app-botao-remover-grid',
  templateUrl: './botao-remover-grid.component.html',
  styleUrls: ['./botao-remover-grid.component.sass']
})
export class BotaoRemoverGridComponent {
  @Output() public abrirModal = new EventEmitter();
  public confIcone = ConfiguracaoIcone;


  public abrirModalRemocao(e: object){
    this.abrirModal.emit(e);
  }
}
