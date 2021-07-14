var mod: typeof import("../../crate/pkg");
import init from "../lib";

async function load() {
    mod = await init();
    console.log(
        mod.compute_logic({
            "0,0": { x: 0, y: 0, data: [1, 2, 3] },
            "1,1": { x: 1, y: 1, data: [1, 2, 3] },
            "2,2": { x: 2, y: 2, data: [1, 2, 3] },
            "3,2": { x: 3, y: 2, data: [1, 2, 3] },
        })
    );
}

load();
