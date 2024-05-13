import html from "./grid.component.html";
import css from "./grid.component.css";
import {
    BindAttribute,
    BindStyle,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";

/**
 * @description A singular tile on the game board
 * @extends EzComponent
 *
 */
export class GridComponent extends EzComponent {
    @BindAttribute("grid", "title", (id: number) => id.toString())
    private id: number;

    @BindStyle("grid", "backgroundColor")
    private bgColor: string = "#00ff00";
    private color: number = 0;


    public isComplete = false;

    removeEvent: EventSubject<number> = new EventSubject<number>();

    constructor(id: number) {
        super(html, css);
        this.id = id;
    }

    /**
     * gets the ID
     * @returns the ID of the box
     */
    getID(): number {
        return this.id;
    }

    getColor(): number {
        return this.color;
    }

    /**
     * When given a number, the color of the box, as well as its state (isOn) will update
     * @param willThisBeOn a number representing the state (0 = off, 1 = on)
     */
    changeColor(newColor: number) {
        this.color = newColor;

        switch(newColor){
            case 0:
                this.bgColor = "lime";//grass
                break;

            case 1:
                this.bgColor = "green";//forest
                break;
            case 2:
                this.bgColor = "yellow";//desert
                break;
            case 3:
                this.bgColor = "gray";//mountains
                break;
            case 4:
                this.bgColor = "white";//tundra
                break;
            case 5:
                this.bgColor = "blue";//sea
                break;
        }
    }
}
