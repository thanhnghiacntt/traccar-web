import React, { useState } from 'react';
import useReportStyles from '../common/useReportStyles';

const ParkingReport = () => {
  const classes = useReportStyles();
  const [reportType, setReportType] = useState(null);


  return (    
    <div className={classes.container}>
    </div>    
  );
};

export default ParkingReport;
