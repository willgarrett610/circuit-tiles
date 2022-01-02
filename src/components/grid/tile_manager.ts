import { gridManager } from "../..";
import { GridAction } from "../../utils/action";
import { Direction, rotateClockWise } from "../../utils/directions";
import { ConnectionType, Tile } from "../tiles/tile";
import GridManager from "./grid_manager";

interface GridHandlers {
    postAddTile: ((tile: Tile) => void)[];
    postRemoveTile: ((tile: Tile) => void)[];
    postEditTile: ((tile: Tile) => void)[];
    postUndo: ((
        actions: {
            action: GridAction;
            prevTile: Tile | undefined;
            postTile: Tile | undefined;
            location: {
                x: number;
                y: number;
            };
        }[]
    ) => void)[];
    postRedo: ((
        actions: {
            action: GridAction;
            prevTile: Tile | undefined;
            postTile: Tile | undefined;
            location: {
                x: number;
                y: number;
            };
        }[]
    ) => void)[];
}

/** tile manager */
export class TileManager {
    gridManager: GridManager;
    /**
     * constructs tile manager
     *
     * @param gridManager
     */
    constructor(gridManager: GridManager) {
        this.gridManager = gridManager;
    }

    handlers: GridHandlers = {
        postAddTile: [],
        postRemoveTile: [],
        postEditTile: [],
        postUndo: [],
        postRedo: [],
    };

    addHandler = <T extends keyof GridHandlers>(
        handlerName: T,
        handler: GridHandlers[T][number]
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.handlers[handlerName].push(handler as any);
    };

    dispatchHandler = <T extends keyof GridHandlers>(
        handlerName: T,
        ...args: Parameters<GridHandlers[T][number]>
    ) => {
        for (const handler of this.handlers[handlerName]) {
            // eslint-disable-next-line prefer-spread, @typescript-eslint/no-explicit-any
            (handler as any).apply(null, args as any);
        }
    };

    /**
     * Connects tiles together
     *
     * @param newTile
     * @param prevTile
     * @param direction direction from newTile to prevTile
     * @param editedNewTile
     * @param forced if the connection should be forced
     */
    connectTiles(
        newTile: Tile,
        prevTile: Tile | undefined,
        direction: Direction | undefined,
        editedNewTile: boolean,
        forced = false
    ) {
        if (
            newTile !== undefined &&
            prevTile !== undefined &&
            direction !== undefined
        ) {
            const oppositeDirection = Direction.toLower(
                Direction.getOpposite(direction)
            );
            const directDirection = Direction.toLower(direction);

            const canConnect =
                newTile.getConnectionTemplate()[directDirection] !==
                    ConnectionType.BLOCKED &&
                prevTile.getConnectionTemplate()[oppositeDirection] !==
                    ConnectionType.BLOCKED &&
                (forced || newTile.isWire || prevTile.isWire);

            if (!prevTile.getConnections()[oppositeDirection] && canConnect) {
                gridManager.historyManager.tempHistory.push({
                    action: GridAction.EDIT,
                    prevTile: prevTile.clone(),
                    postTile: undefined,
                    location: { x: prevTile.x, y: prevTile.y },
                });

                prevTile.setConnection(oppositeDirection, true);
                gridManager.historyManager.tempHistory[
                    gridManager.historyManager.tempHistory.length - 1
                ].postTile = prevTile.clone();
            }
            if (
                !newTile.getConnections()[directDirection] &&
                (canConnect || !editedNewTile)
            ) {
                gridManager.historyManager.tempHistory.push({
                    action: editedNewTile ? GridAction.EDIT : GridAction.ADD,
                    prevTile: editedNewTile ? newTile.clone() : undefined,
                    postTile: undefined,
                    location: { x: newTile.x, y: newTile.y },
                });

                if (canConnect) newTile.setConnection(directDirection, true);

                gridManager.historyManager.tempHistory[
                    gridManager.historyManager.tempHistory.length - 1
                ].postTile = newTile.clone();
            }
            prevTile.updateContainer?.();
        } else if (!editedNewTile) {
            this.gridManager.historyManager.tempHistory.push({
                action: GridAction.ADD,
                prevTile: undefined,
                postTile: newTile.clone(),
                location: { x: newTile.x, y: newTile.y },
            });
        }

        newTile.updateContainer?.();
    }

    /**
     * handles forced connections of tiles
     *
     * @param tile tile to attempt to force connect
     */
    handleForceConnection(tile: Tile) {
        for (const key in tile.getConnectionForce()) {
            const forceDirectionKey = key as "up" | "right" | "down" | "left";
            const force = tile.getConnectionForce()[forceDirectionKey];
            const forceDirection = Direction.fromString(forceDirectionKey);
            if (force) {
                const forceTile = this.gridManager
                    .getGrid()
                    .getTile(
                        tile.x + Direction.getOffset(forceDirection)[0],
                        tile.y + Direction.getOffset(forceDirection)[1]
                    );
                if (forceTile) {
                    this.connectTiles(
                        tile,
                        forceTile,
                        forceDirection,
                        true,
                        true
                    );
                }
            }
        }

        for (const direction of Direction.values()) {
            const adjacentTile = this.gridManager
                .getGrid()
                .getTile(
                    tile.x + Direction.getOffset(direction)[0],
                    tile.y + Direction.getOffset(direction)[1]
                );
            if (adjacentTile) {
                if (
                    adjacentTile.getConnectionForce()[
                        Direction.toLower(Direction.getOpposite(direction))
                    ]
                ) {
                    this.connectTiles(tile, adjacentTile, direction, true);
                }
            }
        }
    }

