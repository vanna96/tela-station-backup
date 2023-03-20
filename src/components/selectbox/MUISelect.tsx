import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormControl } from "@mui/material";
import { OutlinedInput, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from '@mui/material/CircularProgress';
import { SelectInputProps } from "@mui/material/Select/SelectInput";


interface MUISelectProps<T = unknown> {
  error?: boolean,
  items: any[],
  disabled?: boolean,
  loading?: boolean,
  value?: any,
  defaultValue?: any,
  className?: string,
  aliasvalue?: string | undefined,
  aliaslabel?: string | undefined,
  onChange?: SelectInputProps<T>['onChange'],
  name?: string | undefined
}



const MUISelect: React.FC<MUISelectProps> = ({ error, items, disabled, loading, value, defaultValue, className, aliasvalue, aliaslabel, onChange, name }: MUISelectProps) => {
  if (loading)
    return <div className="text-field">
      <OutlinedInput
        fullWidth
        className={`w-full text-field pr-2 ${disabled ? 'bg-gray-100' : ''}`}
        endAdornment={
          <InputAdornment position="start">
            <CircularProgress
              size={14}
              thickness={4}
              value={100}
            />
          </InputAdornment>
        }
      />
    </div>;

  return (
    <FormControl error={error} fullWidth>
      <div className="w-full mui-select">
        <Select
          value={value ?? ''}
          defaultValue={defaultValue ?? ''}
          className={`w-full ${className}`}
          name={name}
          onChange={onChange}
        >
          {items ? (
            items?.map((e) => {
              return (
                <MenuItem
                  key={
                    e?.value ??
                    e?.[aliasvalue ?? ''] + "_" + e?.label ??
                    e?.[aliaslabel ?? '']
                  }
                  value={e?.value ?? e?.[aliasvalue ?? '']}
                >
                  {e?.label ?? e?.[aliaslabel ?? '']}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="">No Item</MenuItem>
          )}
        </Select>
      </div>
    </FormControl>
  );
}

export default MUISelect;
