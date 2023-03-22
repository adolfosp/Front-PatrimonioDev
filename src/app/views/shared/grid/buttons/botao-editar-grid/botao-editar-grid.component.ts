import { Component, EventEmitter, Output } from "@angular/core";
import { ConfiguracaoIcone } from "@nvs-utils/configuracao-icone";

@Component({
  selector: 'app-botao-editar-grid',
  templateUrl: './botao-editar-grid.component.html',
  styleUrls: ['./botao-editar-grid.component.sass']
})
export class BotaoEditarGridComponent {
  @Output() public detalheCategoria = new EventEmitter();

  public confIcone = ConfiguracaoIcone;

  public detalharCategoria(e: object): void{
    console.log(e);
    this.detalheCategoria.emit(e);
  }

}
