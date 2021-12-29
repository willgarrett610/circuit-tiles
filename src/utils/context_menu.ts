import * as PIXI from "pixi.js";
import { generateRoundedRectContainer, height, width } from ".";

import { GUIComponent } from "../components/gui/component/gui_component";
import GUIWindow from "../components/gui/component/gui_window";
import config from "../config";

export const contextMenus = {
    tileSelection: {
        // rename: "Rename",
        // delete: "Delete",
        // edit: "Edit",
        // duplicate: "Duplicate",
    },
    chipSelection: {
        rename: "Rename",
        delete: "Delete",
        edit: "Edit",
        duplicate: "Duplicate",
    },
    ioTile: {
        rename: "Rename",
        recolor: "Recolor",
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
 * @param callback Callback function on click
 */
export function displayContextMenu<T extends keyof typeof contextMenus>(
    x: number,
    y: number,
    menuName: T,
    callback: (name: keyof typeof contextMenus[T]) => void
) {
    const menu = contextMenus[menuName];

    const overlay = new GUIWindow(0, 0, width(), height(), 0x000000);
    overlay.backgroundRect.alpha = 0;

    x = Math.min(x, width() - config.contextMenuWidth);
    y = Math.min(
        y,
        height() - Object.keys(menu).length * config.contextMenuItemHeight
    );

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
        const label = menu[key] as unknown as string;
        const item = new GUIComponent(
            0,
            i * config.contextMenuItemHeight,
            config.contextMenuWidth,
            config.contextMenuItemHeight
        );
        item.backgroundSprite.alpha = 0;
        item.interactive = true;
        item.onClick = () => {
            app?.stage.removeChild(overlay);
            callback(key);
        };

        item.setDefaultContainer(new PIXI.Container());

        const hoverContainer = new PIXI.Container();
        hoverContainer.addChild(
            generateRoundedRectContainer(
                2,
                2,
                item.width - 4,
                item.height - 4,
                config.colors.contextMenuHighlight,
                {
                    topLeft: 5,
                    topRight: 5,
                    botLeft: 5,
                    botRight: 5,
                }
            )
        );
        item.cursor = "pointer";

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
