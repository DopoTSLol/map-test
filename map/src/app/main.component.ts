import html from "./main.component.html";
import css from "./main.component.css";
import {
    BindValue,
    BindValueToNumber,
    Change,
    Click,
    EzComponent,
    Timer,
    ValueEvent,
} from "@gsilber/webez";
import "@gsilber/webez";
import { GridComponent } from "./components/grid/grid.component";
import { RowComponent } from "./components/row/row.component";
import { DisplayColumnComponent } from "./components/display-case/displaycase.component";

/**
 * @description MainComponent is the main component of the app
 * @extends EzComponent
 *
 */
export class MainComponent extends EzComponent {
    private rows: RowComponent[] = [];
    private displays: DisplayColumnComponent[] = [];
    private latestID = 0;
    //row information

    private colorValues: number[][] = [];
    private xOffset : number = 0;
    private yOffset : number = 0;
    //state of the boxes storage

    private rowsNum: number = 25;
    //width variables

    private columnsNum: number = 25;
    private prevColumns = this.columnsNum;

    constructor() {
        super(html, css);
        this.addRows(this.columnsNum);
    }

    /**
     * adds (rowNum) amount of rows to the game board
     * @param rowNum the amount of rows that will be added to both the display case + the array rows
     */
    addRows(rowNum: number) {

        this.latestID = 0;
        for (let i = 0; i < rowNum; i++) {
            const newRow = new RowComponent(
                this.latestID,
                this.rowsNum,
            );
            this.addComponent(newRow, "rows");
            this.rows.push(newRow);
            this.latestID += 1;

            const displayCase = new DisplayColumnComponent();
            this.addComponent(displayCase, "display-case");
            this.displays.push(displayCase);

            newRow.createEvent.subscribe((boxes: GridComponent[]) => {
                displayCase.addBoxes(boxes);
            });
        }

        this.initializeColor();
    } //adds the rows



    /**
     * initializes the on/off values of all of the rows
     */
    initializeColor() {
        for (let i = 0; i < this.rows.length; i++) {
            this.colorValues.push(this.rows[i].giveRowValues());
        }

        this.mapGen(this.colorValues.length, this.colorValues[0].length, 0, 0);
    }

    mapGen(y: number, x : number, offsetY: number, offsetX: number){
        for (let i=0; i<y; i++){
            for (let j=0; j<x; j++){
                this.colorValues[i+offsetY][j+offsetX] = Math.floor(Math.random()*8);
                if(this.colorValues[i+offsetY][j+offsetX] > 5){
                    this.colorValues[i+offsetY][j+offsetX] = 5;
                }
                //this.colorValues[i][j] = this.colorChances[Math.floor(Math.random() * this.colorChances.length)];
            }
        }

        for (let i=0; i<y; i++){
            for (let j=0; j<x; j++){
                this.colorValues[i+offsetY][j+offsetX] = this.mapGenValue(i, j);
                if(this.colorValues[i+offsetY][j+offsetX] > 5){
                    this.colorValues[i+offsetY][j+offsetX] = 5;
                }
            }
        }

        this.updateDisplay();

    }

    mapGenValue(y : number, x : number): number{
        let d8 : number = Math.floor(Math.random()*9);
        let newVal : number = this.mapGenValue2(y,x,d8);

        do{
            d8 = Math.floor(Math.random()*9);
            newVal = this.mapGenValue2(y,x,d8);
        }while(newVal === -1);

        return newVal;
    }

    mapGenValue2(y : number, x : number, roll : number): number{
        if(roll === 0 || roll === 1 || roll === 2){
            if(y - 1 >= 0){
                switch(roll){
                    case 0:
                        if(x-1 >= 0){
                            return this.colorValues[y-1][x-1];
                        } else {
                            return -1;
                        }
                        break;
    
                    case 2:
                        if(x+1 < this.colorValues[y].length){
                            return this.colorValues[y-1][x+1];
                        } else {
                            return -1;
                        }
                        break;
                    
                    default:
                        return this.colorValues[y-1][x];
                }
            } else {
                return -1;
            }
        } else if (roll === 3 || roll === 4 || roll === 5){
            switch(roll){
                case 3:
                    if(x-1 >= 0){
                        return this.colorValues[y][x-1];
                    } else {
                        return -1;
                    }
                    break;

                case 5:
                    if(x+1 < this.colorValues[y].length){
                        return this.colorValues[y][x+1];
                    } else {
                        return -1;
                    }
                    break;
                
                default:
                    return Math.floor(Math.random()*18);
            }
        } else if (roll === 6 || roll === 7 || roll === 8){
            if(y+1 < this.colorValues.length){
                switch(roll){
                    case 6:
                        if(x-1 >= 0){
                            return this.colorValues[y+1][x-1];
                        } else {
                            return -1;
                        }
                        break;
    
                    case 8:
                        if(x+1 < this.colorValues[y].length){
                            return this.colorValues[y+1][x+1];
                        } else {
                            return -1;
                        }
                        break;
                    
                    default:
                        return this.colorValues[y+1][x-1];
                }
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    }

    @Click("buttX")
    increaseX(){
        for(let i=0; i<this.colorValues.length; i++){
            this.colorValues[i].push(this.mapGenValue(i, this.colorValues[i].length));
        }

        this.xOffset+= 1;
        this.updateDisplay();
    }

    updateDisplay(){
        let count : number = 0;
        for(let i=this.yOffset; count<this.colorValues.length - this.yOffset; i++, count++){
            this.rows[i].getRowValues(this.colorValues[i].slice(this.xOffset));
        }        
    }

    @Timer(50)
    update(){
        this.increaseX();
    }

    /**
     * removes all of the current rows
     */
    removeRows() {
        for (let i = 0; i < this.prevColumns; i++) {
            this.removeComponent(this.rows[i]);
            this.removeComponent(this.displays[i]);
        }


        this.rows = [];
        this.displays = [];
        this.prevColumns = this.columnsNum;
        this.colorValues = [];
    }

}
