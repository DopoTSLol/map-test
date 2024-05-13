import html from "./row.component.html";
import css from "./row.component.css";
import {
    BindAttribute,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import { GridComponent } from "../grid/grid.component";
/**
 * @description A singular row of tiles on the game board
 * @extends EzComponent
 *
 */
export class RowComponent extends EzComponent {
    private boxes: GridComponent[] = [];
    private latestID = 0;
    //main game state variables, as well as the storage for the boxes

    private colorValues: number[] = [];
    //more game state variables

    @BindAttribute("row", "title", (id: number) => id.toString())
    private rowID: number;

    createEvent: EventSubject<GridComponent[]> = new EventSubject();
    removeEvent: EventSubject<number> = new EventSubject<number>();

    constructor(id: number, rowAmount: number) {
        super(html, css);
        this.addBox(rowAmount);
        this.rowID = id;
    }

    /**
     * Creates the row of boxes to the length of rowNum
     * @param rowNum how long the row is
     */
    addBox(rowNum: number) {
        this.latestID = 0;
        for (let i = 0; i < rowNum; i++) {
            const newBox = new GridComponent(this.latestID);
            this.addComponent(newBox, "row");
            this.boxes.push(newBox);
            this.latestID += 1;

            newBox.changeColor(0);
            this.colorValues.push(newBox.getColor());

            newBox.removeEvent.subscribe((id: number) => {
                this.removeBox(id);
            });
        }
    }


    /**
     * returns the row values
     * @returns the row values
     */
    giveRowValues(): number[] {
        return this.colorValues;
    }

    /**
     * gets the new on/off (or gamestate) values, then updates the boxes in the rows with those values accordingly
     * @param newValues the given row values from the main
     */
    getRowValues(newValues: number[]) {
        for (let i = 0; i < newValues.length; i++) {
            this.colorValues[i] = newValues[i];
            this.boxes[i].changeColor(this.colorValues[i]);
        }
    }



    /**
     * removes a box of target value target
     * @param target the target box that will be removed
     */
    removeBox(target: number) {
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i].getID() === target) {
                const removedElements = this.boxes.splice(i, 1);
                for (let e of removedElements) {
                    this.removeComponent(e);
                }
            }
        }
    }

    /**
     * returns the id of the row
     * @returns the
     */
    getID(): number {
        return this.rowID;
    }
}
