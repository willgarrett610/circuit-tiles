import * as PIXI from "pixi.js";
import { generateRoundedRectContainer, height, width } from ".";

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
    const menu = contextMenus[menuName];
    if (menu) {
        const overlay = new GUIWindow(0, 0, width(), height(), 0x000000);
        overlay.backgroundRect.alpha = 0;

        const contextMenu = new GUIComponent(
            x,
            y,
            config.contextMenuWidth,
            Object.keys(menu).length * config.contextMenuItemHeight
        );

        contextMenu.backgroundSprite.alpha = 0.01;
        contextMenu.setDefaultContainer(
            generateRoundedRectContainer(
                0,
                0,
                contextMenu.width,
                contextMenu.height,
                config.colors.contextMenu,
                {
                    topLeft: 7,
                    topRight: 7,
                    botLeft: 7,
                    botRight: 7,
                }
            )
        );

        let i = 0;
        for (const k in menu) {
            const key = k as keyof typeof menu;
            const label = menu[key];
            const item = new GUIComponent(
                0,
                i * config.contextMenuItemHeight,
                config.contextMenuWidth,
                config.contextMenuItemHeight
            );
            item.backgroundSprite.alpha = 0;

            item.setDefaultContainer(new PIXI.Container());

            const hoverContainer = new PIXI.Container();
            hoverContainer.addChild(
                generateRoundedRectContainer(
                    5,
                    5,
                    item.width - 10,
                    item.height - 10,
                    config.colors.contextMenuHighlight,
                    {
                        topLeft: 7,
                        topRight: 7,
                        botLeft: 7,
                        botRight: 7,
                    }
                )
            );

            item.setHoverContainer(hoverContainer);

            const getText = (value: string) => {
                const text = new PIXI.Text(value, {
                    fontFamily: "Arial",
                    fontSize: 12,
                    fill: 0xffffff,
                });

                text.x = 10;
                text.y = item.height / 2 - text.height / 2;
                return text;
            };

            const defaultText = getText(label);

            const hoverText = getText(label);

            hoverContainer.addChild(hoverText);

            item.defaultContainer?.addChild(defaultText);

            contextMenu.addChild(item);

            i++;
        }

        overlay.addChild(contextMenu);

        app?.stage.addChild(overlay);

        overlay.on("click", () => {
            app?.stage.removeChild(overlay);
        });
    }
}
