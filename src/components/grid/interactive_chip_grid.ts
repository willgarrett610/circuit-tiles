import { Chip } from "../chip/chip";
import { PlacedChip } from "../chip/placed_chip";
import { Tile } from "../tiles/tile";
import InteractiveGrid from "./interactive_grid";

/**
 * Chip Grid with events
 */
export default class InteractiveChipGrid extends InteractiveGrid {
    chip: Chip;

    /**
     * Constructs grid
     *
     * @param chip the chip the grid is for
     * @param size pixel size of grid tile
     * @param tiles initial tiles
     * @param placedChips initial placed chips
     */
    constructor(
        chip: Chip,
        size: number,
        tiles?: Map<string, Tile>,
        placedChips?: PlacedChip[]
    ) {
        super(size, tiles);
        this.chip = chip;
        if (placedChips) this.chips = placedChips;
    }

    /**
     * places a chip on the grid at a specified location
     *
     * @param originalChip
     * @param location
     * @param recordHistory
     * @param injectPlaceChip
     */
    placeChip(
        originalChip: Chip,
        location: [number, number],
        recordHistory = true,
        injectPlaceChip: PlacedChip | undefined = undefined
    ) {
        console.log(
            [...originalChip.getRootOriginal().getChipDependencies()].map(
                (x) => x.name
            )
        );
        if (
            originalChip.getRootOriginal().getChipDependencies().has(this.chip)
        ) {
            console.log("oh no! you can't do that!");
            return;
        }
        super.placeChip(originalChip, location, recordHistory, injectPlaceChip);
    }
}
