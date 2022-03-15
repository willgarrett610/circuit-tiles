/**
 * load wasm logic module
 *
 * @param onLoad
 */
async function load(onLoad: (mod: typeof import("../../crate/pkg")) => void) {
    const mod = await import("../../crate/pkg");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).mod = mod;
    onLoad(mod);
    // console.log(mod.compute_logic(Int32Array.from([1, 2, 3, 4, 5])));
}

load((mod) => {
    console.log(mod);
});
