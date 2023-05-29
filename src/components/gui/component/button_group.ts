import { GUIComponent } from "./gui_component";

/** button group */
export default class ButtonGroup {
    buttons: GUIComponent[];
    selectedOverlay: PIXI.Container;
    selected: number = -1;
    onSelectionChange?(i: number): void;

    /**
     * construct button group
     *
     * @param selectedOverlay pixi container
     */
    constructor(selectedOverlay: PIXI.Container) {
        this.buttons = [];
        this.selectedOverlay = selectedOverlay;
        this.selectedOverlay.zIndex = 1000;
    }

    /**
     * set selected button
     *
     * @param i index of button
     */
    setSelected(i: number) {
        if (this.selected !== -1) this.buttons[i].removeChild(this.selectedOverlay);
        this.selected = i;
        this.buttons[i].addChild(this.selectedOverlay);
        this.onSelectionChange?.(i);
    }

    /**
     * adds button to group
     *
     * @param button button to add
     */
    addButton(button: GUIComponent) {
        const i = this.buttons.length;
        button.on("click", (e: PIXI.interaction.InteractionEvent) => {
            this.setSelected(i);
            e.stopPropagation();
        });
        button.onStateChange = () => {
            if (this.selected === i) {
                button.removeChild(this.selectedOverlay);
                button.addChild(this.selectedOverlay);
            }
        };
        this.buttons.push(button);
        if (this.selected === -1) this.setSelected(0);
    }
}
