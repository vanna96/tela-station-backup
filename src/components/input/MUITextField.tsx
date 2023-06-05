import React, { FC, useContext } from "react";
import { FormControl, InputBaseProps, InputBasePropsSizeOverrides, OutlinedInput, OutlinedInputProps, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { FiCopy } from "react-icons/fi";
import { IoFilterCircleOutline } from "react-icons/io5";
import { Interface } from "readline";
import { OverridableStringUnion } from '@mui/types';
import { ThemeContext } from "@/contexts";

interface MUITextFieldProps extends OutlinedInputProps {
    label?: string,
    readonly?: boolean,
    endIcon?: React.ReactNode,
    helperText?: string,
    onClick?: () => void,
}


function MUITextField(props: MUITextFieldProps) {
    const { theme } = React.useContext(ThemeContext);

    const onPress = () => {
        if (props.endAdornment) return;

        if (props.onClick) {
            props.onClick();
        }
    }

    return <>
        <FormControl fullWidth error={props.error}>
            <div className="flex flex-col gap-1 text-sm">
                <label htmlFor={props.label} className={`text-inherit text-[14px] xl:text-[13px] ${props.error ? 'text-red-500' : 'text-[#656565]'} `}>
                    {props.label} {props.required && <span className="text-red-500 font-bold">*</span>}
                </label>
                <div className="text-field">
                    <OutlinedInput
                        {...props}
                        label={undefined}
                        onClick={onPress}
                        autoComplete={'off'}
                        fullWidth
                        className={`w-full ${theme === 'light' ? '' : 'bg-slate-600 text-white'} text-field pr-0 ${props.disabled ? 'bg-gray-100' : ''} ${props.className ?? ''}`}
                        startAdornment={props.startAdornment ? <span className={`text-[13px] px-2 pr-4 mr-3 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-slate-600 text-white'}  overflow-hidden border-r `}>{props.startAdornment}</span> : null}
                        sx={{
                            border: '1px solod red',
                            padding: '0px 0px',
                            // '% '
                        }}
                        endAdornment={props.endAdornment ?
                            <InputAdornment position="end" className="">
                                <IconButton
                                    onClick={props.onClick}
                                >
                                    {props.endIcon ? props.endIcon : <FiCopy className="text-lg text-white" />}
                                </IconButton>
                            </InputAdornment>
                            : null
                        }
                    />
                </div>

                <span className="text-xs px-2 text-red-500 capitalize">{props.helperText}</span>
            </div>
        </FormControl>
    </>
}

export default MUITextField;