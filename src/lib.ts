// import("../pkg/index.js")
//     .then((m) => m.add(3, 3))
//     .then((x) => console.log(x))
//     .catch(console.error);

// function start(mod: typeof import("../pkg")) {
//     console.log("All modules loaded");
//     console.log(mod.add(3, 3));
//     // mod.add(3, 3).then((x: any) => console.log(x));
// }

/**
 * init wasm
 *
 * @returns wasm module
 */
export default async function init() {
    const mod = await import("../crate/pkg");
    return mod;
}
