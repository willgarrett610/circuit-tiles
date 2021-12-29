import { publish } from "../../state";
import Grid from "../grid/grid";
import { Chip } from "./chip";

/** Chip Grid */
export default class ChipGrid {
    chip: Chip;
    grids: {
        chip: Grid;
        structure: Grid;
    };

    /**
     * Constructs chip grid
     *
     * @param chip
     */
    constructor(chip: Chip) {
        this.chip = chip;
        this.grids = {
            chip: new Grid(100, chip.tiles),
            structure: new Grid(100, chip.structure),
        };

        this.grids.chip.addHandler("postAddTile", (tile) => {
            this.chip.tileAdded(tile);
        });

        this.grids.structure.addHandler("postAddTile", (tile) => {
            this.chip.tileAdded(tile);
            publish("editedChip");
        });
        this.grids.structure.addHandler("postRemoveTile", () => {
            publish("editedChip");
        });
    }

    /** reloads in the tiles for chip and structure grids */
    reload() {
        this.reloadChipGrid();
        this.reloadStructureGrid();
    }

    /** reloads in the tiles for chip grid */
    reloadChipGrid() {
        this.grids.chip.tiles = this.chip.tiles;
        this.grids.chip.generateTileGraphics();
    }

    /** reloads in the tiles for structure grid */
    reloadStructureGrid() {
        this.grids.structure.tiles = this.chip.structure;
        this.grids.structure.generateTileGraphics();
    }
}
