import * as PIXI from "pixi.js";
import Grid from "./grid";

export default class GridManager extends PIXI.Container {
    mainGrid: Grid;
    chipGrid: Grid;

    inChipGrid = false;

    constructor() {
        super();
        this.mainGrid = new Grid(100);
        this.chipGrid = new Grid(100);
        this.addChild(this.mainGrid);
    }

    setInChipGrid(val: boolean) {
        this.inChipGrid = val;
        this.removeChildren();
        if (this.inChipGrid) {
            this.addChild(this.chipGrid);
        } else {
            this.addChild(this.mainGrid);
        }
    }

    getGrid() {
        return this.inChipGrid ? this.chipGrid : this.mainGrid;
    }
}
