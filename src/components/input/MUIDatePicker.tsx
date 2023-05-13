import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";

interface MUIDatePickerProps {
  error?: boolean,
  value?: any,
  name?: string | undefined,
  onChange: (value: string) => void,
  disabled?: boolean,
  addOnDay?: number;
}

const MUIDatePicker: React.FC<MUIDatePickerProps> = (props: MUIDatePickerProps) => {
  const { error, value, name, onChange, disabled, addOnDay } = props;


  const dateVal = React.useMemo(() => {
    if (value === null) return null;

    if (addOnDay) {
      const today = dayjs();
      return today.add(addOnDay, 'day');
    }

    return value;
  }, [value, addOnDay])

  return (
    <div className={`date-picker ${error ? 'date-picker-error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DesktopDatePicker
          inputFormat="DD-MM-YYYY"
          value={dateVal}
          disabled={disabled}
          className={disabled ? 'bg-gray-100' : ''}
          onChange={(e: any, inputVal: any) => {
            onChange(dayjs(e).format('YYYY-MM-DD'))
          }}
          renderInput={(params) => <TextField {...params} name={name} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default MUIDatePicker;