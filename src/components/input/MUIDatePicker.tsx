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
  onChange: (value: string) => void
}

const MUIDatePicker: React.FC<MUIDatePickerProps> = (props: MUIDatePickerProps) => {
  const { error, value, name, onChange } = props;

  return (
    <div className={`date-picker ${error ? 'date-picker-error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DesktopDatePicker
          inputFormat="DD-MM-YYYY"
          value={value}
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