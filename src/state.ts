/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditMode } from "./utils/edit_mode";

const state: {
    [key: string]: any;
} = {
    editMode: EditMode.TILE,
};

interface StateCallback {
    names: Array<string>;
    callback: (event: StateChangeEvent) => void;
}

interface StateChangeEvent {
    name: string;
    prevValue: any;
    value: any;
}

const callbacks: Array<StateCallback> = [];

/**
 * Subscribe to the changing of state variables
 *
 * @param names The names of the states to subscribe to
 * @param callback Function to be called when the state is changed
 */
export function subscribe(
    names: Array<string>,
    callback: (event: StateChangeEvent) => void
) {
    callbacks.push({ names, callback });
}

/**
 * Updates the value of a state variable
 *
 * @param name Name of the state variable to change
 * @param value New value for the variable
 */
export function setStateByName<T>(name: string, value: T) {
    const prevValue = state[name];
    state[name] = value;
    for (const callback of callbacks) {
        if (callback.names.includes(name)) {
            callback.callback({ name, prevValue, value });
        }
    }
}

/**
 * Update state value
 *
 * @param newState New state values
 */
export function setState(newState: { [key: string]: any }) {
    for (const key in newState) setStateByName(key, newState[key]);
}

export default state;
