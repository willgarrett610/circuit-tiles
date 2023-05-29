import { css } from "@emotion/css";
import { useRef, useState } from "preact/hooks";
import { buildMenu, MenuComponent } from ".";

type OutputHueProps = {
    title?: string;
    hue?: number;
    onSubmit?: (input: { hue: number }) => void;
    onCancel?: () => void;
};

/**
 * gets output hue input
 *
 * @param props
 * @returns returns function to close menu
 */
export function createOutputHueForm(props: OutputHueProps) {
    const close: () => void = buildMenu(OutputHueForm, {
        onCancel: () => close(),
        ...props,
    });
    return close;
}

export const OutputHueForm: MenuComponent<OutputHueProps> = ({ title, hue = 0, onCancel, onSubmit }) => {
    const [hueInputValue, setHueInputValue] = useState(hue);

    const submitButton = useRef<HTMLButtonElement>(null);

    return (
        <div
            className={css({
                pointerEvents: "auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-150px",
                marginLeft: "-125px",
                width: "250px",
                height: "239px",
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
                {title}
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
                    <div
                        class={css({
                            display: "block",
                            width: "100%",
                            fontSize: "1.2em",
                            height: "1em",
                            marginBottom: "10px",
                            flexDirection: "column",
                            justifyContent: "center",
                        })}
                    >
                        Chip color:
                    </div>
                    <input
                        class={css({
                            background: `linear-gradient(
                            0.25turn,
                            hsl(0, 50%, 40%),
                            hsl(45, 50%, 40%),
                            hsl(90, 50%, 40%),
                            hsl(135, 50%, 40%),
                            hsl(180, 50%, 40%),
                            hsl(225, 50%, 40%),
                            hsl(270, 50%, 40%),
                            hsl(315, 50%, 40%),
                            hsl(360, 50%, 40%)
                        )`,
                            WebkitAppearance: "none",
                            width: "100%",
                            height: "10px",
                            borderRadius: "5px",
                            // background: "#d3d3d3",
                            outline: "none",
                            opacity: 0.7,
                            WebkitTransition: "0.2s",
                            transition: "opacity 0.2s",
                            "::-webkit-slider-thumb": {
                                WebkitAppearance: "none",
                                appearance: "none",
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: "#434343",
                                cursor: "pointer",
                            },
                            "::-moz-range-thumb": {
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                background: "#04aa6d",
                                cursor: "pointer",
                            },
                        })}
                        type="range"
                        id="chip_hue_input"
                        name="chip_hue_input"
                        value={hueInputValue}
                        min="0"
                        max="360"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onInput={(e: any) => setHueInputValue(+e.target.value)}
                    />
                </div>
                <div
                    class={css({
                        width: "100%",
                        height: "80px",
                        backgroundColor: `hsl(${hueInputValue}, 50%, 50%)`,
                        borderRadius: "10px",
                    })}
                    id="chip_color_prev"
                />
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
                        ref={submitButton}
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
                            onSubmit?.({
                                hue: hueInputValue,
                            })
                        }
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
