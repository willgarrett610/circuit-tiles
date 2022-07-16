let loadingModPromise: Promise<typeof import("../crate/pkg/index")> | undefined;
/**
 * init wasm
 *
 * @returns wasm module
 */
export default function init(): Promise<typeof import("../crate/pkg/index")> {
    if (loadingModPromise) return loadingModPromise;
    loadingModPromise = import("../crate/pkg");
    return loadingModPromise;
}
