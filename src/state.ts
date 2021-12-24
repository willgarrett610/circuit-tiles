/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chip } from "./components/chip/chip";
import { EditMode } from "./utils/edit_mode";

interface State {
    chipEditor: boolean;
    editMode: EditMode;
    chips: Chip[];
    interactive: boolean;
    chipCreation: { open: boolean; nameValue: string; colorValue: number };
}

const state: State = {
    chipEditor: false,
    editMode: EditMode.TILE,
    chips: [],
    interactive: true,
    chipCreation: {
        open: false,
        nameValue: "",
        colorValue: 0x993333,
    },
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
export function setStateByName<T extends keyof State>(
    name: T,
    value: State[T]
) {
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
 * @param newState.T
 */
export function setState<T extends keyof State>(
    newState: {
        [key in T]: State[T];
    }
) {
    for (const key in newState)
        setStateByName(key as T, (newState as any)[key as T]);
}

export default state;

(window as any).stateHandler = { state, setState, setStateByName, subscribe };
