import { Tile } from "../components/tiles/tile";
import CircuitLocation from "./circuit_location";

/**
 * node for logic graph
 */
export default class LogicNode {
    name = "";
    inputs: Set<LogicNode> = new Set();
    outputs: Set<LogicNode> = new Set();
    originTile: Tile | undefined;
    state: boolean = false;
    locations: CircuitLocation[];
    operation: (input: boolean) => boolean = (input) => input;

    /**
     * constructs logic node
     *
     * @param name name of the node
     * @param locations locations of tile
     * @param originTile tile of origin
     */
    constructor(
        name: string,
        locations: CircuitLocation[] = [],
        originTile?: Tile
    ) {
        this.name = name;
        this.locations = locations;
        this.originTile = originTile;
    }
}
