/* eslint-disable @typescript-eslint/no-explicit-any */
import { showStructureClashAlert } from "../../menus/structure_clash_alert";
import state, { setState } from "../../state";
import { locationToPair, locationToTuple } from "../../utils";
import ChipGridMode from "../../utils/chip_grid_mode";
import { Direction, Rotation } from "../../utils/directions";
import { add, sub } from "../../utils/math";
import { mapMap } from "../../utils/objects";
import InteractiveGrid from "../grid/interactive_grid";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import ChipTile from "../tiles/chip_tile";
import IOTile from "../tiles/io_tile";
import StructureTile from "../tiles/structure_tile";
import { Tile } from "../tiles/tile";
import { findType, TileType } from "../tiles/tile_types";
import { PlacedChip } from "./placed_chip";

export enum ClashResult {
    NO_CLASH,
    CLASH,
    IGNORE_CLASH,
}

/**
 * Chip
 */
export class Chip {
    name: string;
    color: number;
    hue: number;
    tiles: Map<string, Tile> = new Map();
    inputTiles: { name: string; tile: ChipInputTile }[] = [];
    outputTiles: { name: string; tile: ChipOutputTile }[] = [];
    structure: Map<string, ChipTile> = new Map();
    originalChip?: Chip;

    placedChips = new Set<PlacedChip>();

    topLeftStructure: [x: number, y: number] | undefined;
    prevTopLeftStructure: [x: number, y: number] | undefined;

    chipDependencies = new Set<Chip>();

    placedChipsInside: PlacedChip[] = [];

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

