/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";

import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { createTextInput } from "../../menus/text_input";
import state from "../../state";
import { CMouseEvent } from "../../utils";
import { displayContextMenu } from "../../utils/context_menu";
import ChipInputTile from "./chip_input_tile";
import ChipOutputTile from "./chip_output_tile";
import { GraphicsTile } from "./tile";

/**
 * Generic io tile
 */
export default abstract class IOTile extends GraphicsTile {
    static chipTile = true;

    abstract type: typeof ChipInputTile | typeof ChipOutputTile;

    isNode = true;
    rotatable = false;

    id: string = "";

    abstract chipTileKey: "inputTiles" | "outputTiles";

    /**
     * display context menu for io tile
     *
     * @param e Mouse event
     */
    onContext = (e: CMouseEvent) => {
        if (this.forGraphicOnly) return;
        displayContextMenu(e.pageX, e.pageY, "ioTile").then((name) => {
            if (name === "rename") {
                const close = createTextInput({
                    title: "Rename",
                    label: "Enter new name",
                    value: this.id,
                    placeholder: "Chip name",
                    verify: (value) => {
                        return (
                            state.currentChipGrid !== undefined &&
                            !Object.values(
                                state.currentChipGrid?.chip.tiles
                            ).find(
                                (v) => v instanceof this.type && v.id === value
                            ) &&
                            value.length > 0 &&
                            value.length <= 6
                        );
                    },
                    onSubmit: (value) => {
                        if (!state.currentChipGrid) return;
                        if (
                            Object.values(
                                state.currentChipGrid?.chip.tiles
                            ).find(
                                (v) => v instanceof this.type && v.id === value
                            )
                        ) {
                            console.log("Name already taken");
                        }
                        const inputTileE = (
                            state.currentChipGrid?.chip[this.chipTileKey] as any
                        ).find(
                            (value: { name: string; tile: IOTile }) =>
                                value.name === this.id
                        );
                        const inputTileS = Object.values(
                            state.currentChipGrid.chip.structure
                        ).find(
                            (value) =>
                                value instanceof this.type &&
                                value.id === this.id
                        ) as IOTile;
                        if (inputTileE) {
                            inputTileE.tile.id = value;
                            inputTileE.name = value;
                            inputTileE.tile.generateText();
                        }
                        if (inputTileS) {
                            inputTileS.id = value;
                            inputTileS.generateText();
                        }
                        close();
                    },
                });
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

    /**
     * Create a clone of this tile
     *
     * @param tile Tile
     */
    createClone(tile: IOTile): void {
        this.id = tile.id;
    }
}