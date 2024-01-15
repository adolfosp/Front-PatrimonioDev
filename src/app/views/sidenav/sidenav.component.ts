import { Component, HostBinding, OnInit, ViewChild } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SidenavService } from "@nvs-services/componente/sidenav.service";
import { TokenService } from "@nvs-services/token/token.service";
import { Observable } from "rxjs";
import { isOffline$ } from "src/app/core/events/is-offline";
import { SidenavContentAreaDirective } from "src/app/directives/sidenav-content-area.directive";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.sass"],
})
export class SideNavComponent implements OnInit {
  public estaLogadoAuth: boolean;
  public nomeUsuario: string;
  public descricaoPerfil: string;
  public isOffline$: Observable<boolean> = isOffline$;
  @ViewChild(SidenavContentAreaDirective, { static: true })
  sidenavContentArea?: SidenavContentAreaDirective;

  resizingEvent = {
    isResizing: false,
    startingCursorX: 0,
    startingWidth: 0,
  };

  constructor(
    private token: TokenService,
    private router: Router,
    private title: Title,
    public sidenavService: SidenavService,
  ) {
    title.setTitle("Dashboard");
  }

  ngOnInit(): void {
    if (!this.sidenavContentArea) {
      throw new Error("sidenavContentArea is undefined");
    }

    this.sidenavService.setDynamicContentArea(this.sidenavContentArea);
  }

  @HostBinding("class.is-expanded")
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  public logOut() {
    this.token.remover();
    this.router.navigate(["login"]);
  }
}
