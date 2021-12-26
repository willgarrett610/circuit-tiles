import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import { Tile } from "../tiles/tile";

/**
 * Chip
 */
export class Chip {
    name: string;
    color: number;
    tiles: { [key: string]: Tile | undefined } = {};
    inputTiles: { name: string; tile: ChipInputTile }[] = [];
    outputTiles: { name: string; tile: ChipOutputTile }[] = [];

    /**
     * Chip constructor
     *
     * @param name Name of the chip
     * @param color Color of the chip
     */
    constructor(name: string, color: number) {
        this.name = name;
        this.color = color;
    }

    /**
     * get tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns tile at location
     */
    getTile(x: number, y: number) {
        return this.tiles[`${x},${y}`];
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setTile(x: number, y: number, tile: Tile) {
        this.tiles[`${x},${y}`] = tile;
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteTile(x: number, y: number) {
        delete this.tiles[`${x},${y}`];
    }

    /**
     * Save input and output tiles
     */
    finishEditing() {
        for (const [_, tile] of Object.entries(this.tiles)) {
            if (tile instanceof ChipInputTile) {
                // TODO get actual names
                this.inputTiles.push({ name: "", tile: tile });
            } else if (tile instanceof ChipOutputTile) {
                this.outputTiles.push({ name: "", tile: tile });
            }
        }
    }
}
