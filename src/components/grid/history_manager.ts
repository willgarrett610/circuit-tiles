import { GridAction } from "../../utils/action";
import { Tile } from "../tiles/tile";
import GridManager from "./grid_manager";

/** history manager */
export class HistoryManager {
    gridManager: GridManager;

    /**
     * constructs history manager
     *
     * @param gridManager
     */
    constructor(gridManager: GridManager) {
        this.gridManager = gridManager;
    }

    history: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[][] = [[]];
    tempHistory: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[] = [];
    undoHistory: {
        action: GridAction;
        prevTile: Tile | undefined;
        postTile: Tile | undefined;
        location: { x: number; y: number };
    }[][] = [];

    currentHistory = () => {
        return this.history[this.history.length - 1];
    };

    newHistory = () => {
        this.history.push([]);
    };

    undo = async () => {
        this.gridManager.modeManager.finishInteraction();
        if (this.history.length < 2) return;
        const actions = this.history[this.history.length - 2];
        this.undoHistory.push(actions);

        for (const { action, prevTile: tile, location } of [
            ...actions,
        ].reverse()) {
            const refTile = this.gridManager
                .getGrid()
                .getTile(location.x, location.y);
            switch (action) {
                case GridAction.ADD: {
                    if (refTile) {
                        this.gridManager
                            .getGrid()
                            .removeChild(
                                refTile.getContainer(
                                    this.gridManager.getGrid().size
                                )
                            );
                        this.gridManager.tileManager.dispatchHandler(
                            "postRemoveTile",
                            refTile
                        );
                    }
                    this.gridManager
                        .getGrid()
                        .deleteTile(location.x, location.y);

                    break;
                }
                case GridAction.EDIT: {
                    if (tile) {
                        if (refTile)
                            this.gridManager
                                .getGrid()
                                .removeChild(
                                    refTile.getContainer(
                                        this.gridManager.getGrid().size
                                    )
                                );
                        this.gridManager
                            .getGrid()
                            .setTile(location.x, location.y, tile);
                        const tileGraphics: PIXI.Container = tile.getContainer(
                            this.gridManager.getGrid().size
                        );
                        this.gridManager.getGrid().addChild(tileGraphics);
                    }
                    this.gridManager
                        .getGrid()
                        .getTile(location.x, location.y)
                        ?.updateContainer?.();

                    break;
                }
                case GridAction.REMOVE: {
                    if (tile) {
                        this.gridManager
                            .getGrid()
                            .setTile(location.x, location.y, tile);
                        const tileGraphics: PIXI.Container = tile.getContainer(
                            this.gridManager.getGrid().size
                        );
                        this.gridManager.getGrid().addChild(tileGraphics);
                        this.gridManager.tileManager.dispatchHandler(
                            "postAddTile",
                            tile
                        );
                    }

                    this.gridManager
                        .getGrid()
                        .getTile(location.x, location.y)
                        ?.updateContainer?.();
                    break;
                }
            }
        }

        this.history.splice(this.history.length - 2, 1);

        this.gridManager.tileManager.dispatchHandler("postUndo", actions);
    };

    redo = async () => {
        this.gridManager.modeManager.finishInteraction();
        if (this.undoHistory.length === 0) return;

        const actions = this.undoHistory.pop();
        if (!actions) return;

        this.currentHistory().push(...actions);
        this.newHistory();

        for (const { action, postTile, location } of actions) {
            const refTile = this.gridManager
                .getGrid()
                .getTile(location.x, location.y);
            switch (action) {
                case GridAction.REMOVE: {
                    if (refTile) {
                        this.gridManager
                            .getGrid()
                            .removeChild(
                                refTile.getContainer(
                                    this.gridManager.getGrid().size
                                )
                            );
                        this.gridManager.tileManager.dispatchHandler(
                            "postRemoveTile",
                            refTile
                        );
                    }
                    this.gridManager
                        .getGrid()
                        .deleteTile(location.x, location.y);
                    break;
                }
                case GridAction.EDIT: {
                    if (postTile) {
                        if (refTile)
                            this.gridManager
                                .getGrid()
                                .removeChild(
                                    refTile.getContainer(
                                        this.gridManager.getGrid().size
                                    )
                                );
                        this.gridManager
                            .getGrid()
                            .setTile(location.x, location.y, postTile);
                        const tileGraphics: PIXI.Container =
                            postTile.getContainer(
                                this.gridManager.getGrid().size
                            );
                        this.gridManager.getGrid().addChild(tileGraphics);
                    }
                    this.gridManager
                        .getGrid()
                        .getTile(location.x, location.y)
                        ?.updateContainer?.();

                    break;
                }
                case GridAction.ADD: {
                    if (postTile) {
                        this.gridManager
                            .getGrid()
                            .setTile(location.x, location.y, postTile);
                        const tileGraphics: PIXI.Container =
                            postTile.getContainer(
                                this.gridManager.getGrid().size
                            );
                        this.gridManager.getGrid().addChild(tileGraphics);

                        this.gridManager.tileManager.dispatchHandler(
                            "postAddTile",
                            postTile
                        );
                    }

                    this.gridManager
                        .getGrid()
                        .getTile(location.x, location.y)
                        ?.updateContainer?.();
                    break;
                }
            }
        }

        this.gridManager.tileManager.dispatchHandler("postRedo", actions);
    };

    cleanHistory = () => {
        if (this.history[this.history.length - 1].length === 0)
            this.history.pop();
    };
}
