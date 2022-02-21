extern crate console_error_panic_hook;
extern crate wasm_bindgen;

use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize)]
pub struct Node {
    arr_index: usize,
    index: usize,
    tile_type: i32,
    state: bool,
    updated: bool,
    inputs: Vec<usize>,
    outputs: Vec<usize>,
}

pub struct Graph {
    nodes: Vec<Node>,
    updated: js_sys::Array,
}

trait Update {
    fn update_values(&mut self, index: usize, state: bool);
}

impl Update for Graph {
    fn update_values(&mut self, index: usize, state: bool) {
        if self.nodes[index].state != state {
            let mut node = &mut self.nodes[index];
            node.updated = true;
            self.updated.push(&JsValue::from_f64(index as f64));
            self.updated.push(&JsValue::from_bool(state));
        }
    }
}

pub fn update_tile(graph: &mut Graph, index: usize) {
    if graph.nodes[index].updated {
        return;
    }

    let mut input_state: bool = false;

    for i in &graph.nodes[index].inputs {
        if graph.nodes[*i].state {
            input_state = true;
            break;
        }
    }

    // Invert input if node is a not tile
    if graph.nodes[index].tile_type == 1 {
        input_state = !input_state;
    }

    graph.update_values(index, input_state);

    let outputs = graph.nodes[index].outputs.clone();

    //TODO Add logic for delay tile
    for i in outputs {
        if graph.nodes[i].state != graph.nodes[index].state {
            update_tile(graph, i);
        }
    }
}

/*
Type numbers:
Wire: 0
Not: 1
Diode: 2
Delay: 3
Lever: 4
Button: 5
ChipOutput: 6
ChipInput: 7
*/
#[wasm_bindgen]
pub fn compute_logic(
    nodes_data: Vec<i32>,
    update_indices: Vec<i32>,
) -> Result<js_sys::Array, JsValue> {
    console_error_panic_hook::set_once();
    use web_sys::console;

    let mut index_map: Vec<(usize, usize)> = Vec::new();
    let mut i: usize = 0;
    let mut map_index: usize = 0;

    // Find the index of each node in the nodes_data array
    while i < nodes_data.len() {
        console::log_2(&"index: ".into(), &JsValue::from(i as i32));
        index_map.push((map_index, i));

        i += (nodes_data[(i + 2) as usize] + nodes_data[(i + 3) as usize]) as usize + 4;
        map_index += 1;
    }

    let mut nodes: Vec<Node> = Vec::new();

    // Contruct nodes from node_data
    for index_pair in index_map {
        let mut node = Node {
            index: index_pair.0,
            arr_index: index_pair.1,
            tile_type: nodes_data[index_pair.0],
            state: nodes_data[index_pair.0 + 1] != 0,
            updated: false,
            inputs: Vec::new(),
            outputs: Vec::new(),
        };

        let inputs_length = nodes_data[node.arr_index + 2] as usize;
        let outputs_length = nodes_data[node.arr_index + 3] as usize;

        for i in node.arr_index + 4..inputs_length + node.arr_index + 4 {
            node.inputs.push(nodes_data[i] as usize);
        }

        for i in
            node.arr_index + inputs_length + 4..outputs_length + node.arr_index + inputs_length + 4
        {
            node.outputs.push(nodes_data[i] as usize);
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

    let mut graph: Graph = Graph {
        nodes: nodes,
        updated: js_sys::Array::new(),
    };

    for update_index in update_indices {
        update_tile(&mut graph, update_index as usize);
    }

    // console::log_2(&"index_map: ".into(), &JsValue::from("bruh"));

    Ok(graph.updated)
}
