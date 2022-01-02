import { Action } from "./history_manager";

interface PlaceTilePayload {
    x: number;
    y: number;
}

export const placeTileAction: Action<PlaceTilePayload> = {
    type: "PLACE_TILE",
    do: (payload) => {
        console.log({ payload });
    },
    undo: (payload) => {
        console.log({ payload });
    },
};
