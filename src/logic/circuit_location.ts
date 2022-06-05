/**
 * circuit location to get nested locations of chip to grid location
 */
export default class CircuitLocation {
    scope;
    x;
    y;
    extraInput;

    /**
     * construct circuit location
     *
     * @param scope circuit scope
     * @param x x location of chip
     * @param y y location of chip
     * @param extraInput extra input
     */
    constructor(
        scope: string[] | string,
        x: number,
        y: number,
        extraInput: boolean = false
    ) {
        this.scope = scope instanceof Array ? scope : [scope];
        this.x = x;
        this.y = y;
        this.extraInput = extraInput;
    }
}
