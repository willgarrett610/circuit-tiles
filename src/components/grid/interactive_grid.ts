import * as PIXI from "pixi.js";

import { gridManager } from "../..";
import config from "../../config";
import state, { subscribe } from "../../state";
import {
    height,
    locationToPair,
    locationToTuple,
    mouseDown,
    pressedKeys,
    width,
} from "../../utils";
import { Interaction } from "../../utils/action";
import { EditMode } from "../../utils/edit_mode";
import { Tile } from "../tiles/tile";
import Grid from "./grid";

/**
 * Grid with events
 */
export default class InteractiveGrid extends Grid {
    mousePos: [x: number, y: number] = [0, 0];
    prevMousePos: [x: number, y: number] = [0, 0];

    interactive = true;

    /**
     * Constructs grid
     *
     * @param size pixel size of grid tile
     * @param tiles initial tiles
     */
    constructor(size: number, tiles?: { [key: string]: Tile | undefined }) {
        super(size, tiles);

        subscribe("interactive", (value) => {
            this.interactive = value;
        });

        subscribe("editMode", (value) => {
            if (value !== EditMode.CURSOR) {
                this.selectionGraphics.clear();
            }
        });
    }

    scroll = (e: WheelEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((e as any).wheelDeltaY === 0) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const delta = (e as any).wheelDeltaY > 1 ? 1 : -1;

        this.zoom(e.pageX, e.pageY, delta);
    };

    mouseup = (event: PIXI.interaction.InteractionEvent) => {
        const e = event.data.originalEvent as PointerEvent;
        const mousePos: [x: number, y: number] = [e.pageX, e.pageY];

        this.dragData.isDragging = false;
        this.dragData.endLocation.screen = locationToPair(mousePos);
        this.dragData.endLocation.grid = this.screenToGrid(...mousePos, true);

        this.renderSelection();
    };

    mousedown = (event: PIXI.interaction.InteractionEvent) => {
        const e = event.data.originalEvent as PointerEvent;
        const mousePos: [x: number, y: number] = [e.pageX, e.pageY];

        this.dragData.isDragging = true;
        this.dragData.startLocation.screen = locationToPair(mousePos);
        this.dragData.startLocation.grid = this.screenToGrid(...mousePos, true);
        this.dragData.endLocation.screen = locationToPair(mousePos);
        this.dragData.endLocation.grid = this.screenToGrid(...mousePos, true);

        this.renderSelection();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mousemove = (event: PIXI.interaction.InteractionEvent) => {
        const e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
            this.dragData.endLocation.screen = locationToPair(this.mousePos);

            this.dragData.endLocation.grid = this.screenToGrid(
                ...this.mousePos,
                true
            );

            if (
                e.shiftKey ||
                pressedKeys["Space"] ||
                state.editMode === EditMode.PAN
            ) {
                const prevGridPos = this.screenToGrid(
                    ...this.prevMousePos,
                    false,
                    true
                );
                const newGridPos = this.screenToGrid(
                    ...this.mousePos,
                    false,
                    true
                );
                this.x += newGridPos.x - prevGridPos.x;
                this.y += newGridPos.y - prevGridPos.y;
            } else if (state.editMode === EditMode.ERASER) {
                gridManager.modeManager.currentInteraction =
                    Interaction.REMOVING;

                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                for (const gridPoint of gridPoints)
                    this.removeTile(...locationToTuple(gridPoint));
            } else if (state.editMode === EditMode.CURSOR) {
                // do nothing
            } else if (state.editMode === EditMode.TILE) {
                gridManager.modeManager.currentInteraction =
                    Interaction.PLACING;

                const gridPoints = this.gridPointsBetween(
                    ...locationToTuple(
                        this.screenToGrid(...this.prevMousePos, true)
                    ),
                    ...locationToTuple(
                        this.screenToGrid(...this.mousePos, true)
                    )
                );

                let prevTile: Tile | undefined = undefined;
                for (let i = 0; i < gridPoints.length; i++) {
                    const gridPoint = gridPoints[i];

                    const newTile: Tile | undefined = this.addTile(
                        ...locationToTuple(gridPoint),
                        state.selectableTiles[state.selectedTileIndex].tile,
                        prevTile,
                        gridPoint.direction
                    );

                    prevTile = newTile;
                }
            }
            this.update();
        }

        this.updateHighlightTile();
    };

