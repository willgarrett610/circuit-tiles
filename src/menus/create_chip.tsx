import { ComponentType } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

// type ChipFormProps = {
//     title?: string;
//     label?: string;
//     placeholder?: string;
//     textValue?: string;
//     hueValue?: number;
//     colorValue?: string;
//     verifyText?: (input: string) => boolean;
//     onSubmit?: (input: string) => void;
//     onCancel?: () => void;
// };

// export const ChipForm: ComponentType<ChipFormProps> = ({
//     title = "Create a chip",
//     label = "Name the chip:",
//     placeholder = "Half adder",
//     textValue = "",
//     hueValue = 0,
//     colorValue = "hsl(0, 50%, 50%)",
//     verifyText = () => true,
//     onSubmit,
//     onCancel,
// }) => {
//     const [textInputValue, setTextInputValue] = useState(textValue);
//     const [colorInputValue, setColorInputValue] = useState(colorValue);

//     const submitButton = useRef(initialValue)<HTMLButtonElement>(null);

//     useEffect(() => {
//         if (submitButton.current)
//             submitButton.current.disabled = !verifyText(inputValue);
//     }, []);

//     return (
//         <div class="chip_creation" id="chip_creation">
//             <div class="title" id="chip_creation_title">
//                 {title}
//             </div>
//             <div class="content">
//                 <div>
//                     <div class="label">{label}</div>
//                     <input
//                         type="text"
//                         id="chip_name_input"
//                         name="chip_name_input"
//                         placeholder={placeholder}
//                     />
//                 </div>
//                 <div>
//                     <div class="label">Chip color:</div>
//                     <input
//                         class="slider hue"
//                         type="range"
//                         id="chip_hue_input"
//                         name="chip_hue_input"
//                         value={hueValue}
//                         min="0"
//                         max="360"
//                     />
//                 </div>
//                 <div class="color_prev" id="chip_color_prev"></div>
//                 <div class="form_buttons">
//                     <button
//                         class="cancel_button"
//                         id="chip_cancel_button"
//                         onClick={onCancel}
//                     >
//                         Cancel
//                     </button>
//                     <button
//                         class="create_button"
//                         id="chip_create_button"
//                         onClick={() => onSubmit?.()}
//                     >
//                         Create
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };
