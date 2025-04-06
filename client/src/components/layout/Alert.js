import React from 'react';
import { useSelector } from 'react-redux';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <>
      {alerts.map((alert) => (
        <Snackbar
          key={alert.id}
          open={true}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MuiAlert
            severity={alert.alertType}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {alert.msg}
          </MuiAlert>
        </Snackbar>
      ))}
    </>
  );
};

export default Alert; 