import React, { FC } from "react";
import { FormControl, InputBasePropsSizeOverrides, OutlinedInput, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiCopy } from "react-icons/fi";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Interface } from "readline";
import { OverridableStringUnion } from '@mui/types';

interface MUITextFieldProps {
    error?: boolean,
    label?: string,
    name?: string,
    size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides> | undefined;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    onClick?: () => void | undefined,
    value?: any,
    defaultValue?: any,
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    disabled?: boolean,
    startAdornment?: any,
    type?: string,
    endAdornment?: boolean,
    required?: boolean,
    placeholder?: string,
    className?: string,
}


const MUITextField: FC<MUITextFieldProps> = (
    { error, label, name, size, onChange, onClick, value, defaultValue, onBlur, disabled, startAdornment, type, endAdornment = false, required = false, placeholder, className }: MUITextFieldProps) => {
    return <>
        <FormControl fullWidth error={error}>
            <div className="flex flex-col gap-1 text-sm">
                <label htmlFor={label} className={`text-gray-500 text-[14px] xl:text-[13px] ${error ? 'text-red-700' : ''} `}>
                    {label}
                </label>
                <div className="text-field">
                    <OutlinedInput
                        // {...props}
                        size={size}
                        fullWidth
                        className={`w-full text-field pr-0 ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
                        name={name}
                        value={value ?? ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        defaultValue={defaultValue}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        startAdornment={startAdornment ? <span className="text-[13px] px-2 pr-4 mr-3 bg-gray-100 overflow-hidden border-r ">{startAdornment}</span> : null}
                        endAdornment={endAdornment ?
                            <InputAdornment position="end">
                                <IconButton
                                    // aria-label="toggle password visibility"
                                    // edge="end"
                                    onClick={onClick}
                                >
                                    <FiCopy className="text-lg" />
                                </IconButton>
                            </InputAdornment>
                            : null
                        }
                    />
                </div>
            </div>
        </FormControl>
    </>
}


// function MUITextField(props) {
//     const { error, label, name, size, onChange, onClick, value, defaultValue, onBlur, disabled, startAdornment, type } = props;

//     return <>
//         <FormControl fullWidth error={error}>
//             <div className="flex flex-col gap-1 text-sm">
//                 <label htmlFor={label} className={`text-gray-500 text-[14px] xl:text-[13px] ${error ? 'text-red-700' : ''} `}>
//                     {label}
//                 </label>
//                 <div className="text-field">
//                     <OutlinedInput
//                         // {...props}
//                         size={size ?? "small"}
//                         fullWidth
//                         className={`w-full text-field pr-0 ${disabled ? 'bg-gray-100' : ''}`}
//                         name={name}
//                         defaultValue={defaultValue}
//                         value={value}
//                         onChange={onChange}
//                         onBlur={onBlur}
//                         disabled={disabled}
//                         type={type}
//                         startAdornment={startAdornment ? <span className="text-[13px] px-2 pr-4 mr-3 bg-gray-100 overflow-hidden border-r ">{startAdornment}</span> : null}
//                         endAdornment={onClick ?
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     // aria-label="toggle password visibility"
//                                     // edge="end"
//                                     onClick={onClick}
//                                 >
//                                     <FiCopy className="text-lg" />
//                                 </IconButton>
//                             </InputAdornment>
//                             : null
//                         }
//                     />
//                 </div>
//             </div>
//         </FormControl>
//     </>
// }

export default MUITextField;