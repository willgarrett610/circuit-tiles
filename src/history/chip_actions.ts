import { PlacedChip } from "../components/chip/placed_chip";
import Grid from "../components/grid/grid";
import InteractiveGrid from "../components/grid/interactive_grid";
import ChipOutputTile from "../components/tiles/chip_output_tile";
import ChipTile from "../components/tiles/chip_tile";
import IOTile from "../components/tiles/io_tile";
import { findType, TileType } from "../components/tiles/tile_types";
import { locationToTuple } from "../utils";
import { add, sub } from "../utils/math";
import { Action } from "./history_manager";

interface PlaceChipPayload {
    chip: PlacedChip;
    chipFormerLocation: [number, number];
    grid: Grid;
}

export const setChip: Action<PlaceChipPayload> = {
    do: ({ grid, chip: placedChip, chipFormerLocation }) => {
        placedChip.tiles = {};
        grid.chips.push(placedChip);
        const chip = placedChip.chip.getRootOriginal();
        chip.placedChips.add(placedChip);
        const structure = chip.structure;
        const structureTiles = Object.values(structure);

        const offset = chipFormerLocation;

        for (const structureTile of structureTiles) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(locationToTuple(placedChip.location), [
                    structureTile.x,
                    structureTile.y,
                ]),
                offset
            ) as [number, number];
            const placedTile = grid.addTile(
                tileLocation[0],
                tileLocation[1],
                findType(structureTile.type) as TileType,
                undefined,
                undefined,
                true,
                true
            ) as ChipTile | undefined;

            if (placedTile) {
                if (placedTile instanceof ChipOutputTile)
                    placedTile.hue = (structureTile as ChipOutputTile).hue;
                placedTile.id = structureTile.id;
                placedTile.chip = placedChip;
                placedChip.setTile(...tileLocation, placedTile);
                if (placedTile instanceof IOTile) {
                    placedTile.generateText();
                }
                placedTile.updateContainer();
            }
        }

        grid.dispatchHandler("postAddChip", placedChip);
        grid.update();
    },
    undo: ({ payload: { chip, grid } }) => {
        grid.removeChip(chip, false);
    },
};

interface RemoveChipPayload {
    chip: PlacedChip;
    grid: Grid;
}

export const deleteChip: Action<RemoveChipPayload> = {
    do: ({ grid, chip: placedChip }) => {
        if (placedChip.chip.getRootOriginal()) {
            placedChip.chip.getRootOriginal().placedChips.delete(placedChip);
        } else {
            placedChip.chip.placedChips.delete(placedChip);
        }

        const index = grid.chips.indexOf(placedChip);
        if (index === -1) return;

        for (const chipTile of Object.values(placedChip.tiles)) {
            if (chipTile) grid.removeTile(chipTile.x, chipTile.y, true, true);
        }

        grid.dispatchHandler("postRemoveChip", placedChip);
        grid.chips.splice(index, 1);
        grid.update();
    },
    undo: ({ payload: { chip: placedChip, grid } }) => {
        placedChip.tiles = {};

        (grid as InteractiveGrid).placeChip(
            placedChip.chip.getRootOriginal(),
            locationToTuple(placedChip.location),
            false,
            placedChip
        );
    },
};
