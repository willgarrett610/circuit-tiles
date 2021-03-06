/* eslint-disable @typescript-eslint/no-explicit-any */

import { gridManager } from "..";

export interface Action<T, U = void> {
    do(payload: T, reject: () => void): Promise<U | void>;
    undo(actionPayload: ActionPayload<T, U>): void;
}

export interface ActionPayload<T, U = void> {
    action: Action<T>;
    payload: T;
    prevValue: U | undefined;
}

/**
 * Manages history of actions
 */
export default class HistoryManager {
    history: ActionPayload<any, any>[][] = [];
    undoHistory: ActionPayload<any, any>[][] = [];

    interactionHistory: ActionPayload<any, any>[] = [];

    interacting: boolean = false;

    /**
     * Perform an action that's stored in the history
     *
     * @param action Action to be performed
     * @param payload Payload of the action
     * @param redo True if this is a redo
     * @param record if true, the action will be recorded
     */
    async performAction<T>(
        action: Action<T, any>,
        payload: T,
        redo = false,
        record = true
    ) {
        let isRejected = false;
        const reject = () => (isRejected = true);
        const prevValue = await action.do(payload, reject);
        if (isRejected || !record) return;
        if (this.interacting) {
            this.interactionHistory.push({ action, payload, prevValue });
        } else {
            this.history.push([{ action, payload, prevValue }]);
        }
        if (!redo) {
            this.undoHistory = [];
        }
    }

    /**
     * Begin an interaction that is stored in the history
     */
    beginInteraction() {
        this.interacting = true;
    }

    /**
     * End an interaction that is stored in the history
     *
     * @param discard is true, the interaction will be discarded
     */
    endInteraction(discard = false) {
        this.interacting = false;
        if (this.interactionHistory.length > 0 && !discard)
            this.history.push(this.interactionHistory);
        this.interactionHistory = [];
    }

    /**
     * Undo an action that's stored in the history
     */
    undo() {
        const actions = this.history.pop();
        if (actions) {
            for (let i = actions.length - 1; i >= 0; i--) {
                const action = actions[i];
                actions[i].action.undo(action);
            }
            this.undoHistory.push(actions);
        }
    }

    /**
     * Redo the last undone action
     */
    async redo() {
        const actions = this.undoHistory.pop();
        if (actions) {
            this.beginInteraction();
            for (const action of actions) {
                await this.performAction(action.action, action.payload, true);
            }
            this.endInteraction();
        }
    }

    /**
     *
     * @returns True if there is an interaction happening
     */
    isInteracting() {
        return this.interacting;
    }
}

window.addEventListener("keydown", (event) => {
    if (event.code === "KeyZ" && event.ctrlKey && !event.shiftKey) {
        gridManager.getGrid().historyManager.undo();
    } else if (
        event.ctrlKey &&
        (event.code === "KeyY" || (event.shiftKey && event.code === "KeyZ"))
    ) {
        gridManager.getGrid().historyManager.redo();
    }
});