    click = (event: PIXI.interaction.InteractionEvent) => {
        if (
            event.data.button === 0 &&
            !event.data.originalEvent.shiftKey &&
            !pressedKeys["Space"] &&
            state.editMode !== EditMode.PAN
        ) {
            const gridPoint = locationToTuple(
                this.screenToGrid(...this.mousePos, true)
            );

            if (state.editMode === EditMode.ERASER) {
                gridManager.modeManager.currentInteraction =
                    Interaction.REMOVING;
                this.removeTile(...gridPoint);
            } else if (state.editMode === EditMode.CURSOR) {
                // if (this.currentInteraction === Interaction.NONE)
                //     this.rotateTile(...gridPoint);
                // this.currentInteraction = Interaction.PLACING;
            } else if (
                state.editMode === EditMode.TILE &&
                state.selectedTileIndex !== -1
            ) {
                if (
                    gridManager.modeManager.currentInteraction ===
                    Interaction.NONE
                )
                    this.rotateTile(...gridPoint);
                gridManager.modeManager.currentInteraction =
                    Interaction.PLACING;
                this.addTile(
                    ...gridPoint,
                    state.selectableTiles[state.selectedTileIndex].tile,
                    undefined,
                    undefined
                );
            }

            this.update();
        }

        gridManager.modeManager.finishInteraction();
    };

    keyActionCooldownTime = 250;
    lastKeyActionTime = 0;

    keyDown = (e: KeyboardEvent) => {
        const currTime = Date.now();
        if (currTime - this.lastKeyActionTime < this.keyActionCooldownTime)
            return;
        if (e.ctrlKey && e.code === "KeyZ") {
            e.preventDefault();
            this.lastKeyActionTime = currTime;
            if (e.shiftKey) {
                gridManager.historyManager.redo();
            } else {
                gridManager.historyManager.undo();
            }
            e.stopPropagation();
        }

        gridManager.modeManager.editModeOnKeyDown(e.code);

        if (!e.ctrlKey && !e.shiftKey) {
            if (e.code === "Equal") {
                e.preventDefault();

                this.zoom(width() / 2, height() / 2, 1);
            }

            if (e.code === "Minus") {
                e.preventDefault();

                this.zoom(width() / 2, height() / 2, -1);
            }

            if (e.code === "Digit0") {
                e.preventDefault();

                const prevPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.size = this.startingSize;

                const newPos = this.screenToGrid(
                    this.width / 2,
                    this.height / 2
                );

                this.x += (newPos.x - prevPos.x) * this.size;
                this.y += (newPos.y - prevPos.y) * this.size;

                this.update();
            }
        }

        if (!e.ctrlKey && !e.shiftKey && e.code === "KeyH") {
            e.preventDefault();
            this.x = 0;
            this.y = 0;
            this.update();
        }
    };

    prevHighlightTileGraphic: PIXI.Container | undefined;
    locationText = new PIXI.Text("");

    updateHighlightTile = () => {
        const gridScreenPos = this.screenToGrid(...this.mousePos, true, true);
        const gridPos = this.screenToGrid(...this.mousePos, true);

        if (this.prevHighlightTileGraphic)
            this.removeChild(this.prevHighlightTileGraphic);
        if (
            state.selectedTileIndex !== -1 &&
            state.editMode === EditMode.TILE &&
            this.getTile(...locationToTuple(gridPos)) === undefined
        ) {
            const tempTile = new state.selectableTiles[
                state.selectedTileIndex
            ].tile(...locationToTuple(gridPos));
            tempTile.forGraphicOnly = true;
            const tileGraphics: PIXI.Container = tempTile.getContainer(
                this.size
            );
            tileGraphics.alpha = 0.5;
            this.addChild(tileGraphics);
            this.prevHighlightTileGraphic = tileGraphics;
            tempTile.updateContainer?.();
            tempTile.update(this.size);
        }

        this.hlTile.clear();
        this.hlTile.beginFill(config.colors.highlightTile);
        this.hlTile.lineStyle(0);
        this.hlTile.drawRect(
            gridScreenPos.x,
            gridScreenPos.y,
            this.size,
            this.size
        );

        if (config.debugMode) {
            this.addChild(this.locationText);
            this.locationText.zIndex = 201;
            this.locationText.text = locationToTuple(gridPos).join();
            this.locationText.position.set(gridScreenPos.x, gridScreenPos.y);
        }
    };

    update = () => {
        super.update();
        this.updateHighlightTile();
    };
}
