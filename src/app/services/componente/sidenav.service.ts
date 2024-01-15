import type { Type as Component } from "@angular/core";
import { Injectable } from "@angular/core";
import { SidenavContentAreaDirective } from "src/app/directives/sidenav-content-area.directive";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  isExpanded = true;
  readonly sidenavMinWidth = 250;
  readonly sidenavMaxWidth = window.innerWidth - 300;
  #stack = [] as Component<unknown>[];
  #contentArea?: SidenavContentAreaDirective;

  setDynamicContentArea(host: SidenavContentAreaDirective) {
    this.#contentArea = host;
  }

  #setContent(component: Component<unknown>): void {
    this.#contentArea?.viewContainerRef.clear();

    this.#contentArea?.viewContainerRef.createComponent(component);
  }

  push(component: Component<unknown>): void {
    this.#stack.push(component);
    this.#setContent(component);
  }

  pop(): void {
    if (this.#stack.length === 1) {
      return;
    }

    this.#stack.pop();

    this.#setContent(this.#stack[this.#stack.length - 1]);
  }

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
