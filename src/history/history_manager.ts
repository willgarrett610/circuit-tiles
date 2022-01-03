/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Action<T, U = void> {
    type: string;
    do(payload: T): U | void;
    undo(actionPayload: ActionPayload<T, U>): void;
}

export interface ActionPayload<T, U = void> {
    action: Action<T>;
    payload: T;
    prevValue: U | undefined;
}

const history: ActionPayload<any, any>[][] = [];
let undoHistory: ActionPayload<any, any>[][] = [];

let interactionHistory: ActionPayload<any, any>[] = [];

let interacting: boolean = false;

/**
 * Perform an action that's stored in the history
 *
 * @param action Action to be performed
 * @param payload Payload of the action
 * @param redo True if this is a redo
 */
export function performAction<T>(
    action: Action<T, any>,
    payload: T,
    redo: boolean = false
) {
    const prevValue = action.do(payload);
    if (interacting) {
        interactionHistory.push({ action, payload, prevValue });
    } else {
        history.push([{ action, payload, prevValue }]);
    }
    if (!redo) {
        undoHistory = [];
    }
}

/**
 * Begin an interaction that is stored in the history
 */
export function beginInteraction() {
    interacting = true;
}

/**
 * End an interaction that is stored in the history
 */
export function endInteraction() {
    interacting = false;
    if (interactionHistory.length > 0) history.push(interactionHistory);
    interactionHistory = [];
}

/**
 * Undo an action that's stored in the history
 */
export function undo() {
    const actions = history.pop();
    if (actions) {
        for (let i = actions.length - 1; i >= 0; i--) {
            const action = actions[i];
            actions[i].action.undo(action);
        }
        undoHistory.push(actions);
    }
    console.log({ history });
}

/**
 * Redo the last undone action
 */
export function redo() {
    const actions = undoHistory.pop();
    if (actions) {
        beginInteraction();
        for (const action of actions) {
            performAction(action.action, action.payload, true);
        }
        endInteraction();
    }
}

/**
 *
 * @returns True if there is an interaction happening
 */
export function isInteracting() {
    return interacting;
}

window.addEventListener("keydown", (event) => {
    if (event.code === "KeyZ" && event.ctrlKey && !event.shiftKey) {
        undo();
    } else if (
        event.ctrlKey &&
        (event.code === "KeyY" || (event.shiftKey && event.code === "KeyZ"))
    ) {
        redo();
    }
});
