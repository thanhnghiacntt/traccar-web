import React, { useState } from 'react';
import useReportStyles from '../common/useReportStyles';

const MonthlyRouteScheduleSummaryReport = () => {
  const classes = useReportStyles();
  const [reportType, setReportType] = useState(null);


  return (    
    <div className={classes.container}>
    </div>    
  );
};

export default MonthlyRouteScheduleSummaryReport;
