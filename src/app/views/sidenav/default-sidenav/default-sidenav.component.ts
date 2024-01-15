import { ChangeDetectorRef, Component } from "@angular/core";
import { SidenavService } from "@nvs-services/componente/sidenav.service";
import { PessoaSidenavComponent } from "./pessoa-sidenav.component";

@Component({
  template: `
    <h1>Sidenav</h1>

    <app-sidenav-link routerLink="/dashboard">
      <mat-icon icon>home</mat-icon>

      Home
    </app-sidenav-link>

    <app-sidenav-link (click)="mudar()">
      <mat-icon icon>Pessoas</mat-icon>

      Pessoas
    </app-sidenav-link>
  `,
})
export class DefaultSidenavComponent {
  constructor(public sidenavService: SidenavService, private cdr: ChangeDetectorRef) {}

  mudar() {
    this.sidenavService.push(PessoaSidenavComponent);
    this.cdr.detectChanges();
  }
}
