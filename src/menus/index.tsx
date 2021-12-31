import { JSX, render, ComponentType, ComponentClass } from "preact";
import { css } from "@emotion/css";
import state, { setState, setStateProp, subscribe } from "../state";
import { useEffect, useState } from "preact/hooks";

/**
 * builds a function to display menus
 *
 * @param MenuComponent
 * @param props
 * @returns returns function to close menu
 */
export function buildMenu<T extends object>(
    MenuComponent: ComponentType<T> | ComponentClass<T, unknown>,
    props: T
) {
    const builtComponent = <MenuComponent {...props} />;
    setStateProp("openMenus", (openMenus) => openMenus.push(builtComponent));

    return () => {
        setState({
            openMenus: state.openMenus.filter(
                (openMenu) => openMenu !== builtComponent
            ),
        });
    };
}

/** sets up menus in dom */
export function setupMenus() {
    const attachLocation = document.getElementById("pop-ups");
    if (attachLocation) {
        render(<App />, attachLocation);
        // setTimeout(() => {
        //     const close = getTextInput({
        //         title: "test",
        //         name: "bruh",
        //         value: "moment",
        //         verify: (input) => {
        //             console.log(input);
        //             return true;
        //         },
        //         onSubmit: (input) => {
        //             console.log(input);
        //             close();
        //         },
        //     });
        // }, 1000);
    }
}

const App = () => {
    const [openMenus, setOpenMenus] = useState<JSX.Element[]>(state.openMenus);

    useEffect(() => {
        subscribe("openMenus", (openMenus) => {
            setOpenMenus([...openMenus]);
        });
    }, []);

    return (
        <div
            className={css({
                pointerEvents: "none",
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 100,
            })}
        >
            {openMenus}
        </div>
    );
};
