/**
 * Get entries of object
 *
 * @param input any object
 * @returns entries of arrays with index and value as tuple
 */
export function entries<T>(input: T): [keyof T, T[keyof T]][];
/**
 * Get entries of array
 *
 * @param input any array
 * @returns entries of arrays with value and index as tuple
 */
export function entries<T>(input: T[]): [number, T][];
/**
 * Get entries of array or object
 *
 * @param input any object or array
 * @returns entries of arrays with index and value as tuple
 */
export function entries<T>(
    input: T | T[]
): [number, T][] | [keyof T, T[keyof T]][] {
    if (Array.isArray(input))
        return Object.entries(input).map(([key, value]) => [+key, value]);
    else
        return Object.entries(input).map(([key, value]) => [
            key as keyof T,
            value,
        ]);
}

/**
 * Applies callback to each key value pair in the given object
 *
 * @param object The object to iterate over
 * @param callback Callback that takes in each key value pair
 * @returns New object with the callback applied to each key value pair
 */
export function mapObject<T>(
    object: { [key: string]: T },
    callback: (value: T, key: string) => T
): { [key: string]: T } {
    const newObject: { [key: string]: T } = {};
    for (const key of Object.keys(object))
        newObject[key] = callback(object[key], key);

    return newObject;
}

/**
 * Check if an object is empty
 *
 * @param object object to check
 * @returns true if object is empty
 */
export function isEmpty(object: object): boolean {
    for (const _ in object) return false;
    return true;
}
