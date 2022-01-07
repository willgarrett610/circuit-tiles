/* eslint-disable @typescript-eslint/no-explicit-any */
import Grid from "../components/grid/grid";
import IOTile from "../components/tiles/io_tile";
import { ConnectionType, Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";
import LogicNode from "./node";

type LogicTile = {
    tile: Tile;
    node: LogicNode;
    location: CircuitLocation;
};

/**
 * Graph to hold logic nodes.
 */
export default class Graph {
    nodes: LogicNode[] = []; // consider changing to a map where the key is the tile
    scopes: string[][] = [];
    logicTiles: { [key: string]: LogicTile | undefined } = {};

    getLogicTile = (x: number, y: number, scope: string[]) => {
        const scopeStr = scope.join(",");
        return this.logicTiles[`${x},${y}.${scopeStr}`];
    };

    setLogicTile = (tile: LogicTile) => {
        const location = tile.location;
        const scopeStr = location.scope.join(",");
        this.logicTiles[`${location.x},${location.y}.${scopeStr}`] = tile;
    };

    getTile = (
        x: number,
        y: number,
        tiles: { [key: string]: Tile | undefined }
    ) => {
        return tiles[`${x},${y}`];
    };

    /**
     * Checks if the given scope exists
     *
     * @param scope
     * @returns true if scope exists
     */
    scopeExists(scope: string[]) {
        for (const scopeArray of this.scopes) {
            let match = true;
            for (let i = 0; i < scope.length; i++) {
                if (scopeArray[i] !== scope[i]) {
                    match = false;
                    break;
                }
            }
            if (match) return true;
        }
    }

    /**
     * Adds nodes from the grid to this graph and recursively traverses chips
     *
     * @param tiles
     * @param scope
     */
    addTiles(tiles: { [key: string]: Tile | undefined }, scope: string[]) {
        // If the given scope already has been added
        if (this.scopeExists(scope)) return;

        this.scopes.push(scope);

        for (const tile of Object.values(tiles)) {
            if (!tile || (tile instanceof IOTile && !tile.chip)) continue;
            if (tile.isNode && tile.toNode) {
                // handle chip input / output tiles such that it leads to the chip's corresponding logic node
                const node = tile.toNode(scope);
                if (tile instanceof IOTile) {
                    const chip = tile.chip;
                    if (chip) {
                        const chipTile = chip.chip.getTileById(
                            tile.id,
                            tile.type
                        );
                        if (chipTile) {
                            node.locations.push(
                                new CircuitLocation(
                                    [...scope, chip.scopeName],
                                    chipTile.x,
                                    chipTile.y
                                )
                            );
                            this.setLogicTile({
                                tile: chipTile,
                                node,
                                location: new CircuitLocation(
                                    [...scope, chip.scopeName],
                                    chipTile.x,
                                    chipTile.y
                                ),
                            });
                            this.addTiles(chip.chip.tiles, [
                                ...scope,
                                chip.scopeName,
                            ]);
                        }
                    }
                }
                this.nodes.push(node);
                this.setLogicTile({
                    tile,
                    node,
                    location: new CircuitLocation(scope, tile.x, tile.y),
                });
            } else if (tile.isWire) {
                // handle wire tiles
                if (!this.getLogicTile(tile.x, tile.y, scope))
                    this.nodes.push(this.createLogicEdge(tiles, tile, scope));
            }
        }
    }

    createLogicEdge = (
        tiles: { [key: string]: Tile | undefined },
        initialTile: Tile,
        scope: string[]
    ) => {
        const logicEdge = new LogicNode("Or Wire", 0);

        const findEdge = (tile: Tile): CircuitLocation[] => {
            if (!tile.isWire) return [];
            const edgeLocations = [new CircuitLocation(scope, tile.x, tile.y)];

            this.setLogicTile({
                tile,
                node: logicEdge,
                location: new CircuitLocation(scope, tile.x, tile.y),
            });

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
                const connectedTile = this.getTile(
                    tile.x + connectionOffset.offset[0],
                    tile.y + connectionOffset.offset[1],
                    tiles
                );
                if (
                    !connectedTile ||
                    this.getLogicTile(
                        tile.x + connectionOffset.offset[0],
                        tile.y + connectionOffset.offset[1],
                        scope
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

    /**
     * Generate graph from a grid
     *
     * @param grid
     * @returns graph
     */
    static genFromGrid(grid: Grid) {
        const graph = new Graph();

        // initially create all logic nodes
        graph.addTiles(grid.tiles, ["global"]);

        // connect all the logic nodes
        for (const logicTile of Object.values(graph.logicTiles)) {
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
                    const connectedTile = graph.getLogicTile(
                        logicTile.location.x + connectionOffset.offset[0],
                        logicTile.location.y + connectionOffset.offset[1],
                        logicTile.location.scope
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

    /**
     * converts all nodes into array readable by rust
     *
     * @returns nodes in integer array format
     */
    convertForRust() {
        // type of node
        // current state
        // number of inputs
        // number of outputs
        // input indices
        // output indices
        const output = [];
        for (const node of this.nodes) {
            const nodeData = [
                node.type,
                node.state ? 1 : 0,
                node.inputs.size,
                node.outputs.size,
                [...node.inputs].map((input) => this.nodes.indexOf(input)),
                [...node.outputs].map((output) => this.nodes.indexOf(output)),
            ];
            output.push(nodeData);
        }

        return Int32Array.from(output.flat(2));
    }
}
