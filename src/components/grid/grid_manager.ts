import * as PIXI from "pixi.js";
import state, { setState } from "../../state";
import { onKeyDown, onResize, onScroll } from "../../utils";
import Grid from "./grid";

/** grid manager */
export default class GridManager extends PIXI.Container {
    mainGrid: Grid;
    chipGrid: Grid;

    inChipGrid = state.chipEditor;

    /**
     * constructs grid manager
     */
    constructor() {
        super();
        this.mainGrid = new Grid(100);
        this.chipGrid = new Grid(100);
        this.addChild(this.mainGrid);

        onResize(() => {
            if (this.inChipGrid) this.chipGrid.update();
            else this.mainGrid.update();
        });

        onScroll(this, (e) => {
            if (this.inChipGrid) this.chipGrid.scroll(e);
            else this.mainGrid.scroll(e);
        });

        onKeyDown((e) => {
            if (this.inChipGrid) this.chipGrid.keyDown(e);
            else this.mainGrid.keyDown(e);
        });
    }

    /**
     * sets if in chip grid state
     *
     * @param val chip grid state
     */
    setInChipGrid(val: boolean) {
        setState({ chipEditor: val });
        this.inChipGrid = val;
        this.removeChildren();
        if (this.inChipGrid) {
            this.addChild(this.chipGrid);
        } else {
            this.addChild(this.mainGrid);
        }
    }

    /**
     * get grid state
     *
     * @returns chip grid state
     */
    getGrid() {
        return this.inChipGrid ? this.chipGrid : this.mainGrid;
    }
}
