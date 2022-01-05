import config from "../../config";
import ButtonTile from "./button_tile";
import ChipInputTile from "./chip_input_tile";
import ChipOutputTile from "./chip_output_tile";
import DelayTile from "./delay_tile";
import DiodeTile from "./diode_tile";
import LeverTile from "./lever_tile";
import NotTile from "./not_tile";
import StructureTile from "./structure_tile";
import { Tile } from "./tile";
import WireTile from "./wire_tile";

export type TileConstructor = {
    new (x: number, y: number): Tile;
};

export interface TileType {
    name: string;
    tile: TileConstructor;
}

export interface ChipOutputTileType extends TileType {
    hue: number;
}

const tileTypes = [
    { name: "Wire", tile: WireTile },
    { name: "Lever", tile: LeverTile },
    { name: "Not Gate", tile: NotTile },
    { name: "Diode", tile: DiodeTile },
    { name: "Delay", tile: DelayTile },
    { name: "Button", tile: ButtonTile },
    { name: "Input", tile: ChipInputTile },
    {
        name: "Output",
        tile: ChipOutputTile,
        hue: config.colors.defaultOutputHue,
    },
];

/**
 * Find tile type by constructor
 *
 * @param type The tile constructor
 * @returns Full tile type
 */
export function findType(type: TileConstructor) {
    if (type === StructureTile) return { name: "Block", tile: type };
    return tileTypes.find((tile) => tile.tile === type);
}

/**
 * Get tile types
 *
 * @param chipTileIncluded whether to include chip tiles
 * @returns list of tile types
 */
export function getTileTypes(chipTileIncluded = true): TileType[] {
    return chipTileIncluded
        ? tileTypes
        : tileTypes.filter((x) => x.tile.chipTile === false);
}

export default getTileTypes;
