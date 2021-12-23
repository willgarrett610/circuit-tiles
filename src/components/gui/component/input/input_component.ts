import { GUIComponent } from "../gui_component";

/**
 * Generic input component
 */
export default class InputComponent<T> extends GUIComponent {
    onChange: (value: T) => void;
    value: T;

    /**
     * Constructs an input component
     *
     * @param x X coordinate
     * @param y Y coordinate
     * @param width Width
     * @param height Height
     * @param backgroundColor Background color
     * @param value Initial value
     * @param onChange On change callback
     */
    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        backgroundColor: number = 0xffffff,
        value: T,
        onChange: (value: T) => void
    ) {
        super(x, y, width, height, backgroundColor);
        this.onChange = onChange;
        this.value = value;
    }

    /**
     * Updates the value of the input component
     *
     * @param value New value
     */
    setValue(value: T) {
        this.value = value;
        this.onChange(value);
    }
}
