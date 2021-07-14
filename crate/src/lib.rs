extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub fn compute_logic(tiles: &js_sys::Object) -> Result<js_sys::Array, JsValue> {
    use web_sys::console; 
    let arr = js_sys::Array::new();

    let keys = wasm_bindgen::JsValue::from(js_sys::Object::keys(tiles));

    let iterator = js_sys::try_iter(&keys)?.ok_or_else(|| {
        "need to pass iterable JS values!"
    })?;

    for x in iterator {
        let x = x?;
        console::log_2(&"key: ".into(), &x);
        console::log_2(&"values: ".into(), &js_sys::Reflect::get(&tiles, &x)?);
        arr.push(&x);
    }

    Ok(arr)
}