import config from "../../config";
import ButtonTile from "./button_tile";
import IOTile from "./io_tile";
import LeverTile from "./lever_tile";
import { ConnectionType } from "./tile";

/** chip input tile */
export default class ChipInputTile extends IOTile {
    type = ChipInputTile;
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    extraInputTile?: ButtonTile | LeverTile;

    label: string = "Input";

    chipTileKey: "inputTiles" = "inputTiles";

    /**
     * Set extra input tile
     *
     * @param tile Tile
     */
    setExtraInputTile(tile: ButtonTile | LeverTile | undefined) {
        this.extraInputTile = tile;
        if (this.extraInputTile && this.container) {
            const extraContainer = this.extraInputTile.getContainer(
                this.container.width * 0.8 * this.container.scale.x
            );
            extraContainer.pivot.set(0, 0);
            extraContainer.x =
                this.container.width / (2 * this.container.scale.x) -
                extraContainer.width / 2;
            extraContainer.y =
                this.container.height / (2 * this.container.scale.y) -
                extraContainer.height / 2;
            this.container?.addChild(extraContainer);
        }
    }

    /** draw graphics */
    drawGraphics(): void {
        if (!this.graphics) return;

        this.graphics.beginFill(
            this.signalActive
                ? config.colors.activeInput
                : config.colors.inactiveInput
        );
        this.graphics.lineStyle(4, 0x000000);
        this.graphics.drawRect(6, 6, 108, 108);
        this.graphics.endFill();
    }
}
