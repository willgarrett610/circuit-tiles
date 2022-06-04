import config from "../../config";
import { addUpdatedTile } from "../../logic/logic_manager";
import state from "../../state";
import { displayContextMenu } from "../../utils/context_menu";
import { CMouseEvent } from "../../utils/event";
import ButtonTile from "./button_tile";
import IOTile from "./io_tile";
import LeverTile from "./lever_tile";
import { ConnectionType } from "./tile";

/** chip input tile */
export default class ChipInputTile extends IOTile {
    type = ChipInputTile;
    typeNumber = 7;
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    isNode: boolean = true;

    extraInputTile?: ButtonTile | LeverTile;

    label: string = "Input";

    chipTileKey: "inputTiles" = "inputTiles";

    /**
     * display context menu for io tile
     *
     * @param e Mouse event
     */
    onContext = (e: CMouseEvent) => {
        if (this.forGraphicOnly || !state.chipEditor) return;
        displayContextMenu(e.pageX, e.pageY, "inputTile").then((name) => {
            if (name === "rename") {
                this.openRenameMenu();
            }
        });
    };

    /**
     * Set extra input tile
     *
     * @param tile Tile
     */
    setExtraInputTile(tile: ButtonTile | LeverTile | undefined) {
        this.extraInputTile = tile;
        if (!this.container) this.container = this.generateContainer();
        if (this.extraInputTile) {
            const extraInput = this.extraInputTile;
            extraInput.clearGraphics = () => {
                if (!extraInput.graphics) return;

                extraInput.graphics.clear();

                extraInput.graphics.beginFill(0, 0);
                extraInput.graphics.drawRect(0, 0, 120, 120);
                extraInput.graphics.endFill();
            };
            const extraContainer = this.extraInputTile.getContainer(
                (this.container.width * 0.9) / this.container.scale.x
            );
            extraContainer.pivot.set(0, 0);
            extraContainer.x =
                this.container.width / (2 * this.container.scale.x) -
                extraContainer.width / 2;
            extraContainer.y =
                this.container.height / (2 * this.container.scale.y) -
                extraContainer.height / 2;
            this.container?.addChild(extraContainer);
            extraInput.onSignalUpdate = (signalActive: boolean) => {
                console.log("input signal update", signalActive);
                this.setSignalActive(signalActive);
                this.updateContainer();
                addUpdatedTile(this);
            };
        }
        this.updateContainer();
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

    /**
     * Create a clone
     *
     * @param tile tile
     */
    createClone(tile: ChipInputTile): void {
        super.createClone(tile);
        this.setExtraInputTile(
            tile.extraInputTile?.clone() as ButtonTile | LeverTile | undefined
        );
        this.updateContainer();
    }
}
