/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";

import { gridManager } from "../..";
import config from "../../config";
import { setChip } from "../../history/chip_actions";
import state, { subscribe } from "../../state";
import { height, locationToPair, locationToTuple, width } from "../../utils";
import { Interaction } from "../../utils/action";
import ChipGridMode from "../../utils/chip_grid_mode";
import { displayContextMenu } from "../../utils/context_menu";
import { Direction, Rotation, rotationToString } from "../../utils/directions";
import { EditMode } from "../../utils/edit_mode";
import {
    CMouseEvent,
    mouseDown,
    onContextMenu,
    pressedKeys,
} from "../../utils/event";
import { add, sub } from "../../utils/math";
import { Chip } from "../chip/chip";
import { PlacedChip } from "../chip/placed_chip";
import ChipInputTile from "../tiles/chip_input_tile";
import ChipOutputTile from "../tiles/chip_output_tile";
import { Tile } from "../tiles/tile";
import { ChipOutputTileType, findType, TileType } from "../tiles/tile_types";
import Grid from "./grid";

/**
 * Grid with events
 */
export default class InteractiveGrid extends Grid {
    mousePos: [x: number, y: number] = [0, 0];
    prevMousePos: [x: number, y: number] = [0, 0];
    gridPos: [x: number, y: number] = [0, 0];
    prevGridPos: [x: number, y: number] = [0, 0];

    interactive = true;

    chipOutlineGraphics: PIXI.Graphics;

    /**
     * Constructs grid
     *
     * @param size pixel size of grid tile
     * @param tiles initial tiles
     */
    constructor(size: number, tiles?: Map<string, Tile>) {
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

        onContextMenu(this, this.onContext);
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
    mousemove = async (event: PIXI.interaction.InteractionEvent) => {
        const e = event.data.originalEvent as PointerEvent;
        this.prevMousePos = [...this.mousePos];
        this.prevGridPos = [...this.gridPos];
        this.mousePos = [e.pageX, e.pageY];
        this.gridPos = locationToTuple(
            this.screenToGrid(...this.mousePos, true)
        );

        const updatedGridPoints: [number, number][] = [];

        let updated = false;

        if (mouseDown.left || mouseDown.middle) {
            if (
                (mouseDown.left &&
                    (e.shiftKey ||
                        pressedKeys["Space"] ||
                        state.editMode === EditMode.PAN)) ||
                mouseDown.middle
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

                this.update(
                    { updateGridLines: true, updateTiles: {} },
                    false,
                    false
                );
            } else {
                const prevGridPos = this.screenToGrid(
                    ...this.prevMousePos,
                    true
                );
                const newGridPos = this.screenToGrid(...this.mousePos, true);

                if (
                    prevGridPos.x !== newGridPos.x ||
                    prevGridPos.y !== newGridPos.y
                ) {
                    if (mouseDown.left) {
                        if (state.editMode === EditMode.ERASER) {
                            gridManager.modeManager.currentInteraction =
                                Interaction.REMOVING;

                            const gridPoints = this.gridPointsBetween(
                                ...locationToTuple(
                                    this.screenToGrid(
                                        ...this.prevMousePos,
                                        true
                                    )
                                ),
                                ...locationToTuple(
                                    this.screenToGrid(...this.mousePos, true)
                                )
                            );

                            for (const gridPoint of gridPoints)
                                this.removeTile(...locationToTuple(gridPoint));

                            updatedGridPoints.push(
                                ...gridPoints.map(
                                    (gridPoint): [number, number] => [
                                        gridPoint.x,
                                        gridPoint.y,
                                    ]
                                )
                            );
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
                                    this.screenToGrid(
                                        ...this.prevMousePos,
                                        true
                                    )
                                ),
                                ...locationToTuple(
                                    this.screenToGrid(...this.mousePos, true)
                                )
                            );

                            let prevTile: Tile | undefined = undefined;
                            for (let i = 0; i < gridPoints.length; i++) {
                                const gridPoint = gridPoints[i];

                                const newTile: Tile | undefined =
                                    await this.addTile(
                                        ...locationToTuple(gridPoint),
                                        state.selectableTiles[
                                            state.selectedTileIndex
                                        ],
                                        prevTile,
                                        gridPoint.direction
                                    );

                                prevTile = newTile;
                            }

                            updatedGridPoints.push(
                                ...gridPoints.map(
                                    (gridPoint): [number, number] => [
                                        gridPoint.x,
                                        gridPoint.y,
                                    ]
                                )
                            );
                        }

                        this.update({
                            updateGridLines: true,
                            updateTiles: {
                                newDirection: true,
                                newGraphics: true,
                            },
                            updateSelection: true,
                            locations: updatedGridPoints,
                        });
                    }
                }
            }
            // ! this.update();
            updated = true;
        } else if (this.historyManager.interacting) {
            this.historyManager.endInteraction();
        }

