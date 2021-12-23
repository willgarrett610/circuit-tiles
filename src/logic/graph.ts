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
}
