import { css } from "@emotion/css";
import { useEffect, useRef, useState } from "preact/hooks";
import { buildMenu, MenuComponent } from ".";

type TextInputProps = {
    title: string;
    label: string;
    placeholder?: string;
    value?: string;
    verify?: (input: string) => boolean;
    onSubmit?: (input: string) => void;
    onCancel?: () => void;
};

/**
 * gets text input
 *
 * @param props
 * @param props.title
 * @param props.name
 * @param props.value
 * @param props.verify
 * @param props.onSubmit
 * @param props.onCancel
 * @returns returns function to close menu
 */
export function createTextInput(props: TextInputProps) {
    const close: () => void = buildMenu(TextInput, {
        onCancel: () => close(),
        ...props,
    });
    return close;
}

export const TextInput: MenuComponent<TextInputProps> = ({
    title = "",
    label = "",
    placeholder = "",
    value = "",
    verify = () => true,
    onSubmit,
    onCancel,
}) => {
    const [inputValue, setInputValue] = useState(value);
    const submitButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (submitButton.current)
            submitButton.current.disabled = !verify(inputValue);
    }, []);

    return (
        <div
            class={css({
                pointerEvents: "auto",
                display: "block",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -72.5,
                marginLeft: -125,
                width: 250,
                height: 145,
                backgroundColor: "#aaa",
                fontFamily: "Arial, Helvetica, sans-serif",
                borderRadius: 10,
            })}
            id="text_input_modal"
        >
            <div
                class={css({
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
                id="text_input_title"
            >
                {title}
            </div>
            <div
                class={css({
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
                        id="text_input_name"
                    >
                        {label}
                    </div>
                    <input
                        class={css({ width: "-webkit-fill-available" })}
                        type="text"
                        id="text_input"
                        name="chip_name_input"
                        placeholder={placeholder}
                        value={inputValue}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onInput={(e: any) => {
                            setInputValue(e.target.value);
                            if (submitButton.current)
                                submitButton.current.disabled = !verify(
                                    e.target.value
                                );
                        }}
                    />
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
                        id="text_input_cancel"
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
                        id="text_input_submit"
                        onClick={() => onSubmit?.(inputValue)}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};
