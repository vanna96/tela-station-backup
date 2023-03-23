import React, { FC } from "react";
import { FormControl, InputBasePropsSizeOverrides, OutlinedInput, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiCopy } from "react-icons/fi";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Interface } from "readline";
import { OverridableStringUnion } from '@mui/types';
import Checkbox from '@mui/material/Checkbox';

interface MUICheckBoxProps {
    labelPlacement?: string,
    checked?: string,
    defaultChecked?: boolean,
    error?: boolean,
    label?: string,
    name?: string,
    size?: OverridableStringUnion<"small" | "medium", InputBasePropsSizeOverrides> | undefined;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
    onClick?: () => void | undefined,
    value?: any,
    defaultValue?: any,
    disabled?: boolean,
}


const MUICheckBox: FC<MUICheckBoxProps> = ({ error, label, name, size, onChange, value,defaultValue, disabled, defaultChecked=true, checked='checked', labelPlacement='top'}: MUICheckBoxProps) => {
    return <>
        <FormControl fullWidth error={error}>
            <div className="flex flex-col gap-1 text-sm">
                <label htmlFor={label} className={`text-gray-500 text-[14px] xl:text-[13px] ${error ? 'text-red-700' : ''} `}>
                    {label}
                </label>
                <div className="text-field mb-2">
                    <Checkbox
                        // {...props}
                        // checked={checked}
                        defaultChecked={defaultChecked}
                        // labelPlacement={labelPlacement}
                        size={size}
                        className={`w-full text-field pr-0 ${disabled ? 'bg-gray-100' : ''}`}
                        name={name}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                      
                    />
                </div>
            </div>
        </FormControl>
    </>
}


export default MUICheckBox;