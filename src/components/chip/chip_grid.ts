import state, { setState, update } from "../../state";
import Grid from "../grid/grid";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
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
            setState({ isStructured: this.chip.isStructured() });
        });

        this.grids.chip.addHandler("postRemoveTile", (tile) => {
            this.chip.tileRemoved(tile);
            setState({ isStructured: this.chip.isStructured() });
        });
        this.grids.structure.addHandler("postAddTile", (tile) => {
            console.log("structured: ", this.chip.isStructured());
            if (
                tile instanceof ChipInputTile ||
                tile instanceof ChipOutputTile
            ) {
                tile.id = state.selectableTiles[state.selectedTileIndex].name;
                tile.generateText();
            }
            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
        });
        this.grids.structure.addHandler("postRemoveTile", () => {
            console.log("structured: ", this.chip.isStructured());
            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
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
