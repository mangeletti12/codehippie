import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "th[resizable], mat-header-cell[resizable]",
  templateUrl: "./resizable.template.html",
  styleUrls: ["./resizable.style.scss"],
})
export class ResizableComponent {
  //
  @HostBinding("style.width.px")
  width: number | null = null;

  onResize(width: number) {
    this.width = width;
  }
}
