import * as PIXI from "pixi.js";
import state, { subscribe } from "../../state";
import { onKeyDown, onResize, onScroll } from "../../utils";
import ChipGridMode from "../../utils/chip_grid_mode";
import { Chip } from "../chip/chip";
import Grid from "./grid";

/** grid manager */
export default class GridManager extends PIXI.Container {
    mainGrid: Grid;
    chipGrid: Grid;
    structureGrid: Grid;

    inChipGrid = state.chipEditor;

    /**
     * constructs grid manager
     */
    constructor() {
        super();
        this.mainGrid = new Grid(100);
        this.chipGrid = new Grid(100);
        this.structureGrid = new Grid(100);
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

        subscribe("editingChip", (value) => {
            if (value) this.loadChip(value);
        });
        subscribe("chipEditor", (value) => {
            this.setInChipGrid(value);
        });
        subscribe(
            "chipGridMode",
            () => {
                this.setInChipGrid(true);
            },
            5
        );
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
            if (state.chipGridMode === ChipGridMode.STRUCTURING) {
                state.editingChip?.finishEditing();
                this.addChild(this.structureGrid);
            } else {
                this.addChild(this.chipGrid);
            }
        } else {
            state.editingChip?.finishEditing();
            this.addChild(this.mainGrid);
        }
        this.getGrid().generateTileGraphics();
    }

    /**
     * loads chip into the grid
     *
     * @param chip chip to load
     */
    loadChip(chip: Chip) {
        this.removeChild(this.getGrid());
        console.log("load");
        this.chipGrid = new Grid(100);
        this.chipGrid.tiles = chip.tiles;
        this.structureGrid = new Grid(100);
        this.structureGrid.tiles = chip.structure;
        this.addChild(this.getGrid());
        this.getGrid().generateTileGraphics();
    }

    /**
     * get grid state
     *
     * @returns chip grid state
     */
    getGrid() {
        return this.inChipGrid
            ? state.chipGridMode === ChipGridMode.STRUCTURING
                ? this.structureGrid
                : this.chipGrid
            : this.mainGrid;
    }
}
