/* eslint-disable @typescript-eslint/no-explicit-any */
import * as PIXI from "pixi.js";

const textures: Record<string, PIXI.Texture> = {};

/**
 * gets all wire files
 *
 * @returns array of wire file names
 */
function getWireFiles() {
    const direction = ["l", "r", "t", "b"];
    const filePrefix = "./assets/sprites/wire/w_";
    const fileSuffix = ".png";
    const files: [string, string][] = [];

    // for each possible direction toggled on and off
    for (let i = 0; i < 2 ** direction.length; i++) {
        let file = filePrefix;
        let directionsText = "";
        for (let j = 0; j < direction.length; j++) {
            if (i & (1 << j)) {
                directionsText += direction[j];
            }
        }
        file += directionsText;
        file += fileSuffix;
        files.push(["w_" + directionsText, file]);
    }

    return files;
}

const textureFiles = [
    ["eraser", "./assets/sprites/eraser1.png"],
    ["tiles", "./assets/sprites/tiles.png"],
    ["chips", "./assets/sprites/chips.png"],
    ["pan", "./assets/sprites/pan.png"],
    ["add", "./assets/sprites/add.svg"],
    ["cursor", "./assets/sprites/cursor.png"],
    ["swap", "./assets/sprites/swap.png"],
    ["play", "./assets/sprites/play.svg"],
    ["pause", "./assets/sprites/pause.svg"],
    ...getWireFiles(),
];

export const loadSprites = () => {
    const loader = PIXI.Loader.shared;

    for (const [name, path] of textureFiles) {
        loader.add(name, path);
    }

    const prom: Promise<boolean> = new Promise<boolean>((resolve) => {
        loader.load((loader, resources) => {
            let success = true;
            for (const [name] of textureFiles) {
                const res = resources[name];
                if (res) {
                    textures[name] = res.texture;
                } else {
                    success = false;
                }
            }
            resolve(success);
        });
    });

    return prom;
};

export const getTexture = (key: string): PIXI.Texture => {
    return textures[key];
};

export const getSprite = (key: string): PIXI.Sprite => {
    return new PIXI.Sprite(textures[key]);
};
