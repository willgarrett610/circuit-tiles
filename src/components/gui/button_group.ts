import { GUIComponent } from "./gui_component";

export default class ButtonGroup {

    buttons: GUIComponent[];
    selectedOverlay: PIXI.Container;
    selected: number = -1;
    onSelectionChange?(i: number): void;

    constructor(selectedOverlay: PIXI.Container) {
        this.buttons = [];
        this.selectedOverlay = selectedOverlay;
        this.selectedOverlay.zIndex = 200;
    }

    setSelected(i: number) {
        if (this.selected != -1) this.buttons[i].removeChild(this.selectedOverlay);
        this.selected = i;
        this.buttons[i].addChild(this.selectedOverlay);
        this.onSelectionChange?.(i);
    }

    addButton(button: GUIComponent) {
        let i = this.buttons.length;
        button.on("click", (e: PIXI.interaction.InteractionEvent) => {
            this.setSelected(i);
            e.stopPropagation();
        });
        this.buttons.push(button);
        if (this.selected == -1) this.setSelected(0);
    }

}