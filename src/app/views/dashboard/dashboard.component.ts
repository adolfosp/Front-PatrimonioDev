import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { TokenService } from "@nvs-services/token/token.service";
import { Observable } from "rxjs";
import { isOffline$ } from "src/app/core/events/is-offline";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements OnInit {
  public estaLogadoAuth: boolean;
  public nomeUsuario: string;
  public descricaoPerfil: string;
  public isOffline$: Observable<boolean> = isOffline$;

  constructor(private token: TokenService, private router: Router, private title: Title) {
    title.setTitle("Dashboard");
  }

  ngOnInit(): void {
    this.carregarArquivoJs("assets/js/app.js");
    this.nomeUsuario = this.token.obterNomeUsuarioToken();
    this.descricaoPerfil = this.token.obterDescricaoPerfil();
  }

  public carregarArquivoJs(url) {
    const node = document.createElement("script");
    node.src = url;
    node.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(node);
  }

  public logOut() {
    this.token.removerToken();
    this.router.navigate(["login"]);
  }
}
