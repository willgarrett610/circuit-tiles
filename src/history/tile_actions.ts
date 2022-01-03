import Grid from "../components/grid/grid";
import { Tile } from "../components/tiles/tile";
import { Action } from "./history_manager";

interface PlaceTilePayload {
    x: number;
    y: number;
    tile: Tile;
    grid: Grid;
}

export const setTile: Action<PlaceTilePayload> = {
    type: "SET_TILE",
    do: (payload) => {
        const newTile = payload.tile;
        payload.grid.setTile(payload.x, payload.y, newTile);
        payload.grid.addChild(newTile.getContainer(payload.grid.size));
        payload.grid.dispatchHandler("postAddTile", newTile);
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
    type: "EDIT_TILE",
    do: ({ x, y, tile, grid }) => {
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
    type: "DELETE_TILE",
    do: ({ x, y, grid }) => {
        const tile = grid.getTile(x, y);
        if (tile) {
            const prevTile = tile?.clone();
            grid.removeChild(tile?.getContainer(grid.size));
            grid.deleteTile(x, y);
            grid.dispatchHandler("postRemoveTile", tile);
            return prevTile;
        }
    },
    undo: ({ payload: { x, y, grid }, prevValue }) => {
        if (prevValue) {
            grid.setTile(x, y, prevValue);
            grid.dispatchHandler("postAddTile", prevValue);
        }
    },
};