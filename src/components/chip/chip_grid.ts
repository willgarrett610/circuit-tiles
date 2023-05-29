import state, { setState, update } from "../../state";
import InteractiveChipGrid from "../grid/interactive_chip_grid";
import InteractiveGrid from "../grid/interactive_grid";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import ChipTile from "../tiles/chip_tile";
import { Chip, ClashResult } from "./chip";

/** Chip Grid */
export default class ChipGrid {
    chip: Chip;
    grids: {
        chip: InteractiveChipGrid;
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
            chip: new InteractiveChipGrid(chip, 100, chip.tiles, [...chip.placedChipsInside]),
            structure: new InteractiveGrid(100, chip.structure),
        };

        this.grids.chip.addHandler("postAddChip", async (placedChip) => {
            this.chip.placedChipsInside.push(placedChip);
            this.chip.chipDependencies.add(placedChip.chip.getRootOriginal());
        });

        this.grids.chip.addHandler("postRemoveChip", async (removedPlacedChip) => {
            this.chip.placedChipsInside.splice(this.chip.placedChipsInside.indexOf(removedPlacedChip), 1);

            const ogChip = removedPlacedChip.chip.getRootOriginal();
            if (this.chip.placedChipsInside.every((pCI) => pCI.chip.getRootOriginal() !== ogChip)) {
                this.chip.chipDependencies.delete(ogChip);
            }
        });

        this.grids.chip.addHandler("postAddTile", async (tile) => {
            this.chip.tileAdded(tile);
            setState({ isStructured: this.chip.isStructured() });
        });

        this.grids.chip.addHandler("postRemoveTile", async (tile) => {
            this.chip.tileRemoved(tile);
            setState({ isStructured: this.chip.isStructured() });
        });

        this.grids.structure.addHandler("preAddTile", async (tile, reject) => {
            if ((await this.chip.checkClash(tile as ChipTile)) === ClashResult.CLASH) {
                reject?.();
            }
        });

        this.grids.structure.addHandler("postAddTile", async (tile) => {
            if (tile instanceof ChipInputTile || tile instanceof ChipOutputTile) {
                tile.id = state.selectableTiles[state.selectedTileIndex].name;
                tile.generateText();
            }

            await this.chip.structureTileAdded(tile as ChipTile);

            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
        });

        this.grids.structure.addHandler("postRemoveTile", async (tile) => {
            await this.chip.structureTileRemoved(tile);

            setState({
                isStructured: this.chip.isStructured(),
                editedChip: update,
            });
        });
    }
}
