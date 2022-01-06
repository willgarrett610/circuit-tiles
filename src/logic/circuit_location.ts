/**
 * circuit location to get nested locations of chip to grid location
 */
export default class CircuitLocation {
    scope;
    x;
    y;

    /**
     * construct circuit location
     *
     * @param scope circuit scope
     * @param x x location of chip
     * @param y y location of chip
     */
    constructor(scope: string[] | string, x: number, y: number) {
        this.scope = scope instanceof Array ? scope : [scope];
        this.x = x;
        this.y = y;
    }
}
