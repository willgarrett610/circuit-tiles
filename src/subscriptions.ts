import { setState, subscribe } from "./state";
import { Rotation } from "./utils/directions";
import { EditMode } from "./utils/edit_mode";

subscribe("editMode", (editMode) => {
    if (editMode === EditMode.CHIP)
        setState({
            chipPlacementRotation: Rotation.NORMAL,
            ignoreStructureClashWarning: false,
        });
});
