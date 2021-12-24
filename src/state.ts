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
    chips: [
        new Chip("Test", 0x9911ee),
        new Chip("Test", 0xff0000),
        new Chip("Test", 0x00ff00),
    ],
    interactive: true,
    chipCreation: {
        open: false,
        nameValue: "",
        colorValue: 0x993333,
    },
};

interface StateCallback {
    names: Array<keyof State>;
    callback: (event: StateChangeEvent) => void;
}

// interface StateSpecificCallback<T extends keyof State> {
//     name: T;
//     callback: (event: StateChangeEvent) => void;
// }

// type StateSubset<T extends keyof State> = {
//     [key in T]: State[T];
// };

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
    names: Array<keyof State>,
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
}

setStateProp("chips", (chips) => chips.push(new Chip("Test", 0x9911ee)));

export default state;

(window as any).stateHandler = { state, setState, setStateByName, subscribe };
