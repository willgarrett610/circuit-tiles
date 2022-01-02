import config from "../../../config";
import state, {
    setState,
    multiSubscribe,
    setStateProp,
    subscribe,
} from "../../../state";
import { height } from "../../../utils";
import ChipGridMode from "../../../utils/chip_grid_mode";
import StructureTile from "../../tiles/structure_tile";
import getTileTypes, { TileType } from "../../tiles/tile_types";
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
                                value.push({ ...tileType });
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
                                            !Object.values(
                                                state.currentChipGrid.chip
                                                    .structure
                                            ).find((x) => x?.id === value.name)
                                    )
                                    .map(({ name, tile }) => ({
                                        name,
                                        tile: tile.type,
                                    }));

                                value.push(...selectableTiles, {
                                    name: "Block",
                                    tile: StructureTile,
                                });
                            }
                        }
                    } else {
                        for (const tileType of getTileTypes(false)) {
                            value.push({ ...tileType });
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
