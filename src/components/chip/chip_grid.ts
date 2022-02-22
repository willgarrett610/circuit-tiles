import state, { setState, update } from "../../state";
import InteractiveGrid from "../grid/interactive_grid";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import ChipTile from "../tiles/chip_tile";
import { Chip } from "./chip";

/** Chip Grid */
export default class ChipGrid {
    chip: Chip;
    grids: {
        chip: InteractiveGrid;
        structure: InteractiveGrid;
    };

    /**
     * Constructs chip grid
     *
     * @param chip
     */
    constructor(chip: Chip) {
        this.chip = chip;
        this.grids = {
            chip: new InteractiveGrid(100, chip.tiles),
            structure: new InteractiveGrid(100, chip.structure),
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
            if (
                tile instanceof ChipInputTile ||
                tile instanceof ChipOutputTile
            ) {
                tile.id = state.selectableTiles[state.selectedTileIndex].name;
                tile.generateText();
            }

            this.chip.structureTileAdded(tile as ChipTile);

            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
        });

        this.grids.structure.addHandler("postRemoveTile", (tile) => {
            this.chip.structureTileRemoved(tile);

            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
        });
    }
}
