import config from "../../config";
import { createOutputHueForm } from "../../menus/output_hue";
import state from "../../state";
import { displayContextMenu } from "../../utils/context_menu";
import { CMouseEvent } from "../../utils/event";
import { hslToHex } from "../../utils/graphics";
import IOTile from "./io_tile";
import { ConnectionType } from "./tile";

/** chip output tile */
export default class ChipOutputTile extends IOTile {
    type = ChipOutputTile;
    typeNumber = 6;
    connectionTemplate = {
        up: ConnectionType.OUTPUT,
        down: ConnectionType.OUTPUT,
        left: ConnectionType.OUTPUT,
        right: ConnectionType.OUTPUT,
    };

    isNode: boolean = true;

    label: string = "Output";

    chipTileKey: "outputTiles" = "outputTiles";

    hue: number = config.colors.defaultOutputHue;

    /**
     * display context menu for io tile
     *
     * @param e Mouse event
     */
    onContext = (e: CMouseEvent) => {
        if (this.forGraphicOnly || !state.chipEditor) return;
        displayContextMenu(e.pageX, e.pageY, "outputTile").then((name) => {
            if (name === "rename") {
                this.openRenameMenu();
            } else if (name === "recolor") {
                const close = createOutputHueForm({
                    title: "Recolor Output",
                    hue: this.hue,
                    onSubmit: ({ hue }) => {
                        if (!state.currentChipGrid) return;

                        for (const tile of state.currentChipGrid.grids.chip.tiles.values()) {
                            if (
                                tile instanceof ChipOutputTile &&
                                tile.id === this.id
                            ) {
                                tile.hue = hue;
                                tile.updateContainer();
                            }
                        }

                        for (const tile of state.currentChipGrid.grids.structure.tiles.values()) {
                            if (
                                tile instanceof ChipOutputTile &&
                                tile.id === this.id
                            ) {
                                tile.hue = hue;
                                tile.updateContainer();
                            }
                        }

                        close();
                    },
                });
            }
        });
    };

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? hslToHex(this.hue, 80, 39)
                : hslToHex(this.hue, 78, 16)
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }

    /**
     * Create a clone
     *
     * @param tile Old tile
     */
    createClone(tile: ChipOutputTile): void {
        super.createClone(tile);
        this.hue = tile.hue;
    }
}
