import { Component, HostBinding, HostListener } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { SidenavService } from "@nvs-services/componente/sidenav.service";
import { TokenService } from "@nvs-services/token/token.service";
import { Observable } from "rxjs";
import { isOffline$ } from "src/app/core/events/is-offline";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.sass"],
})
export class SideNavComponent {
  public estaLogadoAuth: boolean;
  public nomeUsuario: string;
  public descricaoPerfil: string;
  public isOffline$: Observable<boolean> = isOffline$;

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

  @HostBinding("class.resizing")
  get isResizing(): boolean {
    return this.resizingEvent.isResizing;
  }

  @HostBinding("class.is-expanded")
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  startResizing(event: MouseEvent): void {
    this.resizingEvent = {
      isResizing: true,
      startingCursorX: event.clientX,
      startingWidth: this.sidenavService.sidenavWidth,
    };

    console.log("startResizing", JSON.stringify(this.resizingEvent));
  }

  @HostListener("window:mousemove", ["$event"])
  updateSidenavWidth(event: MouseEvent) {
    if (!this.resizingEvent.isResizing) {
      return;
    }

    const cursorDeltaX = event.clientX - this.resizingEvent.startingCursorX;

    const newWidth = this.resizingEvent.startingWidth + cursorDeltaX;
    console.log("newWidth", newWidth);
    this.sidenavService.setSidenavWidth(newWidth);
  }

  @HostListener("window:mouseup")
  stopResizing() {
    this.resizingEvent.isResizing = false;
  }

  public logOut() {
    this.token.remover();
    this.router.navigate(["login"]);
  }
}
