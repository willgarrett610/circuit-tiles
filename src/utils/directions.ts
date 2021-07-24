export enum Rotation {
    NORMAL = 0,
    CLOCKWISE = 1,
    HALF_TURN = 2,
    COUNTER_CLOCKWISE = 3,
}

export enum Direction {
    UP = 0,
    RIGHT = 1,
    DOWN = 2,
    LEFT = 3,
}

export namespace Direction {
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

    export function values() {
        return [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
    }

    export function fromString(key: string) {
        for (let dir of Direction.values()) {
            if (Direction.toLower(dir) == key.toLowerCase()) return dir;
        }
        return null;
    }
}

// export function oppositeDirection
