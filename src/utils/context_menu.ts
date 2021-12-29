import * as PIXI from "pixi.js";

import { GUIComponent } from "../components/gui/component/gui_component";
import GUIWindow from "../components/gui/component/gui_window";
import config from "../config";

export const contextMenus = {
    chip: {
        rename: "Rename",
        delete: "Delete",
        edit: "Edit",
        duplicate: "Duplicate",
    },
};

let app: PIXI.Application | undefined;

/**
 * Initilize the context menu
 *
 * @param app_ Pixi Application
 */
export function initContextMenu(app_: PIXI.Application) {
    app = app_;
}

/**
 * Display a context menu
 *
 * @param x X position
 * @param y Y position
 * @param menuName Menu name
 */
export function displayContextMenu(
    x: number,
    y: number,
    menuName: keyof typeof contextMenus
) {
    console.log("display");
    const menu = contextMenus[menuName];
    if (menu) {
        console.log("menu");
        const contextMenu = new GUIWindow(
            x,
            y,
            config.contextMenuWidth,
            Object.keys(menu).length * config.contextMenuItemHeight,
            config.colors.contextMenu
        );

        let i = 0;
        for (const k in menu) {
            const key = k as keyof typeof menu;
            const label = menu[key];
            const item = new GUIComponent(
                0,
                i * config.contextMenuItemHeight,
                config.contextMenuWidth,
                config.contextMenuItemHeight,
                config.colors.contextMenu
            );
            const itemText = new PIXI.Text(label, {
                fontFamily: "Arial",
                fontSize: 12,
                fill: 0xffffff,
            });

            item.addChild(itemText);

            itemText.x = item.width / 2 - itemText.width / 2;
            itemText.y = item.height / 2 - itemText.height / 2;

            contextMenu.addChild(item);

            i++;
        }

        console.log({ app });

        app?.stage.addChild(contextMenu);
    }
}
