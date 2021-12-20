/**
 * Takes an input number and returns a number between a min and max value.
 *
 * @param x input number
 * @param min minimum number
 * @param max maximum number
 * @returns returns the number between min and max
 */
export function clamp(
    x: number,
    min: number | undefined,
    max: number | undefined
) {
    if (min !== undefined && max !== undefined && min > max)
        throw Error("Invalid Min Max values");
    if (min !== undefined && x < min) return min;
    if (max !== undefined && x > max) return max;
    return x;
}
