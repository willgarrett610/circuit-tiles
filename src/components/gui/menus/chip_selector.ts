import * as PIXI from "pixi.js";

import config from "../../../config";
import { createChipInputForm } from "../../../menus/create_chip";
import state, {
    setStateProp,
    setState,
    update,
    publish,
    multiSubscribe,
} from "../../../state";
import { hslToHex, CMouseEvent, height } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import { displayContextMenu } from "../../../utils/context_menu";
import { EditMode } from "../../../utils/edit_mode";
import { Chip } from "../../chip/chip";
import ChipGrid from "../../chip/chip_grid";
import { getSprite } from "../../sprites/sprite_loader";
import SelectorMenu from "../component/selector_menu";

/**
 * Menu window used to select chip to be placed
 */
export default class ChipSelector extends SelectorMenu {
    /**
     * Constructs a chip selector
     */
    constructor() {
        super(
            config.menubarSize,
            config.menubarSize,
            config.selectorWidth,
            height() - config.menubarSize,
            "Chips",
            (i, tileSize) => {
                if (i > state.chips.length) return null;

                if (i === state.chips.length) {
                    const defaultContainer = new PIXI.Container();
                    const defaultSprite = getSprite("add");
                    defaultSprite.width = tileSize;
                    defaultSprite.height = tileSize;
                    defaultContainer.addChild(defaultSprite);
                    const hoverContainer = new PIXI.Container();
                    const hoverSprite = getSprite("add");
                    hoverSprite.width = tileSize;
                    hoverSprite.height = tileSize;
                    hoverContainer.addChild(hoverSprite);

                    return {
                        name: "New Chip",
                        defaultContainer,
                        hoverContainer,
                        selectable: false,
                        onClick: () => {
                            const close = createChipInputForm({
                                hueValue: Math.floor(Math.random() * 340),
                                onSubmit: ({ name, color, hue }) => {
                                    const chip = new Chip(name, color, hue);
                                    setStateProp("chips", (chips) => {
                                        chips.push(chip);
                                    });
                                    setState({
                                        editedChip: update,
                                        currentChipGrid: new ChipGrid(chip),
                                        isStructured: true,
                                        chipEditor: true,
                                        editMode: EditMode.TILE,
                                    });
                                    close();
                                },
                                verifyText: (name) => {
                                    if (name.length === 0) return false;
                                    // make sure name is not already taken
                                    return !state.chips.find(
                                        (chip) => chip.name === name
                                    );
                                },
                            });
                        },
                    };
                }

                const chip = state.chips[i];
                const isStructured = chip.isStructured();

                const genContainer = (hover: boolean) => {
                    const graphics = new PIXI.Graphics();
                    graphics.beginFill(
                        isStructured ? chip.color : hslToHex(chip.hue, 50, 20)
                    );
                    graphics.drawRect(0, 0, 100, 100);
                    graphics.endFill();

                    if (hover && !isStructured) {
                        graphics.beginFill(config.colors.disabledTileX, 0.7);
                        graphics.drawPolygon(
                            [
                                [20, 90],
                                [50, 60],
                                [80, 90],
                                [90, 80],
                                [60, 50],
                                [90, 20],
                                [80, 10],
                                [50, 40],
                                [20, 10],
                                [10, 20],
                                [40, 50],
                                [10, 80],
                            ].flat()
                        );
                        graphics.endFill();
                    }

                    graphics.width = tileSize;
                    graphics.height = tileSize;

                    const container = new PIXI.Container();
                    container.addChild(graphics);
                    return container;
                };

                const defaultContainer = genContainer(false);
                const hoverContainer = genContainer(true);

                return {
                    name: chip.name,
                    defaultContainer,
                    hoverContainer,
                    selectable: isStructured,
                    onContext: (e: CMouseEvent) => {
                        displayContextMenu(
                            e.pageX,
                            e.pageY,
                            "chipSelection"
                        ).then((name) => {
                            switch (name) {
                                case "settings": {
                                    const close = createChipInputForm({
                                        title: "Edit Chip",
                                        submitButtonText: "Submit",
                                        textValue: chip.name,
                                        hueValue: chip.hue,

                                        onSubmit: ({ name, color, hue }) => {
                                            chip.name = name;
                                            chip.color = color;
                                            chip.hue = hue;
                                            publish("chips");
                                            close();
                                        },
                                        verifyText: (name) => {
                                            if (name === chip.name) return true;
                                            if (name.length === 0) return false;
                                            // make sure name is not already taken
                                            return !state.chips.find(
                                                (chip) => chip.name === name
                                            );
                                        },
                                    });

                                    break;
                                }
                                case "edit":
                                    setState({
                                        editedChip: update,
                                        currentChipGrid: new ChipGrid(chip),
                                        chipEditor: true,
                                        chipGridMode: ChipGridMode.EDITING,
                                        editMode: EditMode.TILE,
                                    });
                                    break;
                                case "delete":
                                    setStateProp("chips", (chips) => {
                                        chips.splice(chips.indexOf(chip), 1);
                                    });
                                    setState({
                                        currentChipGrid: undefined,
                                        chipEditor: false,
                                    });
                                    break;
                                case "duplicate":
                                    setStateProp("chips", (chips) => {
                                        const newChip = chip.clone();
                                        let i = 1;
                                        let newName = "";
                                        do {
                                            newName =
                                                newChip.name + "(" + i + ")";
                                            i++;
                                        } while (
                                            state.chips.find(
                                                (x) => x.name === newName
                                            )
                                        );
                                        newChip.name = newName;
                                        chips.push(newChip);
                                    });
                                    break;
                            }
                        });
                    },
                };
            },
            (i) => setState({ selectedTileIndex: i })
        );
        this.visible = false;

        this.sizeLambda = () => [
            config.selectorWidth,
            height() - config.menubarSize,
        ];

        multiSubscribe(["chips", "chipGridMode", "editMode"], () => {
            this.generateComponents();
        });
    }
}
