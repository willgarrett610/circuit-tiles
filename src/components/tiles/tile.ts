import { Direction } from "../../utils/directions";

export enum TileType {
    INPUT,
    OUTPUT,
    PRIMITIVE,
}
export default interface Tile {
    label?: string;
    type: TileType;
    x: number;
    y: number;
    direction: Direction;
}
