import ChipTile from "../components/tiles/chip_tile";
import { Tile } from "../components/tiles/tile";

/** Tile Manager */
export class TileManager<T extends Tile = Tile> {
    protected tileHolder: Record<number, Record<number, T>> = {};

    /**
     * gets length of tile manager
     *
     * @returns length of tile manager
     */
    get length(): number {
        return this.getTiles().length;
    }

    /**
     * gets bounds
     *
     * @returns bounds
     */
    get bounds(): {
        top: number;
        left: number;
        bottom: number;
        right: number;
    } {
        let leftMost = Infinity;
        let rightMost = -Infinity;
        let topMost = Infinity;
        let bottomMost = -Infinity;

        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                leftMost = Math.min(leftMost, Number(x));
                rightMost = Math.max(rightMost, Number(x));
                topMost = Math.min(topMost, Number(y));
                bottomMost = Math.max(bottomMost, Number(y));
            }
        }

        return {
            top: topMost,
            left: leftMost,
            bottom: bottomMost,
            right: rightMost,
        };
    }

    /**
     * gets tile at position
     *
     * @param {number} x x position
     * @param {number} y y position
     * @returns tile at position
     */
    getTile(x: number, y: number): T | undefined {
        return this.tileHolder[x]?.[y];
    }

    /**
     * sets tile at position
     *
     * @param {number} x x position
     * @param {number} y y position
     * @param tile tile to set
     */
    setTile(x: number, y: number, tile: T): void {
        if (!this.tileHolder[x]) this.tileHolder[x] = {};
        this.tileHolder[x][y] = tile;
    }

    /**
     * deletes tile at position
     *
     * @param {number} x x position
     * @param {number} y y position
     */
    deleteTile(x: number, y: number): void {
        delete this.tileHolder[x]?.[y];
    }

    /**
     * gets all tiles
     *
     * @returns all tiles
     */
    getTiles(): T[] {
        const output: T[] = [];
        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                output.push(this.tileHolder[x][y]);
            }
        }
        return output;
    }

    /**
     * gets all tiles in rect
     *
     * @param {number} x x position
     * @param {number} y y position
     * @param {number} width width of rect
     * @param {number} height height of rect
     */
    getTilesInRect(x: number, y: number, width: number, height: number): void {
        const output: T[] = [];

        for (let i = x; i < x + width; i++) {
            for (let j = y; j < y + height; j++) {
                const tile = this.getTile(i, j);
                if (tile) output.push(tile);
            }
        }
    }

    /**
     * get locations of tiles
     *
     * @returns locations of all tiles
     */
    getLocations(): [x: number, y: number][] {
        const output: [x: number, y: number][] = [];
        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                output.push([Number(x), Number(y)]);
            }
        }
        return output;
    }

    /**
     * get entries of tiles
     *
     * @returns entries of all tiles
     */
    getEntries(): [[x: number, y: number], T][] {
        const output: [[x: number, y: number], T][] = [];
        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                output.push([[Number(x), Number(y)], this.tileHolder[x][y]]);
            }
        }
        return output;
    }

    /**
     * gets tile by id
     *
     * @param id id of tile
     * @param type type of tile
     * @returns
     */
    getTileById(id: string, type: typeof ChipTile): ChipTile | undefined {
        for (const tile of this) {
            if (tile instanceof type && tile.id === id) return tile;
        }
    }

    /**
     * clones tile manager
     *
     * @returns cloned tile manager
     */
    clone(): TileManager<T> {
        const output = new TileManager<T>();
        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                output.setTile(
                    Number(x),
                    Number(y),
                    this.tileHolder[x][y].clone()
                );
            }
        }

        return output;
    }

    /**
     * makes TileManager iterable
     *
     * @returns iterator
     * @memberof TileManager
     * @generator
     * @yields tile
     */
    *[Symbol.iterator](): Generator<T> {
        for (const x in this.tileHolder) {
            for (const y in this.tileHolder[x]) {
                yield this.tileHolder[x][y];
            }
        }
    }
}
