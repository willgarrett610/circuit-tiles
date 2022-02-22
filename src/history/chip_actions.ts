import { PlacedChip } from "../components/chip/placed_chip";
import Grid from "../components/grid/grid";
import { Action } from "./history_manager";

interface PlaceChipPayload {
    chip: PlacedChip;
    grid: Grid;
}

export const setChip: Action<PlaceChipPayload> = {
    do: ({ grid, chip }) => {
        grid.chips.push(chip);
        grid.dispatchHandler("postAddChip", chip);
        grid.update();
    },
    undo: ({ payload: { chip, grid } }) => {
        const index = grid.chips.indexOf(chip);
        if (index === -1) return;
        grid.dispatchHandler("postRemoveChip", chip);
        grid.chips.splice(index, 1);
        grid.update();
    },
};

interface RemoveChipPayload {
    chip: PlacedChip;
    grid: Grid;
}

export const deleteChip: Action<RemoveChipPayload> = {
    do: ({ grid, chip }) => {
        if (chip.chip.originalChip)
            chip.chip.originalChip.placedChips.delete(chip);

        const index = grid.chips.indexOf(chip);
        if (index === -1) return;
        grid.dispatchHandler("postRemoveChip", chip);
        grid.chips.splice(index, 1);
        grid.update();
    },
    undo: ({ payload: { chip, grid } }) => {
        if (chip.chip.originalChip)
            chip.chip.originalChip.placedChips.add(chip);

        grid.chips.push(chip);
        grid.dispatchHandler("postAddChip", chip);
        grid.update();
    },
};
