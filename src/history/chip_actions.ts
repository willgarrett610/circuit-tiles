import { PlacedChip } from "../components/chip/placed_chip";
import Grid from "../components/grid/grid";
import InteractiveGrid from "../components/grid/interactive_grid";
import ChipOutputTile from "../components/tiles/chip_output_tile";
import ChipTile from "../components/tiles/chip_tile";
import IOTile from "../components/tiles/io_tile";
import { findType, TileType } from "../components/tiles/tile_types";
import { locationToTuple } from "../utils";
import { TileManager } from "../utils/TileManager";
import { add, sub } from "../utils/math";
import { Action } from "./history_manager";

interface PlaceChipPayload {
    chip: PlacedChip;
    chipFormerLocation: [number, number];
    grid: Grid;
}

export const setChip: Action<PlaceChipPayload> = {
    do: async ({ grid, chip: placedChip, chipFormerLocation }) => {
        placedChip.tiles = new TileManager();
        grid.chips.push(placedChip);
        const chip = placedChip.chip.getRootOriginal();
        chip.placedChips.add(placedChip);
        const structure = chip.structure;
        const structureTiles = structure.getTiles();

        const offset = chipFormerLocation;

        for (const structureTile of structureTiles) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(locationToTuple(placedChip.location), [structureTile.x, structureTile.y]),
                offset
            ) as [number, number];
            await grid.removeTile(tileLocation[0], tileLocation[1], undefined, true);
            const placedTile = (await grid.addTile(
                tileLocation[0],
                tileLocation[1],
                findType(structureTile.type) as TileType,
                undefined,
                undefined,
                true,
                true
            )) as ChipTile | undefined;

            if (placedTile) {
                if (placedTile instanceof ChipOutputTile) placedTile.hue = (structureTile as ChipOutputTile).hue;
                placedTile.id = structureTile.id;
                placedTile.chip = placedChip;
                placedChip.tiles.setTile(...tileLocation, placedTile);
                if (placedTile instanceof IOTile) {
                    placedTile.generateText();
                }
                placedTile.updateContainer();
            }
        }

        await grid.dispatchHandler("postAddChip", placedChip);
        grid.update({ updateTiles: { newGraphics: true } });
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
    do: async ({ grid, chip: placedChip }) => {
        if (placedChip.chip.getRootOriginal()) {
            placedChip.chip.getRootOriginal().placedChips.delete(placedChip);
        } else {
            placedChip.chip.placedChips.delete(placedChip);
        }

        const index = grid.chips.indexOf(placedChip);
        if (index === -1) return;

        for (const chipTile of placedChip.tiles) {
            if (chipTile) await grid.removeTile(chipTile.x, chipTile.y, true, true);
        }

        await grid.dispatchHandler("postRemoveChip", placedChip);
        grid.chips.splice(index, 1);
        grid.update({ updateTiles: { newGraphics: true } });
    },
    undo: ({ payload: { chip: placedChip, grid } }) => {
        placedChip.tiles = new TileManager();

        (grid as InteractiveGrid).placeChip(
            placedChip.chip.getRootOriginal(),
            locationToTuple(placedChip.location),
            false,
            placedChip
        );
    },
};
