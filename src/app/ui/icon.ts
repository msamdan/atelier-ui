import { Component, input } from "@angular/core";
import { TuiIcon } from "@taiga-ui/core";
@Component({
  selector: "ui-icon",
  imports: [TuiIcon],
  template: `<tui-icon [icon]="'@tui.' + name()" />`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    tui-icon {
      width: 1.1rem;
      height: 1.1rem;
    }
  `,
})
export class Icon {
  name = input("circle");
}
