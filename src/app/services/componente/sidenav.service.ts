import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  isExpanded = true;
  readonly sidenavMinWidth = 250;
  readonly sidenavMaxWidth = window.innerWidth - 300;

  public toggleSidenav() {
    const valueExpanded = !this.isExpanded;
    this.#setWidthBasedByCurrentStateSideNav(valueExpanded);
    this.isExpanded = valueExpanded;
  }

  #setWidthBasedByCurrentStateSideNav(valueExpanded: boolean) {
    if (valueExpanded) {
      document.body.style.setProperty("--sidenav-width-resizing", `${this.sidenavWidth}px`);
      return;
    }

    const sidenavCollapsedWidth = parseInt(
      getComputedStyle(document.body).getPropertyValue("--sidenav-collapsed-width"),
      10,
    );
    document.body.style.setProperty("--sidenav-width-resizing", `${sidenavCollapsedWidth}px`);
  }

  get sidenavWidth(): number {
    const sidenavWidth = parseInt(getComputedStyle(document.body).getPropertyValue("--sidenav-width"), 10);
    return sidenavWidth;
  }

  public setSidenavWidth(width: number) {
    const clampedWidth = Math.min(Math.max(width, this.sidenavMinWidth), this.sidenavMaxWidth);
    document.body.style.setProperty("--sidenav-width", `${clampedWidth}px`);
  }
}
