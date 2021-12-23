import { GUIComponent } from "../component/gui_component";
import GUIWindow from "../component/gui_window";

export default interface Layout {
    getElementPosSize(
        i: number,
        component: GUIComponent,
        window: GUIWindow
    ): [x: number, y: number, w: number, h: number];
}