        this.chipDependencies.add(this);
    }

    /**
     * get all the chip dependencies including children
     *
     * @returns all the chip dependencies including children
     */
    getChipDependencies(): Set<Chip> {
        const dependencies = new Set<Chip>(this.chipDependencies);

        for (const chip of this.chipDependencies) {
            if (this === chip) continue;
            const childDependencies = chip.getChipDependencies();
            for (const childDependency of childDependencies) {
                dependencies.add(childDependency);
            }
        }

        return dependencies;
    }

    /**
     * retrieves the root chip
     *
     * @returns the original chip
     */
    getRootOriginal(): Chip {
        if (this.originalChip) return this.originalChip.getRootOriginal();
        return this;
    }

    /**
     * get tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns tile at location
     */
    getTile(x: number, y: number) {
        return this.tiles.get(`${x},${y}`);
    }

    /**
     * Get a tile by its id
     *
     * @param id id of the tile
     * @param type type of the tile
     * @returns tile with the id
     */
    getTileById(id: string, type: typeof ChipTile): ChipTile | undefined {
        return Array.from(this.tiles.values()).find(
            (value) => value instanceof type && value.id === id
        ) as ChipTile | undefined;
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setTile(x: number, y: number, tile: Tile) {
        this.tiles.set(`${x},${y}`, tile);
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteTile(x: number, y: number) {
        this.tiles.delete(`${x},${y}`);
    }

    /**
     * get tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns tile at location
     */
    getStructureTile(x: number, y: number) {
        return this.structure.get(`${x},${y}`);
    }

    /**
     * set tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @param tile
     */
    setStructureTile(x: number, y: number, tile: ChipTile) {
        this.structure.set(`${x},${y}`, tile);
    }

    /**
     * remove tile at coordinate
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    deleteStructureTile(x: number, y: number) {
        this.structure.delete(`${x},${y}`);
    }

    /**
     * Called after a tile is added to the chip
     *
     * @param tile Tile that was added
     */
    tileAdded(tile: Tile) {
        if (tile instanceof IOTile) {
            if (state.chipGridMode === ChipGridMode.STRUCTURING) {
                tile.id = state.selectableTiles[state.selectedTileIndex].name;
            } else {
                console.log(tile.placedInChip);
                if (tile.placedInChip) {
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
                        } while (
                            this.outputTiles.find((x) => x.name === newId)
                        );
                        tile.id = newId;
                        this.outputTiles.push({ name: tile.id, tile: tile });
                    }
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
            this.inputTiles = this.inputTiles.filter(
                (x) => x.tile.id !== tile.id
            );
        } else if (tile instanceof ChipOutputTile) {
            this.outputTiles = this.outputTiles.filter(
                (x) => x.tile.id !== tile.id
            );
        } else return;
        const key = [...this.structure.keys()].find(
            (x) => this.structure.get(x)?.id === tile.id
        );
        if (key) {
            const split = key.split(",");
            const x = parseInt(split[0]);
            const y = parseInt(split[1]);
            state.currentChipGrid?.grids.structure.removeTile(x, y);
        }
    }

    /**
     * Checks if tile clashes
     *
     * @param tile Tile placement to check
     * @returns
     */
    async checkClash(tile: ChipTile): Promise<ClashResult> {
        this.prevTopLeftStructure = this.topLeftStructure;
        this.topLeftStructure = this.getTopLeftStructure();

        if (!this.prevTopLeftStructure)
            this.prevTopLeftStructure = this.topLeftStructure;

        const offset = sub(
            locationToTuple(tile),
            this.prevTopLeftStructure
        ) as [number, number];
        let clashes = false;
        for (const placedChip of this.placedChips) {
            const grid = placedChip.grid;

            const gridLocation = add(
                locationToTuple(placedChip.location),
                offset
            ) as [number, number];
            const tile = grid.getTile(...gridLocation);
            if (tile) {
                clashes = true;
                break;
            }
        }

        if (clashes) {
            if (!state.ignoreStructureClashWarning) {
                // give warning to user
                const result = await showStructureClashAlert();

                if (!result.continue) return ClashResult.CLASH;

                if (result.ignoreFurther)
                    setState({ ignoreStructureClashWarning: true });
            }

            return ClashResult.IGNORE_CLASH;
        }

        return ClashResult.NO_CLASH;
    }

    /**
     * Called when a structure tile is added
     *
     * @param tile added structure tile
     */
    async structureTileAdded(tile: ChipTile) {
        if (!this.topLeftStructure || !this.prevTopLeftStructure) {
            throw Error("Should have been initialized in checkClash");
        }

        const topLeftDiff = sub(
            this.topLeftStructure,
            this.prevTopLeftStructure
        ) as [number, number];

        const offset = sub(
            locationToTuple(tile),
            this.prevTopLeftStructure
        ) as [number, number];

        for (const placedChip of this.placedChips) {
            const grid = placedChip.grid;
            if (grid instanceof InteractiveGrid) grid.prevCloneChip = undefined;
            const gridLocation = add(
                locationToTuple(placedChip.location),
                offset
            ) as [number, number];
            await grid.removeTile(...gridLocation);
        }

        for (const placedChip of this.placedChips) {
            const grid = placedChip.grid;

            const gridLocation = add(
                locationToTuple(placedChip.location),
                offset
            ) as [number, number];

            const placedTile = (await grid.addTile(
                ...gridLocation,
                findType(tile.type) as TileType,
                undefined,
                undefined,
                true
            )) as ChipTile | undefined;

            if (placedTile) {
                if (placedTile instanceof ChipOutputTile)
                    placedTile.hue = (tile as ChipOutputTile).hue;
                placedTile.id = tile.id;
                placedTile.chip = placedChip;
                placedChip.setTile(...gridLocation, placedTile);
                if (placedTile instanceof IOTile) {
                    placedTile.generateText();
                }
                placedTile.updateContainer();
            }
            // grid.update();

            placedChip.location = locationToPair(
                add(locationToTuple(placedChip.location), topLeftDiff) as [
                    number,
                    number
                ]
            );
            // if (grid instanceof InteractiveGrid)
            //     (grid as InteractiveGrid).updateChipOutline();
        }
    }

    /**
     * Called when a structure tile is removed
     *
     * @param tile removed structure tile
     */
    async structureTileRemoved(tile: Tile) {
        this.prevTopLeftStructure = this.topLeftStructure;
        this.topLeftStructure = this.getTopLeftStructure();

        if (!this.prevTopLeftStructure)
            this.prevTopLeftStructure = this.topLeftStructure;

        const topLeftDiff = sub(
            this.topLeftStructure,
            this.prevTopLeftStructure
        ) as [number, number];

        const offset = sub(
            locationToTuple(tile),
            this.prevTopLeftStructure
        ) as [number, number];

        for (const placedChip of this.placedChips) {
            const grid = placedChip.grid;
            if (grid instanceof InteractiveGrid) grid.prevCloneChip = undefined;
            const gridLocation = add(
                locationToTuple(placedChip.location),
                offset
            ) as [number, number];
            grid.removeTile(...gridLocation, true, true);
            placedChip.deleteTile(...gridLocation);

            grid.update({ updateTiles: { newGraphics: true } });
            placedChip.location = locationToPair(
                add(locationToTuple(placedChip.location), topLeftDiff) as [
                    number,
                    number
                ]
            );
            // if (grid instanceof InteractiveGrid)
            //     (grid as InteractiveGrid).updateChipOutline();
        }
    }

    wasStructured = false;

    /**
     * checks if the chip has had it structure using all tiles and non-disjoint
     *
     * @returns true if the chip is structured
     */
    isStructured() {
        const structureTiles = Array.from(this.structure.values());

        if (
            structureTiles.filter((tile) => !(tile instanceof StructureTile))
                .length !==
            this.inputTiles.length + this.outputTiles.length
        ) {
            this.wasStructured = false;
            return false;
        }

        const tile = structureTiles.find((tile) => tile instanceof Tile);

        if (!tile) {
            this.wasStructured = true;
            return true;
        }

        let tilesLeft = structureTiles.filter((x) => x !== tile);

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
        const output = tilesLeft.length === 0;
        this.wasStructured = output;

        return output;
    }

    /**
     * get top left tile location of structure
     *
     * @returns top left tile location of structure
     */
    getTopLeftStructure(): [number, number] {
        const structureTiles = Array.from(this.structure.values());

        if (structureTiles.length === 0) return [0, 0];

        let minX = Infinity;
        let minY = Infinity;

        for (const tile of structureTiles) {
            if (!tile) continue;
            if (tile.x < minX) minX = tile.x;
            if (tile.y < minY) minY = tile.y;
        }

        return [minX, minY];
    }

    /**
     * rotate chip
     *
     * @param rotation how much to rotate chip
     */
    rotate(rotation: Rotation = Rotation.CLOCKWISE) {
        const topLeft = this.getTopLeftStructure();
        const newStructure: Map<string, ChipTile> = new Map();
        for (const key of Object.keys(this.structure)) {
            const split = key.split(",");
            const x = parseInt(split[0]);
            const y = parseInt(split[1]);
            const newX = x - topLeft[1];
            const newY = y - topLeft[0];

            const prevTile = this.structure.get(key);
            if (!prevTile) continue;

            switch (rotation) {
                case Rotation.CLOCKWISE: {
                    newStructure.set(`${-newY},${newX}`, prevTile);
                    prevTile.x = -newY;
                    prevTile.y = newX;

                    break;
                }
                case Rotation.HALF_TURN: {
                    newStructure.set(`${-newX},${-newY}`, prevTile);
                    prevTile.x = -newX;
                    prevTile.y = -newY;

                    break;
                }
                case Rotation.COUNTER_CLOCKWISE: {
                    newStructure.set(`${newY},${-newX}`, prevTile);
                    prevTile.x = newY;
                    prevTile.y = -newX;

                    break;
                }
                case Rotation.NORMAL: {
                    newStructure.set(`${newX},${newY}`, prevTile);
                    prevTile.x = newX;
                    prevTile.y = newY;

                    break;
                }
            }
        }
        this.structure = newStructure;
    }

    /**
     * Clone chip
     *
     * @param noteOriginal for when cloning for a structure change
     * @returns cloned chip
     */
    clone(noteOriginal: boolean = false) {
        const newChip = new Chip(this.name, this.color, this.hue);
        if (noteOriginal) newChip.originalChip = this.originalChip || this;
        newChip.tiles = mapMap(this.tiles, (tile) => tile?.clone());
        newChip.structure = mapMap(
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
