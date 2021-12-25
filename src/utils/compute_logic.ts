let mod: typeof import("../../crate/pkg");
import init from "../lib";

/**
 * load up computation logic
 */
async function load() {
    mod = await init();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).mod = mod;
    console.log(mod.compute_logic([1, 2, 3, 4, 5]));
}

load();
