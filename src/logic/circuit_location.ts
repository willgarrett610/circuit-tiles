/**
 * circuit location to get nested locations of chip to grid location
 */
export default class CircuitLocation {
    scope;
    x;
    y;
    child;

    /**
     * construct circuit location
     *
     * @param scope circuit scope
     * @param x x location of chip
     * @param y y location of chip
     * @param child child location of chip
     */
    constructor(scope: string, x: number, y: number, child?: CircuitLocation) {
        this.scope = scope;
        this.x = x;
        this.y = y;
        this.child = child;
    }
}
