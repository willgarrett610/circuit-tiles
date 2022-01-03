/**
 * Gets the dimensions of the viewport
 *
 * @returns returns the dimensions of the viewport
 */
export function dimensions(): [width: number, height: number] {
    return [window.innerWidth, window.innerHeight];
}

/**
 * Gets the width of the viewport
 *
 * @returns returns the width of the viewport
 */
export function width(): number {
    return window.innerWidth;
}

/**
 * Gets the heigh of the viewport
 *
 * @returns returns the height of the viewport
 */
export function height(): number {
    return window.innerHeight;
}

/**
 * Sleeps for a given amount of time
 *
 * @param ms time to sleep in milliseconds
 * @returns returns a promise that resolves after the given amount of time
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts a location object to tuple
 *
 * @param location location object
 * @param location.x x location
 * @param location.y y location
 * @returns tuple of x and y location
 */
export function locationToTuple(location: {
    x: number;
    y: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}): [x: number, y: number] {
    return [location.x, location.y];
}

/**
 * Converts a tuple to a location object
 *
 * @param location tuple of x and y location
 * @returns location object
 */
export function locationToPair(location: [x: number, y: number]): {
    x: number;
    y: number;
} {
    return { x: location[0], y: location[1] };
}