    /**
     * add tile to grid
     *
     * @param x x location of tile
     * @param y y location of tile
     * @param tile tile to add
     * @param prevTile last tile added
     * @param direction direction of placement
     * @returns tile if add was successful, undefined otherwise
     */
    addTile<T extends Tile>(
        x: number,
        y: number,
        tile: {
            new (x: number, y: number): T;
        },
        prevTile: Tile | undefined,
        direction: Direction | undefined
    ): Tile | undefined {
        const tileAtLocation = this.gridManager.getGrid().getTile(x, y);
        if (tileAtLocation) {
            this.connectTiles(tileAtLocation, prevTile, direction, true);
            return tileAtLocation;
        }

        const tileObj = new tile(x, y);

        this.gridManager.getGrid().setTile(x, y, tileObj);

        const tileGraphics: PIXI.Container = tileObj.getContainer(
            this.gridManager.getGrid().size
        );
        this.gridManager.getGrid().addChild(tileGraphics);

        this.connectTiles(tileObj, prevTile, direction, false);

        this.handleForceConnection(tileObj);

        this.dispatchHandler("postAddTile", tileObj);

        return tileObj;
    }

    /**
     * Removes tile at location
     *
     * @param x x coordinate
     * @param y y coordinate
     * @returns success of deletion
     */
    removeTile(x: number, y: number) {
        const tile = this.gridManager.getGrid().getTile(x, y);
        if (!tile) return false;
        this.gridManager.historyManager.tempHistory.push({
            action: GridAction.REMOVE,
            prevTile: tile.clone(),
            postTile: undefined,
            location: { x: tile.x, y: tile.y },
        });
        this.gridManager
            .getGrid()
            .removeChild(tile.getContainer(this.gridManager.getGrid().size));
        this.gridManager.getGrid().deleteTile(x, y);
        const removalSpots: {
            offset: number[];
            side: "up" | "right" | "down" | "left";
        }[] = [
            { offset: [-1, 0], side: "right" },
            { offset: [1, 0], side: "left" },
            { offset: [0, -1], side: "down" },
            { offset: [0, 1], side: "up" },
        ];
        for (const removalSpot of removalSpots) {
            const adjacentTile = this.gridManager
                .getGrid()
                .getTile(x + removalSpot.offset[0], y + removalSpot.offset[1]);

            if (
                adjacentTile !== undefined &&
                adjacentTile.getConnections()[removalSpot.side]
            ) {
                this.gridManager.historyManager.tempHistory.push({
                    action: GridAction.EDIT,
                    prevTile: adjacentTile.clone(),
                    postTile: undefined,
                    location: { x: adjacentTile.x, y: adjacentTile.y },
                });
                adjacentTile.setConnection(removalSpot.side, false);
                this.gridManager.historyManager.tempHistory[
                    this.gridManager.historyManager.tempHistory.length - 1
                ].postTile = adjacentTile.clone();
                adjacentTile.updateContainer?.();
            }
        }
        this.dispatchHandler("postRemoveTile", tile);
        return true;
    }

    /**
     * Rotates tiles clockwise
     *
     * @param x x coordinate
     * @param y y coordinate
     */
    rotateTile(x: number, y: number) {
        const tile = this.gridManager.getGrid().getTile(x, y);
        if (tile && tile.breakOnRotate) {
            this.gridManager.historyManager.tempHistory.push({
                action: GridAction.EDIT,
                prevTile: tile.clone(),
                postTile: undefined,
                location: { x, y },
            });
            if (tile.rotatable)
                tile.direction = rotateClockWise(tile.direction);
            tile.setConnection("up", false);
            tile.setConnection("down", false);
            tile.setConnection("left", false);
            tile.setConnection("right", false);
            tile.updateContainer?.();
            this.gridManager.historyManager.tempHistory[
                this.gridManager.historyManager.tempHistory.length - 1
            ].postTile = tile.clone();

            const removalSpots: {
                offset: number[];
                side: "up" | "right" | "down" | "left";
            }[] = [
                { offset: [-1, 0], side: "right" },
                { offset: [1, 0], side: "left" },
                { offset: [0, -1], side: "down" },
                { offset: [0, 1], side: "up" },
            ];
            for (const removalSpot of removalSpots) {
                const adjacentTile = this.gridManager
                    .getGrid()
                    .getTile(
                        x + removalSpot.offset[0],
                        y + removalSpot.offset[1]
                    );

                if (
                    adjacentTile !== undefined &&
                    adjacentTile.getConnections()[removalSpot.side]
                ) {
                    this.gridManager.historyManager.tempHistory.push({
                        action: GridAction.EDIT,
                        prevTile: adjacentTile.clone(),
                        postTile: undefined,
                        location: {
                            x: adjacentTile.x,
                            y: adjacentTile.y,
                        },
                    });
                    adjacentTile.setConnection(removalSpot.side, false);
                    this.gridManager.historyManager.tempHistory[
                        this.gridManager.historyManager.tempHistory.length - 1
                    ].postTile = adjacentTile.clone();
                    adjacentTile.updateContainer?.();
                }
            }

            this.handleForceConnection(tile);
        }
    }
}
