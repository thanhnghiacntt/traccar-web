import { Snackbar, Alert } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../reactHelper';
import { errorsActions } from '../../store';
import getErrorMsg from './getErrorMsg';

const ErrorHandler = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.errors.errors.find(() => true));
  const previousError = usePrevious(error);
  const errorText = getErrorMsg(error);
  const previousErrorText = getErrorMsg(previousError);
  return (
    <Snackbar open={!!error}>
      <Alert
        elevation={6}
        onClose={() => dispatch(errorsActions.pop())}
        severity="error"
        variant="filled"
      >
        {errorText || previousErrorText }
      </Alert>
    </Snackbar>
  );
};

export default ErrorHandler;
