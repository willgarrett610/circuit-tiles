import { Tile } from "../components/tiles/tile";
import { gridManager } from "../index";
import init from "../lib";
import Graph from "./graph";

let loop: NodeJS.Timer | undefined;
let updatedTiles: Tile[] = [];

export const beginLoop = async (interval: number) => {
    const lib = await init();
    loop = setInterval(() => {
        const grid = gridManager.mainGrid;
        const graph = Graph.genFromGrid(grid);
        const nodes = graph.convertForRust();

        const updatedIndices = [];

        // Map updated tiles to graph node indices
        for (let i = 0; i < graph.nodes.length; i++) {
            const node = graph.nodes[i];
            if (node.originTile && updatedTiles.includes(node.originTile)) {
                updatedIndices.push(i);
            }
        }
        updatedTiles = [];

        const updates = lib.compute_logic(
            nodes,
            Int32Array.from(updatedIndices)
        );

        console.log(graph.nodes);
        console.log(updates);

        for (let i = 0; i < updates.length; i += 2) {
            const index = updates[i];
            const state = updates[i + 1];
            const node = graph.nodes[index];
            for (const loc of node.locations) {
                const logicTile = graph.getLogicTile(loc.x, loc.y, loc.scope);
                const tile = logicTile?.tile;
                if (tile) {
                    tile.signalActive = state;
                }
            }
        }
        gridManager.getGrid().renderTiles();
    }, interval);
};

export const stopLoop = () => {
    if (loop) {
        clearInterval(loop);
        loop = undefined;
    }
};

export const addUpdatedTile = (tile: Tile) => {
    if (!updatedTiles.includes(tile)) {
        updatedTiles.push(tile);
    }
};
