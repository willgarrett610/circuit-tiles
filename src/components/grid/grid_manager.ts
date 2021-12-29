import * as PIXI from "pixi.js";
import state, { subscribe } from "../../state";
import { onKeyDown, onResize, onScroll } from "../../utils";
import ChipGridMode from "../../utils/chip_grid_mode";
import { Chip } from "../chip/chip";
import Grid from "./grid";

/** grid manager */
export default class GridManager extends PIXI.Container {
    mainGrid: Grid;

    inChipGrid = state.chipEditor;

    /**
     * constructs grid manager
     */
    constructor() {
        super();
        this.mainGrid = new Grid(100);
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

        subscribe("currentChipGrid", (chipGrid) => {
            if (chipGrid) this.loadChip(chipGrid.chip);
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
                state.currentChipGrid?.chip.finishEditing();
                if (state.currentChipGrid?.grids.structure) {
                    this.addChild(state.currentChipGrid.grids.structure);
                }
            } else {
                if (state.currentChipGrid?.grids.chip) {
                    this.addChild(state.currentChipGrid.grids.chip);
                }
            }
        } else {
            state.currentChipGrid?.chip.finishEditing();
            this.addChild(this.mainGrid);
        }
        this.getGrid().generateTileGraphics();
    }

    /**
     * loads chip into the grid
     *
     * @param chip chip to load
     * @param generateGrid if a new grid should be generated
     */
    loadChip(chip: Chip, generateGrid = true) {
        // if (generateGrid) {
        //     this.removeChild(this.getGrid());
        //     this.chipGrid = new Grid(100);
        //     this.chipGrid.tiles = chip.tiles;
        //     this.structureGrid = new Grid(100);
        //     this.structureGrid.tiles = chip.structure;
        //     this.getGrid().generateTileGraphics();
        // }
        // this.addChild(this.getGrid());
    }

    /**
     * get grid state
     *
     * @returns chip grid state
     */
    getGrid() {
        return this.inChipGrid &&
            state.currentChipGrid?.grids.structure &&
            state.currentChipGrid?.grids.chip
            ? state.chipGridMode === ChipGridMode.STRUCTURING
                ? state.currentChipGrid.grids.structure
                : state.currentChipGrid.grids.chip
            : this.mainGrid;
    }
}
