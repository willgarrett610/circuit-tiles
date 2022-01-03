import * as PIXI from "pixi.js";
import { locationToTuple } from "../../utils";
import { Direction, Rotation } from "../../utils/directions";
import { add } from "../../utils/math";
import Grid from "../grid/grid";
import IOTile from "../tiles/io_tile";
import StructureTile from "../tiles/structure_tile";
import { Chip } from "./chip";

/**
 * placed chip
 */
export class PlacedChip {
    location: { x: number; y: number };
    rotation: Rotation;
    chip: Chip;
    tiles: { [key: string]: IOTile | StructureTile | undefined } = {};

    /**
     * construct placed chip
     *
     * @param location location of top left corner of chip on grid
     * @param location.x
     * @param location.y
     * @param rotation rotation of the chip from original orientation
     * @param chip chip to place
     */
    constructor(
        location: { x: number; y: number },
        rotation: Rotation,
        chip: Chip
    ) {
        this.location = location;
        this.rotation = rotation;
        this.chip = chip;
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
    setTile(x: number, y: number, tile: IOTile | StructureTile) {
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
     * @returns graphic for outline of chip
     */
    buildOutlineGraphic(grid: Grid) {
        const graphic = new PIXI.Graphics();
        const color = this.chip.color;

        for (const tile of Object.values(this.tiles)) {
            if (!tile) continue;
            const tileLocation = locationToTuple(tile);

            for (const direction of Direction.values()) {
                const directionOffset = Direction.getOffset(direction);

                // this.chipOutlineGraphics.beginFill(chip.color, 0.3);
                // this.chipOutlineGraphics.lineStyle(undefined);
                // this.chipOutlineGraphics.drawRect(
                //     ...locationToTuple(
                //         this.gridToScreen(
                //             tileLocation[0],
                //             tileLocation[1],
                //             true,
                //             false
                //         )
                //     ),
                //     this.size,
                //     this.size
                // );

                const adjacentTileLocation = add(
                    tileLocation,
                    directionOffset
                ) as [number, number];
                const adjacentTile = this.getTile(...adjacentTileLocation);

                if (adjacentTile) continue;

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

                graphic.lineStyle(2, color);
                switch (direction) {
                    case Direction.UP: {
                        graphic.moveTo(topLeft.x, topLeft.y);
                        graphic.lineTo(topRight.x, topRight.y);
                        break;
                    }
                    case Direction.DOWN: {
                        graphic.moveTo(bottomLeft.x, bottomLeft.y);
                        graphic.lineTo(bottomRight.x, bottomRight.y);
                        break;
                    }
                    case Direction.LEFT: {
                        graphic.moveTo(topLeft.x, topLeft.y);
                        graphic.lineTo(bottomLeft.x, bottomLeft.y);
                        break;
                    }
                    case Direction.RIGHT: {
                        graphic.moveTo(topRight.x, topRight.y);
                        graphic.lineTo(bottomRight.x, bottomRight.y);
                        break;
                    }
                }
            }
        }
        return graphic;
    }
}
