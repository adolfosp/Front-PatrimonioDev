import { Component, Input } from '@angular/core';

@Component({
  selector: "app-sidenav-link",
  templateUrl: "./sidenav-link.component.html",
  styleUrls: ["./sidenav-link.component.sass"],
})
export class SidenavLinkComponent  {
  @Input()
  routerLink?: string;

  @Input()
  routerLinkActiveOptions: { exact: boolean } = { exact: false };
}
