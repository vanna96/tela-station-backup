import React, { FC, useContext } from "react";
import { FormControl, InputBasePropsSizeOverrides, OutlinedInput, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiCopy } from "react-icons/fi";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Interface } from "readline";
import { OverridableStringUnion } from '@mui/types';
import { ThemeContext } from "@/contexts";

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
    readonly?: boolean
    endIcon?: React.ReactNode
}


function MUITextField({ error, label, name, size, onChange, onClick, value, defaultValue, onBlur, disabled, startAdornment, type, endAdornment = false, required = false, placeholder, className, readonly, endIcon }: MUITextFieldProps) {

    const { theme } = React.useContext(ThemeContext);

    return <>
        <FormControl fullWidth error={error}>
            <div className="flex flex-col gap-1 text-sm">
                <label htmlFor={label} className={`text-inherit text-[14px] xl:text-[13px] ${error ? 'text-red-700' : ''} `}>
                    {label}
                </label>
                <div className="text-field">
                    <OutlinedInput
                        // {...props}
                        size={size}
                        readOnly={readonly}
                        fullWidth
                        className={`w-full ${theme === 'light' ? '' : 'bg-slate-600 text-white'} text-field pr-0 ${disabled ? 'bg-gray-100' : ''} ${className ?? ''}`}
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        disabled={disabled}
                        defaultValue={defaultValue ?? ''}
                        type={type}
                        placeholder={placeholder}
                        required={required}
                        startAdornment={startAdornment ? <span className={`text-[13px] px-2 pr-4 mr-3 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-slate-600 text-white'}  overflow-hidden border-r `}>{startAdornment}</span> : null}
                        sx={{
                            border: '1px solod red'
                        }}
                        endAdornment={endAdornment ?
                            <InputAdornment position="end" className="">
                                <IconButton
                                    // aria-label="toggle password visibility"
                                    // edge="end"
                                    onClick={onClick}
                                >
                                    {endIcon ? endIcon : <FiCopy className="text-lg text-white" />}
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

export default MUITextField;