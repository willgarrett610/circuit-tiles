/**
 * Rotation Enum
 */
export enum Rotation {
    NORMAL = 0,
    CLOCKWISE = 1,
    HALF_TURN = 2,
    COUNTER_CLOCKWISE = 3,
}

export const rotateClockWise = (input: Rotation): Rotation => {
    return (input + 1) % 4;
};

export const rotateCounterClockWise = (input: Rotation): Rotation => {
    return (input + 3) % 4;
};

export const rotationToString = (input: Rotation) => {
    switch (input) {
        case Rotation.NORMAL:
            return "NORMAL";
        case Rotation.CLOCKWISE:
            return "CLOCKWISE";
        case Rotation.HALF_TURN:
            return "HALF_TURN";
        case Rotation.COUNTER_CLOCKWISE:
            return "COUNTER_CLOCKWISE";
    }
};
/**
 * Direction Enum
 */
export enum Direction {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
}

export namespace Direction {
    /**
     * Gets the opposite direction of the given direction
     *
     * @param direction input direction
     * @returns opposite direction of input direction
     */
    export function getOpposite(direction: Direction) {
        switch (direction) {
            case Direction.UP:
                return Direction.DOWN;
            case Direction.RIGHT:
                return Direction.LEFT;
            case Direction.DOWN:
                return Direction.UP;
            case Direction.LEFT:
                return Direction.RIGHT;
        }
    }

    /**
     * Direction to lower
     *
     * @param direction direction to lower case
     * @returns provides direction in lower case
     */
    export function toLower(
        direction: Direction
    ): "up" | "right" | "down" | "left" {
        switch (direction) {
            case Direction.UP:
                return "up";
            case Direction.RIGHT:
                return "right";
            case Direction.DOWN:
                return "down";
            case Direction.LEFT:
                return "left";
        }
    }

    /**
     * Get offset from direction
     *
     * @param direction direction to get offset of
     * @returns offset corresponding to direction
     */
    export function getOffset(direction: Direction): [number, number] {
        switch (direction) {
            case Direction.UP:
                return [0, -1];
            case Direction.RIGHT:
                return [1, 0];
            case Direction.DOWN:
                return [0, 1];
            case Direction.LEFT:
                return [-1, 0];
        }
    }

    /**
     * Gets direction values
     *
     * @returns Direction values
     */
    export function values() {
        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    /**
     * get direction from string
     *
     * @param key direction as string
     * @returns Direction
     */
    export function fromString(key: "up" | "right" | "down" | "left") {
        switch (key) {
            case "up":
                return Direction.UP;
            case "right":
                return Direction.RIGHT;
            case "down":
                return Direction.DOWN;
            case "left":
                return Direction.LEFT;
        }
    }
}

// export function oppositeDirection
