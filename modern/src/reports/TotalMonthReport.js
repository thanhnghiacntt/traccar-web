import React from 'react';
import { makeStyles } from '@mui/styles';
import LayoutReport from './components/LayoutReport';

const useStyles = makeStyles(() => ({
  totalmonthreport: {
    zIndex: 1204,
  },
}));
const TotalMonthReport = () => {
  const classes = useStyles();
  return (
    <div className={classes.totalmonthreport}>
      <LayoutReport />
    </div>
  );
};

export default TotalMonthReport;
