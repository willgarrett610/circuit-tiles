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
