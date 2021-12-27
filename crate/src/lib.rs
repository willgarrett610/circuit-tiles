extern crate console_error_panic_hook;
extern crate wasm_bindgen;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct Node {
    arr_index: usize,
    index: usize,
    tile_type: i32,
    state: i32,
    inputs: Vec<i32>,
    outputs: Vec<i32>,
}

#[wasm_bindgen]
pub fn compute_logic(nodes_data: Vec<i32>) -> Result<js_sys::Array, JsValue> {
    console_error_panic_hook::set_once();
    use web_sys::console;
    let arr = js_sys::Array::new();

    let mut index_map: Vec<(usize, usize)> = Vec::new();
    let mut i: usize = 0;
    let mut map_index: usize = 0;
    while i < nodes_data.len() {
        console::log_2(&"index: ".into(), &JsValue::from(i as i32));
        index_map.push((map_index, i));

        i += (nodes_data[(i + 2) as usize] + nodes_data[(i + 3) as usize]) as usize + 4;
        map_index += 1;
    }

    let mut nodes: Vec<Node> = Vec::new();

    for index_pair in index_map {
        let mut node = Node {
            index: index_pair.0,
            arr_index: index_pair.1,
            tile_type: nodes_data[index_pair.0],
            state: nodes_data[index_pair.0 + 1],
            inputs: Vec::new(),
            outputs: Vec::new(),
        };

        let inputs_length = nodes_data[node.arr_index + 2] as usize;
        let outputs_length = nodes_data[node.arr_index + 3] as usize;

        for i in node.arr_index + 4..inputs_length + node.arr_index + 4 {
            node.inputs.push(nodes_data[i]);
        }

        for i in
            node.arr_index + inputs_length + 4..outputs_length + node.arr_index + inputs_length + 4
        {
            node.outputs.push(nodes_data[i]);
        }

        console::log_1(&"---------------node---------------".into());
        console::log_2(&"arr_index".into(), &JsValue::from(node.arr_index as i32));
        console::log_2(&"index".into(), &JsValue::from(node.index as i32));
        console::log_2(&"tile_type".into(), &JsValue::from(node.tile_type as i32));
        console::log_2(&"state".into(), &JsValue::from(node.state as i32));
        for i in 0..node.inputs.len() {
            console::log_2(&"inputs".into(), &JsValue::from(node.inputs[i] as i32));
        }
        for i in 0..node.outputs.len() {
            console::log_2(&"outputs".into(), &JsValue::from(node.outputs[i] as i32));
        }
        nodes.push(node);
    }
    // console::log_2(&"index_map: ".into(), &JsValue::from("bruh"));

    Ok(arr)
}
