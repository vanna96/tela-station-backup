import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { FormControl } from "@mui/material";

// function DatePicker(props)
// {
//   const { error, value, name } = props;

//   return (
//     <div className={`date-picker ${ error ? 'date-picker-error' : '' }`}>
//       <LocalizationProvider dateAdapter={AdapterDayjs} >
//         <DesktopDatePicker
//           inputFormat="DD/MM/YYYY"
//           value={value}
//           {...props}

//           renderInput={(params) => <TextField {...params} name={name} />}
//         />
//       </LocalizationProvider>
//     </div>
//   );
// }

interface DatePickerProps {
  error: boolean,
  value: any,
  name: string | undefined,
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const { error, value, name, } = props;

  return (
    <div className={`date-picker ${error ? 'date-picker-error' : ''}`}>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DesktopDatePicker
          inputFormat="DD/MM/YYYY"
          value={value}
          onChange={() => { }}
          renderInput={(params) => <TextField {...params} name={name} />}
        />
      </LocalizationProvider>
    </div>
  );
}

export default DatePicker;