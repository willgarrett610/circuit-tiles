/**
 * init wasm
 *
 * @returns wasm module
 */
export default async function init() {
    const mod = await import("../crate/pkg");
    return mod;
}
