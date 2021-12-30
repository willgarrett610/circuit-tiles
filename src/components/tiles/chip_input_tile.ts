import * as PIXI from "pixi.js";

import config from "../../config";
import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import state from "../../state";
import { CMouseEvent, getTextInput } from "../../utils";
import { displayContextMenu } from "../../utils/context_menu";
import { ConnectionType, GraphicsTile, Tile } from "./tile";

/** chip input tile */
export default class ChipInputTile extends GraphicsTile {
    static chipTile = true;

    type = ChipInputTile;
    connectionTemplate = {
        up: ConnectionType.INPUT,
        down: ConnectionType.INPUT,
        left: ConnectionType.INPUT,
        right: ConnectionType.INPUT,
    };

    label: string = "Input";

    isNode = true;
    rotatable = false;

    id: string = "";

    /**
     * display context menu for io tile
     *
     * @param e Mouse event
     */
    onContext = (e: CMouseEvent) => {
        if (this.forGraphicOnly) return;
        displayContextMenu(e.pageX, e.pageY, "ioTile").then((name) => {
            if (name === "rename") {
                getTextInput("Rename", "Enter new name", this.id).then(
                    (value) => {
                        if (!state.currentChipGrid) return;
                        if (
                            Object.values(
                                state.currentChipGrid?.chip.tiles
                            ).find(
                                (v) =>
                                    v instanceof ChipInputTile && v.id === value
                            )
                        ) {
                            console.log("Name already taken");
                        }
                        const inputTileE =
                            state.currentChipGrid?.chip.inputTiles.find(
                                (value) => value.name === this.id
                            );
                        const inputTileS = Object.values(
                            state.currentChipGrid.chip.structure
                        ).find(
                            (value) =>
                                value instanceof ChipInputTile &&
                                value.id === this.id
                        ) as ChipInputTile;
                        if (inputTileE) {
                            inputTileE.tile.id = value;
                            inputTileE.name = value;
                            inputTileE.tile.generateText();
                        }
                        if (inputTileS) {
                            inputTileS.id = value;
                            inputTileS.generateText();
                        }
                    }
                );
            }
        });
    };

    /**
     * convert tile to node
     *
     * @returns Logic node
     */
    toNode(): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            [new CircuitLocation("global", this.x, this.y)],
            this
        );
        logicNode.state = this.signalActive;
        return logicNode;
    }

    /** Generate text component */
    generateText(): void {
        if (this.container) {
            for (const child of this.container.children) {
                if (child instanceof PIXI.Text) {
                    this.container.removeChild(child);
                }
            }

            const idText = new PIXI.Text(this.id, {
                fontFamily: "Arial",
                fontSize: 20,
                fill: 0xffffff,
            });
            idText.anchor.set(0, 0);
            idText.x =
                this.container.width / (this.container.scale.x * 2) -
                idText.width / 2;
            idText.y =
                this.container.height / (this.container.scale.y * 2) -
                idText.height / 2;
            this.container.addChild(idText);
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

    /**
     * Create a clone of this tile
     *
     * @param tile Tile
     */
    createClone(tile: Tile) {
        this.id = (tile as ChipInputTile).id;
    }
}
