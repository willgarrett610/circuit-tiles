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

/**
 * linear interpolation between two numbers
 *
 * @param x input number
 * @param inMin lower range for input
 * @param inMax high range for input
 * @param outMin low range for output
 * @param outMax high range for output
 * @param clamped if true, clamp output to outMin and outMax
 * @returns number between outMin and outMax
 */
export function map(
    x: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
    clamped: boolean = true
): number {
    if (clamped)
        return map(clamp(x, inMin, inMax), inMin, inMax, outMin, outMax, false);
    return ((x - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * adds multiple fixed length number arrays together
 *
 * @param arrays array of numbers
 * @returns array of numbers
 */
export function add(...arrays: number[][]) {
    const result = arrays[0].map((x, i) => {
        let sum = x;
        for (let j = 1; j < arrays.length; j++) {
            sum += arrays[j][i];
        }
        return sum;
    });
    return result;
}

/**
 * subtracts multiple fixed length number arrays from each other
 *
 * @param arrays array of numbers
 * @returns array of numbers
 */
export function sub(...arrays: number[][]) {
    const result = arrays[0].map((x, i) => {
        let sum = x;
        for (let j = 1; j < arrays.length; j++) {
            sum -= arrays[j][i];
        }
        return sum;
    });
    return result;
}

/**
 * multiplies multiple fixed length number arrays
 *
 * @param arrays array of numbers
 * @returns array of numbers
 */
export function mult(arrays: number[][]) {
    const result = arrays[0].map((x, i) => {
        let product = x;
        for (let j = 1; j < arrays.length; j++) {
            product *= arrays[j][i];
        }
        return product;
    });
    return result;
}
