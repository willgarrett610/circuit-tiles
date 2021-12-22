/**
 * configuration for the application
 */
const config = {
    colors: {
        background: 0x333333,
        highlightTile: 0xcccccc,
        highlightTool: 0x333333,
        selectedTool: 0x151515,
        tileBackground: 0x666666,
        selectedTileBtn: 0x00cc00,
        activeTileColor: 0xd9514c,
        inactiveTileColor: 0x420f0d,
        menuColor: 0xaaaaaa,
        activeOutputColor: 0x37b514,
        inactiveOutputColor: 0x174709,
        activeInputColor: 0x6e22d4,
        inactiveInputColor: 0x1c0738,
    },
    zoomCoeff: 1.15,
    lineColor: 0x222222,
    lineWidth: 2,
    guiMargin: 20,
    tileSelector: {
        tilePerColumn: 2,
        margin: 10,
        selectedWidth: 4,
        textSize: 13,
    },
    menubarSize: 35,
    selectorWidth: 150,
};

export default config;
