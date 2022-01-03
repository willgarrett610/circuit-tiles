import state, { setState } from "../state";
import { EditMode } from "../utils/edit_mode";
import { Action } from "./history_manager";

export const setEditMode: Action<EditMode, EditMode> = {
    type: "SET_EDIT_MODE",
    do: (payload) => {
        const prevValue = state.editMode;
        setState({ editMode: payload });
        return prevValue;
    },
    undo: (actionPayload) => {
        if (actionPayload.prevValue)
            setState({ editMode: actionPayload.prevValue });
    },
};
