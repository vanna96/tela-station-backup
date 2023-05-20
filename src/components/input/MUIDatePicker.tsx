import React from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createMuiTheme, } from "@mui/material";
import dayjs from "dayjs";
import { ThemeContext } from "@/contexts";

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
  const { theme } = React.useContext(ThemeContext);

  const dateVal = React.useMemo(() => {
    if (value === null) return null;

    if (addOnDay) {
      const today = dayjs();
      return today.add(addOnDay, 'day');
    }

    return value;
  }, [value, addOnDay]);

  const theme1 = React.useMemo(() => createMuiTheme({
    typography: {
      allVariants: {
        color: theme === 'light' ? '' : 'white'
      },
    },
    palette: {
      background: {
        paper: theme === 'light' ? '#FFFFFF' : '#475569'
      }
    },
  }), [theme]);


  return (
    <div className={`date-picker ${error ? 'date-picker-error' : ''} `}>
      <ThemeProvider theme={theme1}>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DesktopDatePicker
            PopperProps={{
              style: {
                color: theme === 'light' ? '' : '#FFFFFF',
              }
            }}
            inputFormat="DD-MM-YYYY"
            value={dateVal}
            disabled={disabled}
            className={`${theme === 'light' ? '' : 'bg-slate-600'} ${disabled ? 'bg-gray-100' : ''}`}
            onChange={(e: any, inputVal: any) => {
              onChange(dayjs(e).format('YYYY-MM-DD'))
            }}
            renderInput={(params) => <TextField {...params} name={name} />}

          />
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}

export default MUIDatePicker;