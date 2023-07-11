import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

export interface State extends SnackbarOrigin {
  open: boolean;
}
const styles = {
  root: {
    background: 'red'
  }
};
export default function SnackBrar({ open, vertical, horizontal, setOpen }:any) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* {buttons} */}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={handleClose}
        message="Copied To Clipboard"
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            backgroundColor: '#60A5FA'
          }
        }}
      />
    </div>
  );
}