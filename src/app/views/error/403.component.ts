import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-403',
  templateUrl: './403.component.html'

})
export class P403Component implements OnInit {

  public mensagemErro: string = 'Oops! Você não tem autorização para entrar nesse módulo.';
  public caminhoImagemDark: string = 'assets/img/403-dark.gif';
  public caminhoImagemLight: string = 'assets/img/403.gif';

  constructor() { }

  ngOnInit() {
  }

}
