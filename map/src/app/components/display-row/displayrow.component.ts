import html from "./displayrow.component.html";
import css from "./displayrow.component.css";
import { EzComponent } from "@gsilber/webez";
import { GridComponent } from "../grid/grid.component";

/**
 * @description DisplayRowComponent displays the rows
 * @extends EzComponent
 *
 */
export class DisplayRowComponent extends EzComponent {
    constructor(boxes: GridComponent[]) {
        super(html, css);
        for (let box of boxes) {
            this.addComponent(box, "boxes");
        }
    }
}
