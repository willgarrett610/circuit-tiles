/* eslint-disable @typescript-eslint/no-explicit-any */

import { PlacedChip } from "../chip/placed_chip";
import ChipInputTile from "./chip_input_tile";
import ChipOutputTile from "./chip_output_tile";
import StructureTile from "./structure_tile";
import { GraphicsTile } from "./tile";

/**
 * Generic io tile
 */
export default abstract class ChipTile extends GraphicsTile {
    static chipTile = true;
    chip: PlacedChip | undefined;

    abstract type:
        | typeof ChipInputTile
        | typeof ChipOutputTile
        | typeof StructureTile;

    rotatable = false;

    id: string = "";

    /**
     * update container
     */
    updateContainer(): void {
        super.updateContainer();
    }

    /**
     * Create a clone of this tile
     *
     * @param tile Tile
     */
    createClone(tile: ChipTile): void {
        this.id = tile.id;
        this.chip = tile.chip;
    }
}
