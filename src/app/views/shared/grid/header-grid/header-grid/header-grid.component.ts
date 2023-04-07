import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-header-grid',
  templateUrl: './header-grid.component.html',
  styleUrls: ['./header-grid.component.sass'],
  standalone: true,
  imports: [RouterModule, CommonModule, MatInputModule, MatIconModule]

})
export class HeaderGridComponent {

  @Output() public exportar = new EventEmitter();
  @Output() public changeValueInput = new EventEmitter();
  @Input() public ehAdministrador: boolean;
  @Input() public rotaNovoRegistro: string;


  public exportarRegistros(e: object): void{
    this.exportar.emit(e);
  }

  public changeValue(e: object): void{
    this.changeValueInput.emit(e);
  }

}
