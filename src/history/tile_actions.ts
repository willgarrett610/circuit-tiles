import Grid from "../components/grid/grid";
import IOTile from "../components/tiles/io_tile";
import { Tile } from "../components/tiles/tile";
import { Action } from "./history_manager";

interface PlaceTilePayload {
    x: number;
    y: number;
    tile: Tile;
    grid: Grid;
}

export const setTile: Action<PlaceTilePayload> = {
    do: async (payload, reject) => {
        let isRejected = false;
        const reject2 = () => {
            // I hate this
            isRejected = true;
            reject();
        };

        const newTile = payload.tile;
        await payload.grid.dispatchHandler("preAddTile", payload.tile, reject2);
        if (isRejected) return;

        payload.grid.setTile(payload.x, payload.y, newTile);
        payload.grid.addChild(newTile.getContainer(payload.grid.size));
        if (newTile instanceof IOTile) newTile.generateText();
        await payload.grid.dispatchHandler("postAddTile", newTile);
    },
    undo: ({ payload }) => {
        const tile = payload.grid.getTile(payload.x, payload.y);
        if (tile) {
            payload.grid.removeChild(tile.getContainer(payload.grid.size));
            payload.grid.dispatchHandler("postRemoveTile", tile);
        }
        payload.grid.deleteTile(payload.x, payload.y);
    },
};

interface EditTilePayload {
    x: number;
    y: number;
    tile: Tile;
    grid: Grid;
}

export const editTile: Action<EditTilePayload, Tile> = {
    do: async ({ x, y, tile, grid }) => {
        const refTile = grid.getTile(x, y);

        if (refTile) {
            grid.removeChild(refTile.getContainer(grid.size));
            const newTile = tile.clone();
            grid.setTile(x, y, newTile);
            grid.addChild(newTile.getContainer(grid.size));
            newTile.updateContainer?.();

            return refTile;
        }
    },
    undo: ({ payload: { x, y, grid }, prevValue }) => {
        const tile = grid.getTile(x, y);
        if (!tile) return;
        if (prevValue) {
            grid.removeChild(tile.getContainer(grid.size));
            grid.setTile(x, y, prevValue);
            grid.addChild(prevValue.getContainer(grid.size));
            prevValue.updateContainer?.();
        } else {
            grid.removeChild(tile.getContainer(grid.size));
            grid.deleteTile(x, y);
        }
    },
};

interface DeleteTilePayload {
    x: number;
    y: number;
    grid: Grid;
}

export const deleteTile: Action<DeleteTilePayload, Tile> = {
    do: async ({ x, y, grid }) => {
        const tile = grid.getTile(x, y);
        if (tile) {
            const prevTile = tile?.clone();
            grid.removeChild(tile?.getContainer(grid.size));
            grid.deleteTile(x, y);
            await grid.dispatchHandler("postRemoveTile", tile);
            return prevTile;
        }
    },
    undo: ({ payload: { x, y, grid }, prevValue }) => {
        if (prevValue) {
            const tile = grid.getTile(x, y);
            if (tile) grid.removeChild(tile.getContainer(grid.size));
            grid.setTile(x, y, prevValue);
            grid.addChild(prevValue.getContainer(grid.size));
            if (prevValue instanceof IOTile) prevValue.generateText();
            grid.dispatchHandler("postAddTile", prevValue);
        }
    },
};
