import * as PIXI from "pixi.js";

import { gridManager } from "../..";
import config from "../../config";
import state, { subscribe } from "../../state";
import { height, locationToPair, locationToTuple, width } from "../../utils";
import { Interaction } from "../../utils/action";
import { Direction } from "../../utils/directions";
import { EditMode } from "../../utils/edit_mode";
import { mouseDown, pressedKeys } from "../../utils/event";
import { add, sub } from "../../utils/math";
import { Chip } from "../chip/chip";
import { Tile } from "../tiles/tile";
import Grid from "./grid";

/**
 * Grid with events
 */
export default class InteractiveGrid extends Grid {
    mousePos: [x: number, y: number] = [0, 0];
    prevMousePos: [x: number, y: number] = [0, 0];

    interactive = true;

    chipOutlineGraphics: PIXI.Graphics;

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
            } else {
                this.dragData.startLocation = {
                    grid: undefined,
                    screen: undefined,
                };
                this.dragData.endLocation = {
                    grid: undefined,
                    screen: undefined,
                };
            }
        });

        this.chipOutlineGraphics = new PIXI.Graphics();
        this.chipOutlineGraphics.zIndex = 2000;
        this.addChild(this.chipOutlineGraphics);
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
        this.historyManager.endInteraction();

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
        this.historyManager.beginInteraction();

        this.renderSelection();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mousemove = (event: PIXI.interaction.InteractionEvent) => {
        const e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.mousePos = [e.pageX, e.pageY];
        if (mouseDown.left) {
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
                this.dragData.endLocation.screen = locationToPair(
                    this.mousePos
                );

                this.dragData.endLocation.grid = this.screenToGrid(
                    ...this.mousePos,
                    true
                );
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
        this.updateChipOutline();
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
                // do nothing
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
            } else if (
                state.editMode === EditMode.CHIP &&
                state.selectedTileIndex !== -1 &&
                state.chips[state.selectedTileIndex]
            ) {
                const chip = state.chips[state.selectedTileIndex];
                this.placeChip(chip, gridPoint);
            }

            this.update();
        }
    };

    /**
     * places a chip on the grid at a specified location
     *
     * @param chip
     * @param location
     */
    placeChip(chip: Chip, location: [number, number]) {
        if (!this.isValidChipPlacement(location, chip)) return;
        const structure = chip.structure;
        const structureTiles = Object.values(structure);
        const offset = chip.getTopLeftStructure();

        this.historyManager.beginInteraction();
        for (const structureTile of structureTiles) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(location, [structureTile.x, structureTile.y]),
                offset
            ) as [number, number];
            this.addTile(
                ...tileLocation,
                structureTile.type,
                undefined,
                undefined
            );
        }
        this.historyManager.endInteraction();
    }

    /**
     * checks if a chip can be placed at a location
     *
     * @param location location to check
     * @param chip chip to be placed
     * @returns true if chip can be placed
     */
    isValidChipPlacement(location: [number, number], chip: Chip) {
        if (!chip.isStructured()) return false;
        const structureOffset = chip.getTopLeftStructure();
        for (const structureTile of Object.values(chip.structure)) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(location, [structureTile.x, structureTile.y]),
                structureOffset
            ) as [number, number];
            const tileAtLocation = this.getTile(...tileLocation);

            // there was a tile in the way
            if (tileAtLocation) {
                return false;
            }
        }

        return true;
    }

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
                // gridManager.historyManager.redo();
            } else {
                // gridManager.historyManager.undo();
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

            if (e.code === "Delete") {
                if (
                    state.editMode === EditMode.CURSOR &&
                    this.dragData.startLocation.grid &&
                    this.dragData.endLocation.grid
                ) {
                    const minX = Math.min(
                        this.dragData.startLocation.grid.x,
                        this.dragData.endLocation.grid.x
                    );
                    const minY = Math.min(
                        this.dragData.startLocation.grid.y,
                        this.dragData.endLocation.grid.y
                    );

                    const maxX = Math.max(
                        this.dragData.startLocation.grid.x,
                        this.dragData.endLocation.grid.x
                    );
                    const maxY = Math.max(
                        this.dragData.startLocation.grid.y,
                        this.dragData.endLocation.grid.y
                    );

                    this.historyManager.beginInteraction();
                    for (let x = minX; x <= maxX; x++) {
                        for (let y = minY; y <= maxY; y++) {
                            this.removeTile(x, y);
                        }
                    }
                    this.historyManager.endInteraction();
                }
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
        if (state.editMode === EditMode.CHIP) {
            if (this.prevHighlightTileGraphic)
                this.removeChild(this.prevHighlightTileGraphic);
            this.hlTile.clear();
            return;
        }

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

    updateChipOutline = () => {
        // check if the tile has a tile on each side, if it doesn't on a side put a line there,
        // if there is a missing tile on two sides that are next to each other put a corner square

        if (
            state.editMode !== EditMode.CHIP ||
            !state.chips?.[state.selectedTileIndex]?.isStructured?.()
        ) {
            this.chipOutlineGraphics.clear();
            return;
        }
        const gridPos = locationToTuple(
            this.screenToGrid(...this.mousePos, true)
        );
        const chip = state.chips[state.selectedTileIndex];
        if (!chip) return;

        const valid = this.isValidChipPlacement(gridPos, chip);
        const structure = chip.structure;
        const structureTiles = Object.values(structure);
        const structureOffset = chip.getTopLeftStructure();

        // TODO: make good colors in config
        const color = valid ? chip.color : config.colors.chipInvalidPlacement;
        this.chipOutlineGraphics.clear();

        for (const structureTile of structureTiles) {
            if (!structureTile) continue;
            // const tileLocation = sub(
            //     add(gridPos, [structureTile.x, structureTile.y]),
            //     structureOffset
            // ) as [number, number];

            for (const direction of Direction.values()) {
                const directionOffset = Direction.getOffset(direction);

                const tileLocation = sub(
                    add(gridPos, [structureTile.x, structureTile.y]),
                    structureOffset
                ) as [number, number];
                const tileAtLocation = this.getTile(...tileLocation);

                if (valid) {
                    this.chipOutlineGraphics.beginFill(chip.color, 0.3);
                } else {
                    if (tileAtLocation) {
                        this.chipOutlineGraphics.beginFill(
                            config.colors.chipInvalidPlacement,
                            0.3
                        );
                    } else {
                        this.chipOutlineGraphics.beginFill(chip.color, 0.3);
                    }
                }
                this.chipOutlineGraphics.lineStyle(undefined);
                this.chipOutlineGraphics.drawRect(
                    ...locationToTuple(
                        this.gridToScreen(
                            tileLocation[0],
                            tileLocation[1],
                            true,
                            false
                        )
                    ),
                    this.size,
                    this.size
                );

                const adjacentTileLocation = add(
                    [structureTile.x, structureTile.y],
                    directionOffset
                ) as [number, number];
                const adjacentTile = chip.getStructureTile(
                    ...adjacentTileLocation
                );

                if (adjacentTile) continue;

                const topLeft = this.gridToScreen(
                    tileLocation[0],
                    tileLocation[1],
                    true,
                    false
                );
                const topRight = this.gridToScreen(
                    tileLocation[0] + 1,
                    tileLocation[1],
                    true,
                    false
                );
                const bottomLeft = this.gridToScreen(
                    tileLocation[0],
                    tileLocation[1] + 1,
                    true,
                    false
                );
                const bottomRight = this.gridToScreen(
                    tileLocation[0] + 1,
                    tileLocation[1] + 1,
                    true,
                    false
                );

                this.chipOutlineGraphics.lineStyle(2, color);
                switch (direction) {
                    case Direction.UP: {
                        this.chipOutlineGraphics.moveTo(topLeft.x, topLeft.y);
                        this.chipOutlineGraphics.lineTo(topRight.x, topRight.y);

                        break;
                    }
                    case Direction.DOWN: {
                        this.chipOutlineGraphics.moveTo(
                            bottomLeft.x,
                            bottomLeft.y
                        );
                        this.chipOutlineGraphics.lineTo(
                            bottomRight.x,
                            bottomRight.y
                        );
                        break;
                    }
                    case Direction.LEFT: {
                        this.chipOutlineGraphics.moveTo(topLeft.x, topLeft.y);
                        this.chipOutlineGraphics.lineTo(
                            bottomLeft.x,
                            bottomLeft.y
                        );

                        break;
                    }
                    case Direction.RIGHT: {
                        this.chipOutlineGraphics.moveTo(topRight.x, topRight.y);
                        this.chipOutlineGraphics.lineTo(
                            bottomRight.x,
                            bottomRight.y
                        );

                        break;
                    }
                }
            }
        }
    };

    update = () => {
        super.update();
        this.updateHighlightTile();
        this.updateChipOutline();
    };
}
