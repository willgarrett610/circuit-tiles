import { css } from "@emotion/css";
import { buildPopUp, MenuComponent } from ".";

type AlertProps = {
    titleText?: string;
    alertText?: string;
    buttonText?: string;
    onSubmit?: () => void;
    onCancel?: () => void;
};

/**
 * show a structure clash warning
 *
 * @param alertText
 * @param buttonText
 * @param titleText
 * @returns promise of selection
 */
export function showAlert(
    titleText?: string,
    alertText?: string,
    buttonText?: string
) {
    return new Promise<boolean>((resolve) => {
        const close = createAlert({
            alertText,
            buttonText,
            titleText,
            onSubmit: () => {
                close();
                resolve(true);
            },
            onCancel: () => {
                close();
                resolve(false);
            },
        });
    });
}

/**
 * gets text input
 *
 * @param props
 * @returns returns function to close menu
 */
export function createAlert(props: AlertProps) {
    const close: () => void = buildPopUp(ChipForm, {
        onCancel: () => close(),
        ...props,
    });
    return close;
}

export const ChipForm: MenuComponent<AlertProps> = ({
    titleText,
    alertText,
    buttonText,
    onSubmit,
}) => (
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
            {titleText ?? "Alert"}
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
            <div>{alertText ?? "Warning"}</div>
            <div
                class={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                })}
            >
                <button
                    class={css({
                        // width: "110px",
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
                    id="alert_button"
                    onClick={() => onSubmit?.()}
                >
                    {buttonText ?? "Acknowledge"}
                </button>
            </div>
        </div>
    </div>
);
