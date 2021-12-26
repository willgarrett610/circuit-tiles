import * as PIXI from "pixi.js";
import state, { subscribe } from "../../state";
import { onKeyDown, onResize, onScroll } from "../../utils";
import { Chip } from "../chip/chip";
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
            const grid = this.getGrid();
            if (grid.interactive) grid.update();
        });

        onScroll(this, (e) => {
            const grid = this.getGrid();
            if (grid.interactive) grid.scroll(e);
        });

        onKeyDown((e) => {
            const grid = this.getGrid();
            if (grid.interactive) grid.keyDown(e);
        });

        subscribe(["editingChip"], (e) => {
            if (e.value) this.loadChip(e.value);
        });
        subscribe(["chipEditor"], (e) => {
            this.setInChipGrid(e.value);
        });
    }

    /**
     * sets if in chip grid state
     *
     * @param val chip grid state
     */
    setInChipGrid(val: boolean) {
        this.inChipGrid = val;
        this.removeChildren();
        if (this.inChipGrid) {
            this.addChild(this.chipGrid);
        } else {
            state.editingChip?.finishEditing();
            this.addChild(this.mainGrid);
        }
    }

    /**
     * loads chip into the grid
     *
     * @param chip chip to load
     */
    loadChip(chip: Chip) {
        this.chipGrid = new Grid(100);
        this.chipGrid.tiles = chip.tiles;
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
