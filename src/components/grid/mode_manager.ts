import { setState } from "../../state";
import { Interaction } from "../../utils/action";
import { EditMode } from "../../utils/edit_mode";
import GridManager from "./grid_manager";

/** mode manager */
export class ModeManager {
    gridManager: GridManager;

    /**
     * constructs mode manager
     *
     * @param gridManager
     */
    constructor(gridManager: GridManager) {
        this.gridManager = gridManager;
    }

    currentInteraction: Interaction = Interaction.NONE;

    editModeOnKeyDown = (key: string) => {
        switch (key) {
            case "KeyX":
                setState({ editMode: EditMode.ERASER });
                break;
            case "KeyT":
                setState({ editMode: EditMode.TILE });
                break;
            case "KeyC":
                setState({ editMode: EditMode.CHIP });
                break;
            case "KeyP":
                setState({ editMode: EditMode.PAN });
                break;
            case "KeyS":
                setState({ editMode: EditMode.CURSOR });
                break;
        }
    };
}
