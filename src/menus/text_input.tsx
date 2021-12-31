import { css } from "@emotion/css";
import { ComponentType } from "preact";
import { useRef, useState } from "preact/hooks";
import { buildMenu } from ".";

type TextInputProps = {
    title: string;
    name: string;
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
 * @returns returns function to close pop up
 */
export function getTextInput(props: TextInputProps) {
    return buildMenu(TextInput, props);
}

export const TextInput: ComponentType<TextInputProps> = ({
    title = "",
    name = "",
    placeholder = "",
    value = "",
    verify = () => true,
    onSubmit,
    onCancel,
}: TextInputProps) => {
    const [inputValue, setInputValue] = useState(value);
    const submitButton = useRef<HTMLButtonElement>(null);

    return (
        <div
            class={css({
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
            <div class="title" id="text_input_title">
                {title}
            </div>
            <div class="content">
                <div>
                    <div class="label" id="text_input_name">
                        {name}
                    </div>
                    <input
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
                <div class="form_buttons">
                    <button
                        class="cancel_button"
                        id="text_input_cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        ref={submitButton}
                        class="create_button"
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
