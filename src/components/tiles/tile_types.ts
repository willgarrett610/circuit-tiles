/* eslint-disable @typescript-eslint/no-explicit-any */
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

/**
 * Holds name of tile and its constructor
 */
export class TileType {
    name: string;
    tile: TileConstructor;

    /**
     * Constructs a tile type
     *
     * @param name Tile name
     * @param tile Tile constructor
     */
    constructor(name: string, tile: TileConstructor) {
        this.name = name;
        this.tile = tile;
    }

    /**
     * Create a clone of this tile type
     *
     * @returns TileType
     */
    clone() {
        return { ...this };
    }
}

/**
 * Special tile type for chip output
 */
export class ChipOutputTileType extends TileType {
    hue: number;

    /**
     * Constructs a tile type
     *
     * @param name Tile name
     * @param tile Tile constructor
     * @param hue Hue of tile
     */
    constructor(name: string, tile: TileConstructor, hue: number) {
        super(name, tile);
        this.hue = hue;
    }
}

const tileTypes = [
    new TileType("Wire", WireTile),
    new TileType("Lever", LeverTile),
    new TileType("Not Gate", NotTile),
    new TileType("Diode", DiodeTile),
    new TileType("Delay", DelayTile),
    new TileType("Button", ButtonTile),
    new TileType("Input", ChipInputTile),
    new ChipOutputTileType(
        "Output",
        ChipOutputTile,
        config.colors.defaultOutputHue
    ),
];

/**
 * Find tile type by constructor
 *
 * @param type The tile constructor
 * @returns Full tile type
 */
export function findType(type: TileConstructor): TileType | undefined {
    if (type === StructureTile) return new TileType("Block", type);
    return tileTypes.find((tile) => tile.tile === type)?.clone();
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
        : tileTypes.filter((x) => (x.tile as any).chipTile === false);
}

export default getTileTypes;
