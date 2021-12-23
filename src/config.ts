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
        activeTile: 0xd9514c,
        inactiveTile: 0x420f0d,
        menu: 0xaaaaaa,
        menuHeader: 0x888888,
        activeOutput: 0x37b514,
        inactiveOutput: 0x174709,
        activeInput: 0x6e22d4,
        inactiveInput: 0x1c0738,
        textFieldBackground: 0xcccccc,
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
    formPromt: {
        headerFontSize: 15,
        headerHeight: 25,
    },
    chipCreationForm: {
        width: 250,
        height: 300,
    },
};

export default config;
