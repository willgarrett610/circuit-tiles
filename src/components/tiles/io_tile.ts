/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";

import CircuitLocation from "../../logic/circuit_location";
import LogicNode from "../../logic/node";
import { createTextInput } from "../../menus/text_input";
import state from "../../state";
import ChipInputTile from "./chip_input_tile";
import ChipOutputTile from "./chip_output_tile";
import ChipTile from "./chip_tile";
import { ConnectionType } from "./tile";

/**
 * Generic io tile
 */
export default abstract class IOTile extends ChipTile {
    static chipTile = true;

    abstract type: typeof ChipInputTile | typeof ChipOutputTile;

    // True if this tile is part of a chips circuit
    // This is used to determine if the tiles connection template should be inverted
    isInParentChip: boolean = false;

    isNode = true;
    rotatable = false;

    id: string = "";

    abstract chipTileKey: "inputTiles" | "outputTiles";

    invertConnectionType = (connectionType: ConnectionType) => {
        if (connectionType === ConnectionType.INPUT) {
            return ConnectionType.OUTPUT;
        }
        if (connectionType === ConnectionType.OUTPUT) {
            return ConnectionType.INPUT;
        }
        return connectionType;
    };

    /**
     * get connection template
     *
     * @returns connection template
     */
    getConnectionTemplate() {
        const connectionTemplate = super.getConnectionTemplate();
        if (this.isInParentChip) {
            for (const key of Object.keys(connectionTemplate) as (keyof typeof connectionTemplate)[]) {
                connectionTemplate[key] = this.invertConnectionType(connectionTemplate[key]);
            }
        }
        return connectionTemplate;
    }

    /**
     * Open menu to rename this tile
     */
    openRenameMenu(): void {
        const close = createTextInput({
            title: "Rename",
            label: "Enter new name",
            value: this.id,
            placeholder: "Chip name",
            verify: (value) => {
                value = value.trim();
                if (value === this.id) return true;
                return (
                    state.currentChipGrid !== undefined &&
                    !state.currentChipGrid?.chip.tiles
                        .getTiles()
                        .find((v) => v instanceof this.type && v.id === value) &&
                    value.length > 0 &&
                    value.length <= 6
                );
            },
            onSubmit: (value) => {
                if (!state.currentChipGrid) return;

                value = value.trim();

                const inputTileE = (state.currentChipGrid?.chip[this.chipTileKey] as any).find(
                    (value: { name: string; tile: IOTile }) => value.name === this.id
                );
                const inputTileS = state.currentChipGrid.chip.structure
                    .getTiles()
                    .find((value) => value instanceof this.type && value.id === this.id) as IOTile;
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

    /**
     * convert tile to node
     *
     * @param scope scope
     * @returns Logic node
     */
    toNode(scope: string[]): LogicNode {
        const logicNode = new LogicNode(
            this.label,
            this.typeNumber,
            [new CircuitLocation(scope, this.x, this.y)],
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
                fontSize: 17,
                fill: 0xffffff,
            });
            idText.anchor.set(0, 0);
            idText.x = this.container.width / (this.container.scale.x * 2) - idText.width / 2;
            idText.y = this.container.height / (this.container.scale.y * 2) - idText.height / 2;
            this.container.addChild(idText);
        }
    }

    /**
     * Creates a clone
     *
     * @param tile
     */
    createClone(tile: IOTile): void {
        super.createClone(tile);
        this.isInParentChip = tile.isInParentChip;
    }

    /**
     * update container
     */
    updateContainer(): void {
        super.updateContainer();
        this.generateText();
    }
}
