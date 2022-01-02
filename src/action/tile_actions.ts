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
        payload.grid.setTile(payload.x, payload.y, payload.tile);
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
            const prevTile = refTile;
            grid.setTile(x, y, tile.clone());
            return prevTile;
        }
    },
    undo: ({ payload: { x, y, grid }, prevValue }) => {
        if (prevValue) grid.setTile(x, y, prevValue);
        else grid.deleteTile(x, y);
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
        const prevTile = grid.getTile(x, y);
        grid.deleteTile(x, y);
        return prevTile;
    },
    undo: ({ payload: { x, y, grid }, prevValue }) => {
        if (prevValue) grid.setTile(x, y, prevValue);
    },
};
