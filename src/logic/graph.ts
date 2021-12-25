import { ConnectionType, Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";
import LogicNode from "./node";

/**
 * Graph to hold logic nodes.
 */
export default class Graph {
    nodes: LogicNode[] = []; // consider changing to a map where the key is the tile

    /**
     * Generate graph from a grid
     *
     * @param tiles
     * @returns graph
     */
    static genFromTiles(tiles: { [key: string]: Tile | undefined }) {
        const getTile = (x: number, y: number) => {
            return tiles[`${x},${y}`];
        };

        const graph = new Graph();
        type LogicTile = {
            tile: Tile;
            node: LogicNode;
        };
        const logicTiles: { [key: string]: LogicTile | undefined } = {};

        const getLogicTile = (x: number, y: number) => {
            return logicTiles[`${x},${y}`];
        };

        const setLogicTile = (x: number, y: number, tile: LogicTile) => {
            logicTiles[`${x},${y}`] = tile;
        };

        const createLogicEdge = (initialTile: Tile) => {
            const logicEdge = new LogicNode("Or Wire");

            const findEdge = (tile: Tile): CircuitLocation[] => {
                if (!tile.isWire) return [];
                const edgeLocations = [
                    new CircuitLocation("global", tile.x, tile.y),
                ];

                setLogicTile(tile.x, tile.y, { tile, node: logicEdge });

                const connections = tile.getConnections();
                const connectionOffsets: {
                    offset: number[];
                    side: "up" | "right" | "down" | "left";
                }[] = [
                    { offset: [1, 0], side: "right" },
                    { offset: [-1, 0], side: "left" },
                    { offset: [0, 1], side: "down" },
                    { offset: [0, -1], side: "up" },
                ];

                for (const connectionOffset of connectionOffsets) {
                    if (!connections[connectionOffset.side]) continue;
                    const connectedTile = getTile(
                        tile.x + connectionOffset.offset[0],
                        tile.y + connectionOffset.offset[1]
                    );
                    if (
                        !connectedTile ||
                        getLogicTile(
                            tile.x + connectionOffset.offset[0],
                            tile.y + connectionOffset.offset[1]
                        )
                    )
                        continue;
                    edgeLocations.push(...findEdge(connectedTile));
                }

                return edgeLocations;
            };

            logicEdge.locations = findEdge(initialTile);
            return logicEdge;
        };

        // initially create all logic nodes
        for (const [_, tile] of Object.entries(tiles)) {
            if (!tile) continue;
            if (tile.isNode && tile.toNode) {
                // handle chip input / output tiles such that it leads to the chip's corresponding logic node
                const node = tile.toNode();
                graph.nodes.push(node);
                setLogicTile(tile.x, tile.y, { tile, node: node });
            } else if (tile.isWire) {
                // handle wire tiles
                if (!getLogicTile(tile.x, tile.y))
                    graph.nodes.push(createLogicEdge(tile));
            }
        }

        // connect all the logic nodes
        for (const [_, logicTile] of Object.entries(logicTiles)) {
            if (!logicTile) continue;
            const connections = logicTile.tile.getConnections();
            const connectionsTemplate = logicTile.tile.getConnectionTemplate();

            const connectionOffsets: {
                offset: number[];
                side: "up" | "right" | "down" | "left";
            }[] = [
                { offset: [1, 0], side: "right" },
                { offset: [-1, 0], side: "left" },
                { offset: [0, 1], side: "down" },
                { offset: [0, -1], side: "up" },
            ];

            if (logicTile.tile.isNode) {
                const node = logicTile.node;

                for (const connectionOffset of connectionOffsets) {
                    if (!connections[connectionOffset.side]) continue;
                    const connectedTile = getLogicTile(
                        logicTile.tile.x + connectionOffset.offset[0],
                        logicTile.tile.y + connectionOffset.offset[1]
                    );
                    if (!connectedTile) continue;

                    if (
                        connectionsTemplate[connectionOffset.side] ===
                        ConnectionType.INPUT
                    ) {
                        node.connectFrom(connectedTile.node);
                    } else if (
                        connectionsTemplate[connectionOffset.side] ===
                        ConnectionType.OUTPUT
                    ) {
                        node.connectTo(connectedTile.node);
                    }
                }
            }
        }

        // simply OR nodes with singular inputs and outputs
        for (let i = 0; i < graph.nodes.length; i++) {
            const node = graph.nodes[i];
            if (node.name === "Or Wire") {
                if (node.inputs.size === 1) {
                    const input = [...node.inputs][0];
                    input.disconnectTo(node);
                    input.locations.push(...node.locations);
                    for (const output of node.outputs) {
                        output.disconnectFrom(node);
                        input.connectTo(output);
                    }
                    // remove the node
                    graph.nodes.splice(i, 1);
                    i--;
                }
            }
        }
        return graph;
    }
}
