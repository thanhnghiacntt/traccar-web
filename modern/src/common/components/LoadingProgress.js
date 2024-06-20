import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { LinearProgress } from '@mui/material';
import { useTranslation } from './LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  root: () => ({
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 5,
    left: '50%',
    [theme.breakpoints.up('md')]: {
      left: '50%',
      top: '50%',
    },
    [theme.breakpoints.down('md')]: {
      left: '50%',
      top: '50%',
    },
    transform: 'translateX(-50%)',
  }),
}));

const LoadingProgress = () => {
  const classes = useStyles();
  const t = useTranslation();

  return (
    <div className={classes.root}>
      {t('loading')}
      <LinearProgress color="inherit" />
    </div>
  );
};
export default LoadingProgress;
