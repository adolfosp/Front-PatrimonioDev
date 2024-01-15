import { Component } from "@angular/core";

@Component({
  template: `
    <h1>Sidenav</h1>

    <app-sidenav-link routerLink="/dashboard">
      <mat-icon icon>arrow_back</mat-icon>

      Back
    </app-sidenav-link>

    <app-sidenav-link routerLink="/dashboard/settings">
      <mat-icon icon>person</mat-icon>

      Account
    </app-sidenav-link>

    <app-sidenav-link routerLink="/settings">
      <mat-icon icon>security</mat-icon>

      Security
    </app-sidenav-link>

    <app-sidenav-link routerLink="/settings">
      <mat-icon icon>notifications</mat-icon>

      Notifications
    </app-sidenav-link>
  `,
})
export class PessoaSidenavComponent {}