        // check if prevGridPos is different then gridPos
        if (
            !updated &&
            (this.prevGridPos[0] !== this.gridPos[0] ||
                this.prevGridPos[1] !== this.gridPos[1])
        ) {
            this.renderChipOutlines(...this.gridPos);
            this.updateChipOutline();
            this.updateHighlightTile();
        }
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
                ) {
                    const tile = this.getTile(...gridPoint);
                    if (
                        !(
                            tile instanceof ChipInputTile &&
                            (tile.extraInputTile ||
                                ChipInputTile.extraInputTypes.includes(
                                    state.selectableTiles[
                                        state.selectedTileIndex
                                    ].name
                                ))
                        )
                    ) {
                        this.rotateTile(...gridPoint);
                    }
                }

                gridManager.modeManager.currentInteraction =
                    Interaction.PLACING;

                this.addTile(
                    ...gridPoint,
                    state.selectableTiles[state.selectedTileIndex],
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

            this.update({
                updateTiles: {
                    newDirection: true,
                    newGraphics: true,
                    updateSize: true,
                },
                locations: [gridPoint],
            });
        }

        this.removingExtraTiles = false;

        gridManager.modeManager.finishInteraction();
    };

    /**
     * runs on right click
     *
     * @param e
     */
    onContext = (e: CMouseEvent) => {
        if (config.debugMode && state.editMode === EditMode.CURSOR)
            displayContextMenu(e.pageX, e.pageY, "debugTile").then((pick) => {
                const gridPoint = locationToTuple(
                    this.screenToGrid(...this.mousePos, true)
                );
                const tile = this.getTile(...gridPoint);
                switch (pick) {
                    case "location": {
                        console.log(gridPoint.join());
                        break;
                    }
                    case "all": {
                        console.log(tile);
                        break;
                    }
                    case "connections": {
                        console.log(tile?.getConnections());
                        break;
                    }
                    case "rotation": {
                        console.log({
                            rotatable: tile?.rotatable,
                            rotation:
                                tile?.direction +
                                (tile?.direction !== undefined
                                    ? " : " + rotationToString(tile.direction)
                                    : ""),
                        });
                        break;
                    }
                    case "signal": {
                        console.log({
                            signal: tile?.signalActive,
                        });
                        break;
                    }
                    case "type": {
                        console.log({ type: tile?.type });
                        break;
                    }
                }
            });

        if (state.editMode === EditMode.CHIP) {
            // ! DISABLED FOR NOW
            // setState({
            //     chipPlacementRotation: rotateClockWise(
            //         state.chipPlacementRotation
            //     ),
            // });
            this.update(
                {
                    updateTiles: {
                        newDirection: true,
                        newGraphics: true,
                        updateSize: true,
                    },
                },
                false,
                false
            );
        }
    };

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
        const chip = originalChip.clone(true);
        chip.rotate(state.chipPlacementRotation);

        if (!this.isValidChipPlacement(location, chip)) return;

        this.historyManager.beginInteraction();
        const placedChip =
            injectPlaceChip ||
            new PlacedChip(
                locationToPair(location),
                Rotation.NORMAL,
                chip,
                this
            );

        // originalChip.placedChips.add(placedChip);

        this.historyManager.performAction(setChip, {
            grid: this,
            chip: placedChip,
            chipFormerLocation: originalChip.getTopLeftStructure(),
        });

        this.historyManager.endInteraction(!recordHistory);
    }

    /**
     * checks if a chip can be placed at a location
     *
     * @param location location to check
     * @param chip chip to be placed
     * @returns true if chip can be placed
     */
    isValidChipPlacement(location: [number, number], chip: Chip) {
        if (
            (state.chipEditor &&
                state.chipGridMode === ChipGridMode.STRUCTURING) ||
            !chip?.originalChip?.wasStructured
        )
            return false;
        const structureOffset = chip.getTopLeftStructure();
        for (const structureTile of chip.structure.values()) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(location, [structureTile.x, structureTile.y]),
                structureOffset
            ) as [number, number];
            const tileAtLocation = this.getTile(...tileLocation);

            // there was a tile in the way
            if (tileAtLocation) return false;
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

                this.update({
                    updateTiles: {
                        updateSize: true,
                    },
                    updateGridLines: true,
                });
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
            this.update({
                updateTiles: {
                    updateSize: true,
                },
                updateGridLines: true,
                updateSelection: true,
            });
        }
    };

    prevHighlightTileGraphics: Array<PIXI.Container> = [];
    previewTiles: { x: number; y: number; type: TileType }[] = [];

    updateHighlightTile = () => {
        const gridScreenPos = this.screenToGrid(...this.mousePos, true, true);
        const gridPos = this.screenToGrid(...this.mousePos, true);

        if (this.prevHighlightTileGraphics.length > 0) {
            this.prevHighlightTileGraphics.forEach((x) => {
                // x.destroy();
                this.removeChild(x);
            });
            this.prevHighlightTileGraphics = [];
        }

        if (state.editMode === EditMode.CHIP) {
            this.hlTile.clear();
        }

        if (
            state.selectedTileIndex !== -1 &&
            state.editMode === EditMode.TILE &&
            this.getTile(...locationToTuple(gridPos)) === undefined
        ) {
            this.previewTiles.push({
                ...gridPos,
                type: state.selectableTiles[state.selectedTileIndex],
            });
        }

        for (const previewTile of this.previewTiles) {
            const tileType = previewTile.type;
            const tempTile = new tileType.tile(previewTile.x, previewTile.y);
            if ("hue" in tileType) {
                (tempTile as ChipOutputTile).hue = (tileType as any).hue;
            }
            tempTile.forGraphicOnly = true;
            const tileGraphics: PIXI.Container = tempTile.getContainer(
                this.size
            );
            tileGraphics.alpha = 0.5;
            this.addChild(tileGraphics);
            this.prevHighlightTileGraphics.push(tileGraphics);
            tempTile.updateContainer?.();
            // tempTile.update(this.size);
        }
        this.previewTiles = [];

        if (state.editMode === EditMode.CHIP) return;

        this.hlTile.clear();
        this.hlTile.beginFill(config.colors.highlightTile);
        this.hlTile.lineStyle(0);
        this.hlTile.drawRect(
            gridScreenPos.x,
            gridScreenPos.y,
            this.size,
            this.size
        );
    };

    prevCloneChip?: {
        chip: Chip;
        rotation: Rotation;
    };
    updateChipOutline = () => {
        // check if the tile has a tile on each side, if it doesn't on a side put a line there,
        // if there is a missing tile on two sides that are next to each other put a corner square

        if (
            state.editMode !== EditMode.CHIP ||
            (state.chipEditor &&
                state.chipGridMode === ChipGridMode.STRUCTURING) ||
            !state.chips?.[state.selectedTileIndex]?.wasStructured
        ) {
            this.chipOutlineGraphics.clear();
            return;
        }
        const gridPos = locationToTuple(
            this.screenToGrid(...this.mousePos, true)
        );
        const selectedChip = state.chips[state.selectedTileIndex];

        if (!selectedChip) return;
        let chip: Chip;
        // TODO: fix this such that changes will be considered.
        // solution possible is to have a random value or incrementing value as a property of the chip
        // this value can be changed every time the chip is updated
        // this value can be used to determine if the chip has changed

        // if (
        //     this.prevCloneChip &&
        //     this.prevCloneChip.chip.getRootOriginal() === selectedChip &&
        //     this.prevCloneChip.rotation === state.chipPlacementRotation
        // ) {
        //     chip = this.prevCloneChip.chip;
        // } else {
        // eslint-disable-next-line prefer-const
        chip = selectedChip.clone(true);
        chip.rotate(state.chipPlacementRotation);
        this.prevCloneChip = {
            chip,
            rotation: state.chipPlacementRotation,
        };
        // }
        const valid = this.isValidChipPlacement(gridPos, chip);
        const structure = chip.structure;
        const structureTiles = structure.values();
        const structureOffset = chip.getTopLeftStructure();

        const color = valid ? chip.color : config.colors.chipInvalidPlacement;
        this.chipOutlineGraphics.clear();

        for (const structureTile of structureTiles) {
            if (!structureTile) continue;
            const tileLocation = sub(
                add(gridPos, [structureTile.x, structureTile.y]),
                structureOffset
            ) as [number, number];

            const tileAtLocation = this.getTile(...tileLocation);

            const type = findType(structureTile.type) as TileType;
            if (type.tile === ChipOutputTile) {
                (type as ChipOutputTileType).hue = (
                    structureTile as ChipOutputTile
                ).hue;
            }

            this.previewTiles.push({
                x: tileLocation[0],
                y: tileLocation[1],
                type,
            });

            if (valid) {
                this.chipOutlineGraphics.beginFill(chip.color, 0.2);
            } else {
                if (tileAtLocation) {
                    this.chipOutlineGraphics.beginFill(
                        config.colors.chipInvalidPlacement,
                        0.8
                    );
                } else {
                    this.chipOutlineGraphics.beginFill(chip.color, 0.2);
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

            for (const direction of Direction.values()) {
                const directionOffset = Direction.getOffset(direction);

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

                this.chipOutlineGraphics.lineStyle(2, color, 0.5);
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

    update = (
        superOptions: {
            updateGridLines?: boolean | undefined;
            updateTiles: {
                updateSize?: boolean | undefined;
                newGraphics?: boolean | undefined;
                newDirection?: boolean | undefined;
            };
            updateSelection?: boolean | undefined;
            locations?: [number, number][];
        },
        updateChipOutlines = true,
        updateHighlightTile = true
    ) => {
        super.update(superOptions);
        if (updateChipOutlines) {
            this.renderChipOutlines(...this.gridPos);
            this.updateChipOutline();
        }
        if (updateHighlightTile) this.updateHighlightTile();
    };
}
