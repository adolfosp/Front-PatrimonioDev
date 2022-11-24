import { Component } from '@angular/core';


@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  public mensagemErro: string = 'Oops! Não conseguimos encontrar essa página.';
  public caminhoImagemDark: string = 'assets/img/404-dark.gif';
  public caminhoImagemLight: string = 'assets/img/404.gif';

  constructor() { }

  ngOnInit() {

  }


}
