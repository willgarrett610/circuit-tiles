import config from "../../../config";
import state, {
    setState,
    multiSubscribe,
    setStateProp,
    subscribe,
} from "../../../state";
import { height } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import ChipOutputTile from "../../tiles/chip_output_tile";
import StructureTile from "../../tiles/structure_tile";
import getTileTypes, {
    ChipOutputTileType,
    TileType,
} from "../../tiles/tile_types";
import SelectorMenu from "../component/selector_menu";

/**
 * Menu window used to select tile to be placed
 */
export default class TileSelector extends SelectorMenu {
    /**
     * Constructs the tile selector
     */
    constructor() {
        super(
            config.menubarSize,
            config.menubarSize,
            config.selectorWidth,
            height() - config.menubarSize,
            "Tiles",
            (i, tileSize) => {
                if (i >= state.selectableTiles.length) return null;

                const tileType = state.selectableTiles[i].tile;

                const tileOn = new tileType(0, 0);
                const tileOff = new tileType(0, 0);

                if (tileOn instanceof ChipOutputTile) {
                    const outputType = state.selectableTiles[
                        i
                    ] as ChipOutputTileType;
                    tileOn.hue = outputType.hue;
                    (tileOff as ChipOutputTile).hue = outputType.hue;
                }

                tileOn.forGraphicOnly = true;
                tileOff.forGraphicOnly = true;

                tileOn.signalActive = true;

                return {
                    name: state.selectableTiles[i].name,
                    defaultContainer: tileOff.getContainer(tileSize),
                    hoverContainer: tileOn.getContainer(tileSize),
                    selectable: true,
                };
            },
            (i) => {
                return setState({ selectedTileIndex: i });
            }
        );
        this.visible = false;

        this.sizeLambda = () => [
            config.selectorWidth,
            height() - config.menubarSize,
        ];

        // onContextMenu(tileSelector, (e) => {
        //     displayContextMenu(e.pageX, e.pageY, "chip");
        // });

        multiSubscribe(
            ["chipEditor", "chipGridMode", "currentChipGrid", "editedChip"],
            () => {
                setStateProp("selectableTiles", (value) => {
                    value.splice(0);
                    if (state.chipEditor) {
                        if (state.chipGridMode === ChipGridMode.EDITING) {
                            for (const tileType of getTileTypes(true)) {
                                value.push(tileType.clone());
                            }
                        } else {
                            if (state.currentChipGrid) {
                                const selectableTiles: TileType[] = [
                                    ...state.currentChipGrid.chip.inputTiles,
                                    ...state.currentChipGrid.chip.outputTiles,
                                ]
                                    .filter(
                                        (value) =>
                                            state.currentChipGrid?.chip &&
                                            !state.currentChipGrid.chip.structure
                                                .getTiles()
                                                .find(
                                                    (x) => x?.id === value.name
                                                )
                                    )
                                    .map(({ name, tile }) =>
                                        tile instanceof ChipOutputTile
                                            ? new ChipOutputTileType(
                                                  name,
                                                  tile.type,
                                                  tile.hue
                                              )
                                            : new TileType(name, tile.type)
                                    );

                                value.push(
                                    ...selectableTiles,
                                    new TileType("Block", StructureTile)
                                );
                            }
                        }
                    } else {
                        for (const tileType of getTileTypes(false)) {
                            value.push(tileType.clone());
                        }
                    }
                });
            }
        );

        subscribe("selectableTiles", () => {
            setState({ selectedTileIndex: -1 });
            this.generateComponents();
        });

        setState({ chipEditor: false });
    }
}
