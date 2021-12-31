import { JSX, render, ComponentType, ComponentClass, VNode } from "preact";
import { css } from "@emotion/css";
import state, { setState, subscribe } from "../state";
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
    setState({
        openMenus: [...state.openMenus, builtComponent],
        interactive: false,
    });

    /** closes the pop up */
    function close() {
        setState({
            openMenus: state.openMenus.filter(
                (openMenu) => openMenu !== builtComponent
            ),
            interactive: true,
        });
    }

    return close;
}

/**
 * builds a function to display pop ups (menus with an overlay)
 *
 * @param PopUpComponent
 * @param props
 * @param autoClose if true, the pop up will close when the user clicks outside of it
 * @returns returns function to close menu
 */
export function buildPopUp<T extends object>(
    PopUpComponent: ComponentType<T> | ComponentClass<T, unknown>,
    props: T,
    autoClose = true
) {
    const builtComponent = (
        <Overlay onClick={() => autoClose && close()}>
            <PopUpComponent {...props} />
        </Overlay>
    );
    setState({
        openMenus: [...state.openMenus, builtComponent],
        interactive: false,
    });

    /** closes the pop up */
    function close() {
        setState({
            openMenus: state.openMenus.filter(
                (openMenu) => openMenu !== builtComponent
            ),
            interactive: true,
        });
    }

    return close;
}

/** sets up menus in dom */
export function setupMenus() {
    const attachLocation = document.getElementById("pop-ups");
    if (attachLocation) {
        render(<App />, attachLocation);
    }
}

const Overlay = ({
    children,
    onClick,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: VNode<any>;
    onClick: () => void;
}) => (
    <div
        class={css({
            pointerEvents: "auto",
            display: "block",
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.5)",
        })}
        onClick={onClick}
    >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
);

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
