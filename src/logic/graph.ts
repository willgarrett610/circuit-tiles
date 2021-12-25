import { ConnectionType, Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";
import LogicEdge from "./edge";
import LogicNode from "./node";

/**
 * Graph to hold logic nodes.
 */
export default class Graph {
    nodes: LogicNode[];
    edges: LogicEdge[];

    /** constructs the graph */
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

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
            payload: LogicNode | LogicEdge | undefined;
        };
        const logicTiles: { [key: string]: LogicTile | undefined } = {};

        const getLogicTile = (x: number, y: number) => {
            return logicTiles[`${x},${y}`];
        };

        const setLogicTile = (x: number, y: number, tile: LogicTile) => {
            logicTiles[`${x},${y}`] = tile;
        };

        const createLogicEdge = (initialTile: Tile) => {
            const logicEdge = new LogicEdge();

            const findEdge = (tile: Tile): CircuitLocation[] => {
                if (!tile.isEdge) return [];
                const edgeLocations = [
                    new CircuitLocation("global", tile.x, tile.y),
                ];

                setLogicTile(tile.x, tile.y, { tile, payload: logicEdge });

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

        for (const [_, tile] of Object.entries(tiles)) {
            if (!tile) continue;
            if (tile.isNode && tile.toNode) {
                const node = tile.toNode();
                graph.nodes.push(node);
                setLogicTile(tile.x, tile.y, { tile, payload: node });
            } else if (tile.isEdge) {
                if (!getLogicTile(tile.x, tile.y)) {
                    graph.edges.push(createLogicEdge(tile));
                }
            } else {
                // nested in a chip
            }
        }

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
                const node = logicTile.payload as LogicNode;

                for (const connectionOffset of connectionOffsets) {
                    if (!connections[connectionOffset.side]) continue;
                    const connectedTile = getLogicTile(
                        logicTile.tile.x + connectionOffset.offset[0],
                        logicTile.tile.y + connectionOffset.offset[1]
                    );
                    if (!connectedTile) continue;
                    let edge: LogicEdge | undefined;
                    if (
                        connectedTile.tile.isNode &&
                        !(connectedTile.payload as LogicNode).inputEdge &&
                        !(connectedTile.payload as LogicNode).outputEdge
                    ) {
                        edge = new LogicEdge();
                        graph.edges.push(edge);
                    }

                    if (connectedTile.tile.isEdge)
                        edge = connectedTile.payload as LogicEdge;

                    if (!edge) continue;

                    if (
                        connectionsTemplate[connectionOffset.side] ===
                        ConnectionType.INPUT
                    ) {
                        node.inputEdge = edge;
                        edge.outputs.push(node);
                    } else if (
                        connectionsTemplate[connectionOffset.side] ===
                        ConnectionType.OUTPUT
                    ) {
                        edge.inputs.push(node);
                        node.outputEdge = edge;
                    }
                }
            }
        }

        return graph;
    }
}
