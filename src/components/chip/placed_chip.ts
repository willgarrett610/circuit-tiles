import * as PIXI from "pixi.js";
import { locationToTuple } from "../../utils";
import { Direction, Rotation } from "../../utils/directions";
import { add } from "../../utils/math";
import Grid from "../grid/grid";
import ChipTile from "../tiles/chip_tile";
import { Chip } from "./chip";

/**
 * placed chip
 */
export class PlacedChip {
    location: { x: number; y: number };
    rotation: Rotation;
    chip: Chip;
    tiles: { [key: string]: ChipTile | undefined } = {};
    grid: Grid;
    scopeName: string;

    /**
     * construct placed chip
     *
     * @param location location of top left corner of chip on grid
     * @param location.x
     * @param location.y
     * @param rotation rotation of the chip from original orientation
     * @param chip chip to place
     * @param grid
     */
    constructor(
        location: { x: number; y: number },
        rotation: Rotation,
        chip: Chip,
        grid: Grid
    ) {
        this.location = location;
        this.rotation = rotation;
        this.chip = chip;
        this.grid = grid;

        let i = 1;
        do {
            this.scopeName = this.chip.name + i++;
        } while (this.grid.chips.find((c) => c.scopeName === this.scopeName));

        const originalChip = chip.getRootOriginal();
        originalChip.placedChips.add(this);
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
    setTile(x: number, y: number, tile: ChipTile) {
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
     * build graphic for outline of chip
     *
     * @param grid
     * @param hovering
     * @returns graphic for outline of chip
     */
    buildOutlineGraphic(grid: Grid, hovering: boolean): PIXI.Graphics {
        const graphic = new PIXI.Graphics();
        const color = this.chip.color;

        for (const tile of Object.values(this.tiles)) {
            if (!tile) continue;
            const tileLocation = locationToTuple(tile);

            for (const direction of Direction.values()) {
                const directionOffset = Direction.getOffset(direction);

                const adjacentTileLocation = add(
                    tileLocation,
                    directionOffset
                ) as [number, number];
                const adjacentTile = this.getTile(...adjacentTileLocation);

                if (adjacentTile) continue;

                const lineWidth = hovering ? 4 : 2;

                const topLeft = grid.gridToScreen(
                    tileLocation[0],
                    tileLocation[1],
                    true,
                    false
                );
                const topRight = grid.gridToScreen(
                    tileLocation[0] + 1,
                    tileLocation[1],
                    true,
                    false
                );
                const bottomLeft = grid.gridToScreen(
                    tileLocation[0],
                    tileLocation[1] + 1,
                    true,
                    false
                );
                const bottomRight = grid.gridToScreen(
                    tileLocation[0] + 1,
                    tileLocation[1] + 1,
                    true,
                    false
                );

                const tileToRightLocation = add(
                    tileLocation,
                    Direction.getOffset(Direction.RIGHT)
                ) as [number, number];
                const tileToRight = this.getTile(...tileToRightLocation);

                const tileToLeftLocation = add(
                    tileLocation,
                    Direction.getOffset(Direction.LEFT)
                ) as [number, number];
                const tileToLeft = this.getTile(...tileToLeftLocation);

                graphic.lineStyle(lineWidth, color);
                switch (direction) {
                    case Direction.UP: {
                        graphic.moveTo(
                            topLeft.x - (tileToLeft ? lineWidth : 0),
                            topLeft.y + lineWidth / 2
                        );
                        graphic.lineTo(
                            topRight.x + (tileToRight ? lineWidth : 0),
                            topRight.y + lineWidth / 2
                        );
                        break;
                    }
                    case Direction.DOWN: {
                        graphic.moveTo(
                            bottomLeft.x - (tileToLeft ? lineWidth : 0),
                            bottomLeft.y - lineWidth / 2
                        );
                        graphic.lineTo(
                            bottomRight.x + (tileToRight ? lineWidth : 0),
                            bottomRight.y - lineWidth / 2
                        );
                        break;
                    }
                    case Direction.LEFT: {
                        graphic.moveTo(topLeft.x + lineWidth / 2, topLeft.y);
                        graphic.lineTo(
                            bottomLeft.x + lineWidth / 2,
                            bottomLeft.y
                        );
                        break;
                    }
                    case Direction.RIGHT: {
                        graphic.moveTo(topRight.x - lineWidth / 2, topRight.y);
                        graphic.lineTo(
                            bottomRight.x - lineWidth / 2,
                            bottomRight.y
                        );
                        break;
                    }
                }
            }
        }
        return graphic;
    }
}
