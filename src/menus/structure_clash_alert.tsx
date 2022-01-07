import { css } from "@emotion/css";
import { useRef } from "preact/hooks";
import { buildMenu, MenuComponent } from ".";

type StructureClashAlertProps = {
    onSubmit?: (ignoreFurther: boolean) => void;
    onCancel?: () => void;
};

/**
 * show a structure clash warning
 *
 * @returns promise of selection
 */
export function showStructureClashAlert() {
    return new Promise<{ continue: boolean; ignoreFurther: boolean }>(
        (resolve) => {
            const close = createStructureClashAlert({
                onSubmit: (ignoreFurther) => {
                    close();
                    resolve({ continue: true, ignoreFurther });
                },
                onCancel: () => {
                    close();
                    resolve({ continue: false, ignoreFurther: false });
                },
            });
        }
    );
}

/**
 * gets text input
 *
 * @param props
 * @returns returns function to close menu
 */
export function createStructureClashAlert(props: StructureClashAlertProps) {
    const close: () => void = buildMenu(ChipForm, {
        onCancel: () => close(),
        ...props,
    });
    return close;
}

export const ChipForm: MenuComponent<StructureClashAlertProps> = ({
    onSubmit,
    onCancel,
}) => {
    const ignoreFurtherCheckbox = useRef<HTMLInputElement>(null);

    return (
        <div
            className={css({
                pointerEvents: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "250px",
                backgroundColor: "#aaa",
                fontFamily: "Arial, Helvetica, sans-serif",
                borderRadius: "10px",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    height: "25px",
                    backgroundColor: "#888888",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                })}
            >
                Structure Clash Warning
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    flexBasis: "1em",
                    alignItems: "left",
                    padding: "0 10px 0 10px",
                    height: "100%",
                    "> *": {
                        margin: "10px 0",
                    },
                })}
            >
                <div>
                    <label>Don't show again: </label>
                    <input ref={ignoreFurtherCheckbox} type="checkbox" />
                </div>
                <div
                    class={css({
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    })}
                >
                    <button
                        class={css({
                            width: "110px",
                            height: "30px",
                            backgroundColor: "#888888",
                            border: "none",
                            borderRadius: "5px",
                            color: "#fff",
                            fontSize: "1.2em",
                            cursor: "pointer",
                        })}
                        id="chip_cancel_button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        class={css({
                            width: "110px",
                            height: "30px",
                            backgroundColor: "#04aa6d",
                            border: "none",
                            borderRadius: "5px",
                            color: "#fff",
                            fontSize: "1.2em",
                            cursor: "pointer",
                            ":disabled": {
                                backgroundColor: "#5c5c5c",
                            },
                        })}
                        id="chip_create_button"
                        onClick={() =>
                            onSubmit?.(
                                Boolean(ignoreFurtherCheckbox?.current?.checked)
                            )
                        }
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};
