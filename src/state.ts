/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chip } from "./components/chip/chip";
import { EditMode } from "./utils/edit_mode";

interface State {
    chipEditor: boolean;
    editMode: EditMode;
    chips: Chip[];
    interactive: boolean;
    chipCreation: { open: boolean; nameValue: string; colorValue: number };
    editingChip: Chip | undefined;
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
    editingChip: undefined,
};

interface StateCallback {
    names: Array<keyof State>;
    callback: (event: StateChangeEvent) => void;
}

interface StateChangeEvent {
    name: string;
    prevValue: any;
    value: any;
}

interface SpecificStateCallback<T extends keyof State> {
    name: T;
    callback: (value: State[T], prevValue: State[T] | undefined) => void;
}

const callbacks: Array<StateCallback> = [];
const specificCallbacks: SpecificStateCallback<keyof State>[] = [];

/**
 * Subscribe to the changing of state variables
 *
 * @param names The names of the states to subscribe to
 * @param callback Function to be called when the state is changed
 */
export function multiSubscribe(
    names: Array<keyof State>,
    callback: (event: StateChangeEvent) => void
) {
    callbacks.push({ names, callback });
}

/**
 * Subscribe to the changing of a specific state variable
 *
 * @param name The name of the state to subscribe to
 * @param callback Function to be called when the state is changed
 */
export function subscribe<T extends keyof State>(
    name: T,
    callback: (value: State[T], prevValue: State[T]) => void
) {
    specificCallbacks.push({ name, callback: callback as any });
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

    for (const callback of specificCallbacks) {
        if (callback.name === name) {
            callback.callback(value, prevValue);
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

/**
 * Set state props
 *
 * @param name
 * @param callback
 */
export function setStateProp<T extends keyof State>(
    name: T,
    callback: (value: State[T]) => void
) {
    callback(state[name]);
    const value = state[name];
    for (const callback of callbacks) {
        if (callback.names.includes(name)) {
            callback.callback({ name, prevValue: undefined, value });
        }
    }

    for (const callback of specificCallbacks) {
        if (callback.name === name) {
            callback.callback(value, undefined);
        }
    }
}

export default state;

(window as any).stateHandler = {
    state,
    setState,
    setStateByName,
    multiSubscribe,
    subscribe,
};
