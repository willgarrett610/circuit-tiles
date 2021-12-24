import ButtonTile from "./button_tile";
import ChipInputTile from "./chip_input_tile";
import ChipOutputTile from "./chip_output_tile";
import DelayTile from "./delay_tile";
import DiodeTile from "./diode_tile";
import LeverTile from "./lever_tile";
import NotTile from "./not_tile";
import { Tile } from "./tile";
import WireTile from "./wire_tile";

const tileTypes = [
    WireTile,
    LeverTile,
    NotTile,
    DiodeTile,
    DelayTile,
    ButtonTile,
    ChipInputTile,
    ChipOutputTile,
];

/**
 * Get tile types
 *
 * @param chipTileIncluded whether to include chip tiles
 * @returns list of tile types
 */
function getTileTypes(
    chipTileIncluded = true
): Array<{ new (x: number, y: number): Tile }> {
    return chipTileIncluded
        ? tileTypes
        : tileTypes.filter((x) => x.chipTile === false);
}

export default getTileTypes;
