extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compute_logic(nodes: &js_sys::Array) -> Result<js_sys::Array, JsValue> {
    use web_sys::console;
    let arr = js_sys::Array::new();

    let iterator = js_sys::try_iter(&nodes)?.ok_or_else(|| "need to pass iterable JS values!")?;

    for node in iterator {
        let node = node?;
        console::log_2(&"node: ".into(), &node);
        arr.push(&node);
    }

    Ok(arr)
}
