import { GUIComponent, GUIComponentState } from "./gui_component";

export default class ButtonGroup {
    buttons: GUIComponent[];
    selectedOverlay: PIXI.Container;
    selected: number = -1;
    onSelectionChange?(i: number): void;

    constructor(selectedOverlay: PIXI.Container) {
        this.buttons = [];
        this.selectedOverlay = selectedOverlay;
        this.selectedOverlay.zIndex = 1000;
    }

    setSelected(i: number) {
        if (this.selected != -1)
            this.buttons[i].removeChild(this.selectedOverlay);
        this.selected = i;
        this.buttons[i].addChild(this.selectedOverlay);
        this.onSelectionChange?.(i);
    }

    addButton(button: GUIComponent) {
        const i = this.buttons.length;
        button.on("click", (e: PIXI.interaction.InteractionEvent) => {
            this.setSelected(i);
            e.stopPropagation();
        });
        button.onStateChange = (state: GUIComponentState) => {
            if (this.selected == i) {
                button.removeChild(this.selectedOverlay);
                button.addChild(this.selectedOverlay);
            }
        };
        this.buttons.push(button);
        if (this.selected == -1) this.setSelected(0);
    }
}
