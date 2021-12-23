import { Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";
import LogicEdge from "./edge";

/**
 * node for logic graph
 */
export default class LogicNode {
    name = "";
    inputEdge: LogicEdge | undefined;
    outputEdge: LogicEdge | undefined;
    originTile: Tile | undefined;
    state: boolean = false;
    location: CircuitLocation;
    operation: (input: boolean) => boolean = (input) => input;

    /**
     * constructs logic node
     *
     * @param name name of the node
     * @param location location of tile
     * @param originTile tile of origin
     */
    constructor(name: string, location: CircuitLocation, originTile?: Tile) {
        this.name = name;
        this.location = location;
        this.originTile = originTile;
    }
}
