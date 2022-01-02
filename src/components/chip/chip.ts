/* eslint-disable @typescript-eslint/no-explicit-any */
import state from "../../state";
import { mapObject } from "../../utils";
import ChipGridMode from "../../utils/chip_grid_mode";
import { Direction } from "../../utils/directions";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import StructureTile from "../tiles/structure_tile";
import { Tile } from "../tiles/tile";

/**
 * Chip
 */
export class Chip {
    name: string;
    color: number;
    hue: number;
    tiles: { [key: string]: Tile | undefined } = {};
    inputTiles: { name: string; tile: ChipInputTile }[] = [];
    outputTiles: { name: string; tile: ChipOutputTile }[] = [];
    structure: {
        [key: string]:
            | ChipInputTile
            | ChipOutputTile
            | StructureTile
            | undefined;
    } = {};

    /**
     * Chip constructor
     *
     * @param name Name of the chip
     * @param color Color of the chip
     * @param hue Hue of the color
     */
    constructor(name: string, color: number, hue: number) {
        this.name = name;
        this.color = color;
        this.hue = hue;
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
     * get tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns tile at location
     */
    getStructureTile(x: number, y: number) {
        return this.structure[`${x},${y}`];
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setStructureTile(
        x: number,
        y: number,
        tile: ChipInputTile | ChipOutputTile | StructureTile
    ) {
        this.structure[`${x},${y}`] = tile;
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteStructureTile(x: number, y: number) {
        delete this.structure[`${x},${y}`];
    }

    /**
     * Called after a tile is added to the chip
     *
     * @param tile Tile that was added
     */
    tileAdded(tile: Tile) {
        if (tile instanceof ChipInputTile || tile instanceof ChipOutputTile) {
            if (state.chipGridMode === ChipGridMode.STRUCTURING) {
                tile.id = state.selectableTiles[state.selectedTileIndex].name;
            } else {
                if (tile instanceof ChipInputTile) {
                    let i = 1;
                    let newId: string;
                    do {
                        newId = "IN" + i++;
                    } while (this.inputTiles.find((x) => x.name === newId));
                    tile.id = newId;
                    this.inputTiles.push({ name: tile.id, tile: tile });
                } else if (tile instanceof ChipOutputTile) {
                    let i = 1;
                    let newId: string;
                    do {
                        newId = "OUT" + i++;
                    } while (this.outputTiles.find((x) => x.name === newId));
                    tile.id = newId;
                    this.outputTiles.push({ name: tile.id, tile: tile });
                }
            }
            tile.generateText();
        }
    }

    /**
     * Called after a tile is removed from the chip
     *
     * @param tile Tile that was removed
     */
    tileRemoved(tile: Tile) {
        if (tile instanceof ChipInputTile) {
            this.inputTiles = this.inputTiles.filter((x) => x.tile !== tile);
        } else if (tile instanceof ChipOutputTile) {
            this.outputTiles = this.outputTiles.filter((x) => x.tile !== tile);
        } else return;
        const key = Object.keys(this.structure).find(
            (x) => this.structure[x]?.id === tile.id
        );
        if (key) {
            const split = key.split(",");
            const x = parseInt(split[0]);
            const y = parseInt(split[1]);
            state.currentChipGrid?.grids.structure.removeTile(x, y);
        }
    }

    /**
     * checks if the chip has had it structure using all tiles and non-disjoint
     *
     * @returns true if the chip is structured
     */
    isStructured() {
        if (
            Object.values(this.structure).filter(
                (tile) => !(tile instanceof StructureTile)
            ).length !==
            this.inputTiles.length + this.outputTiles.length
        )
            return false;

        const tile = Object.values(this.structure).find(
            (tile) => tile instanceof Tile
        );

        if (!tile) return true;

        let tilesLeft = Object.values(this.structure).filter((x) => x !== tile);

        const isJoint = (tile: Tile) => {
            for (const direction of Direction.values()) {
                const offset = Direction.getOffset(direction);
                const neighbor = this.getStructureTile(
                    tile.x + offset[0],
                    tile.y + offset[1]
                );
                if (neighbor) {
                    const prevLength = tilesLeft.length;
                    tilesLeft = tilesLeft.filter((x) => x !== neighbor);
                    const newLength = tilesLeft.length;
                    if (prevLength === newLength) continue;
                    isJoint(neighbor);
                }
            }
        };
        isJoint(tile);
        return tilesLeft.length === 0;
    }

    /**
     * Clone chip
     *
     * @returns cloned chip
     */
    clone() {
        const newChip = new Chip(this.name, this.color, this.hue);
        newChip.tiles = mapObject(this.tiles, (tile) => tile?.clone());
        newChip.structure = mapObject(
            this.structure,
            (tile) => tile?.clone() as any
        );
        newChip.inputTiles = this.inputTiles.map((inputTile) => {
            return {
                name: inputTile.name,
                tile: inputTile.tile.clone() as ChipInputTile,
            };
        });
        newChip.outputTiles = this.outputTiles.map((outputTile) => {
            return {
                name: outputTile.name,
                tile: outputTile.tile.clone() as ChipOutputTile,
            };
        });
        return newChip;
    }
}
