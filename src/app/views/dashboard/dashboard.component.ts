import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { SidenavService } from "@nvs-services/componente/sidenav.service";
import { DefaultSidenavComponent } from "../sidenav/default-sidenav/default-sidenav.component";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.sass"],
})
export class DashboardComponent implements AfterViewInit, OnDestroy {

  constructor(public sidenavService: SidenavService, private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.sidenavService.push(DefaultSidenavComponent);
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.sidenavService.pop();
  }
}
