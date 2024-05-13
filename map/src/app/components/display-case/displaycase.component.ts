import html from "./displaycase.component.html";
import css from "./displaycase.component.css";
import { EzComponent } from "@gsilber/webez";
import { GridComponent } from "../grid/grid.component";
import { DisplayRowComponent } from "../display-row/displayrow.component";

/**
 * @description DisplayCase is used to display the entire game board
 * @extends EzComponent
 *
 */
export class DisplayColumnComponent extends EzComponent {
    private rows: DisplayRowComponent[] = [];
    private latestID = 0;

    constructor() {
        super(html, css);
    }

    /**
     * when given a row of boxes (GridComponent), the entire row is added to the display, and is then pushed to rows (DisplayRowComponent[])
     * @param boxes the row of boxes being added to the display
     */
    addBoxes(boxes: GridComponent[]) {
        const row = new DisplayRowComponent(boxes);
        this.addComponent(row, "display");
        this.rows.push(row);
    }
}
