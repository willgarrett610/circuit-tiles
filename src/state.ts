/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chip } from "./components/chip/chip";
import ChipGrid from "./components/chip/chip_grid";
import { TileType } from "./components/tiles/tile_types";
import ChipGridMode from "./utils/chip_grid_mode";
import { EditMode } from "./utils/edit_mode";
import { JSX } from "preact";

interface State {
    /** if the chip editor is open regardless of chip grid mode */
    chipEditor: boolean;
    /** current editing mode */
    editMode: EditMode;
    /** list of created chips */
    chips: Chip[];
    /** determines if pixi events should be enabled */
    interactive: boolean;
    chipCreation: { open: boolean; nameValue: string; colorValue: number };
    textInput: { open: boolean; title: string; name: string; value: string };
    /** used to merely to update */
    editedChip: Updater;
    /** whether the current grid is structured or not */
    isStructured: boolean;
    /** the current chip grid */
    currentChipGrid?: ChipGrid;
    /** the current chip grid mode */
    chipGridMode: ChipGridMode;
    /** the index of the selected tile */
    selectedTileIndex: number;
    /** possible selectable tiles */
    selectableTiles: TileType[];
    /** currently show pop-ups */
    openMenus: JSX.Element[];
}

export type Updater = undefined;
/** purely used as a placeholder value for updater values */
export const update: Updater = undefined;

const state: State = {
    chipEditor: false,
    editMode: 0,
    chips: [],
    interactive: true,
    chipCreation: {
        open: false,
        nameValue: "",
        colorValue: 0x993333,
    },
    textInput: {
        open: false,
        title: "",
        name: "",
        value: "",
    },
    editedChip: update,
    isStructured: true,
    currentChipGrid: undefined,
    chipGridMode: ChipGridMode.EDITING,
    selectedTileIndex: -1,
    selectableTiles: [],
    openMenus: [],
};

interface StateCallback {
    names: Array<keyof State>;
    callback: (event: StateChangeEvent) => void;
    priority: number;
}

interface StateChangeEvent {
    name: string;
    prevValue: any;
    value: any;
}

interface SpecificStateCallback<T extends keyof State> {
    name: T;
    callback: (value: State[T], prevValue: State[T] | undefined) => void;
    priority: number;
}

const callbacks: Array<StateCallback> = [];
const specificCallbacks: SpecificStateCallback<keyof State>[] = [];

/**
 * Subscribe to the changing of state variables
 *
 * @param names The names of the states to subscribe to
 * @param callback Function to be called when the state is changed
 * @param priority The priority of the callback. Higher priority callbacks are called first
 */
export function multiSubscribe(
    names: Array<keyof State>,
    callback: (event: StateChangeEvent) => void,
    priority: number = 0
) {
    callbacks.push({ names, callback, priority });
}

/**
 * Subscribe to the changing of a specific state variable
 *
 * @param name The name of the state to subscribe to
 * @param callback Function to be called when the state is changed
 * @param priority Priority of the callback. Higher priority callbacks are called first
 */
export function subscribe<T extends keyof State>(
    name: T,
    callback: (value: State[T], prevValue: State[T]) => void,
    priority = 0
) {
    specificCallbacks.push({ name, callback: callback as any, priority });
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

    const allCallbacks: Array<
        SpecificStateCallback<keyof State> | StateCallback
    > = [];

    allCallbacks.push(
        ...specificCallbacks.filter(
            (specificCallback) => specificCallback.name === name
        )
    );
    allCallbacks.push(
        ...callbacks.filter((callback) => callback.names.includes(name))
    );

    for (const callback of allCallbacks.sort(
        (a, b) => b.priority - a.priority
    )) {
        if ("name" in callback) {
            callback.callback(value, prevValue);
        } else {
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
export function setState<T extends keyof State>(newState: {
    [key in T]: State[T];
}) {
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
    callback?: (value: State[T]) => void
) {
    callback?.(state[name]);
    const value = state[name];

    const allCallbacks: Array<
        SpecificStateCallback<keyof State> | StateCallback
    > = [];

    allCallbacks.push(
        ...specificCallbacks.filter(
            (specificCallback) => specificCallback.name === name
        )
    );
    allCallbacks.push(
        ...callbacks.filter((callback) => callback.names.includes(name))
    );

    for (const callback of allCallbacks.sort(
        (a, b) => b.priority - a.priority
    )) {
        if ("name" in callback) {
            callback.callback(value, undefined);
        } else {
            callback.callback({ name, prevValue: undefined, value });
        }
    }
}

/**
 * Update callback functions for a state variable
 *
 * @param names
 */
export function publish<T extends keyof State>(...names: T[]) {
    names.forEach((name) => setStateProp(name));
}

export default state;

(window as any).stateHandler = {
    state,
    setState,
    setStateByName,
    multiSubscribe,
    subscribe,
};
