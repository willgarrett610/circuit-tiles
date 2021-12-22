/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";

const textures: any = {};

const textureFiles = [
    ["eraser", "/assets/sprites/eraser1.png"],
    ["tiles", "/assets/sprites/tiles.png"],
    ["chips", "/assets/sprites/chips.png"],
    ["pan", "/assets/sprites/pan.png"],
];

const loadSprites = () => {
    const loader = PIXI.Loader.shared;

    for (const texture of textureFiles) {
        loader.add(texture[0], texture[1]);
    }

    const prom: Promise<boolean> = new Promise<boolean>((resolve) => {
        loader.load((loader, resources) => {
            let success = true;
            for (const texture of textureFiles) {
                const res = resources[texture[0]];
                if (res) {
                    textures[texture[0]] = res.texture;
                } else {
                    success = false;
                }
            }
            resolve(success);
        });
    });

    return prom;
};

const getSprite = (key: string): PIXI.Sprite => {
    return new PIXI.Sprite(textures[key]);
};

export { getSprite, loadSprites };
