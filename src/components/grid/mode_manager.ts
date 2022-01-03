import { setEditMode } from "../../history/edit_mode_action";
import { performAction } from "../../history/history_manager";
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

    finishInteraction = () => {
        if (this.currentInteraction !== Interaction.NONE) {
            this.currentInteraction = Interaction.NONE;
            if (this.gridManager.historyManager.history.length > 0) {
                this.gridManager.historyManager
                    .currentHistory()
                    .push(...this.gridManager.historyManager.tempHistory);
                this.gridManager.historyManager.cleanHistory();
            }
            this.gridManager.historyManager.newHistory();
            this.gridManager.historyManager.undoHistory = [];
            this.gridManager.historyManager.tempHistory = [];
        }
    };

    editModeOnKeyDown = (key: string) => {
        switch (key) {
            case "KeyX":
                performAction(setEditMode, EditMode.ERASER);
                break;
            case "KeyT":
                performAction(setEditMode, EditMode.TILE);
                break;
            case "KeyC":
                performAction(setEditMode, EditMode.CHIP);
                break;
            case "KeyP":
                performAction(setEditMode, EditMode.PAN);
                break;
            case "KeyS":
                performAction(setEditMode, EditMode.CURSOR);
                break;
        }
    };
}
