import React, { useState } from 'react';
import useReportStyles from './common/useReportStyles';
import PageLayoutReport from '../common/components/PageLayoutReport';
import LayoutReportMenu from './components/LayoutReportMenu';

// Import report components
import VehicleRoute from './components/VehicleRoute';
import VehicleSpeed from './components/VehicleSpeed';
import StoppingReport from './components/StoppingReport';
import DriverSummaryReport from './components/DriverSummaryReport';
import VehicleSummaryReport from './components/VehicleSummaryReport';
import ExceedingSpeedLimit from './components/ExceedingSpeedLimit';
import ContinuousDrivingTime from './components/ContinuousDrivingTime';
import DrivingTimeReportForTheDay from './components/DrivingTimeReportForTheDay';

const GTVTReport = () => {
  const classes = useReportStyles();
  const [reportType, setReportType] = useState(null);

  const actionClick = (selectedReportType) => {
    setReportType(selectedReportType);
  };

  const renderReport = () => {
    switch (reportType) {
      case 'vehicleRoute':
        return <VehicleRoute />;
      case 'vehicleSpeed':
        return <VehicleSpeed />;
      case 'stoppingReport':
        return <StoppingReport />;
      case 'driverSummaryReport':
        return <DriverSummaryReport />;
      case 'vehicleSummaryReport':
        return <VehicleSummaryReport />;
      case 'exceedingSpeedLimit':
        return <ExceedingSpeedLimit />;
      case 'continuousDrivingTime':
        return <ContinuousDrivingTime />;
      case 'drivingTimeReportfortheDay':
        return <DrivingTimeReportForTheDay />;
      default:
        return <div>Select a report type from the menu.</div>;
    }
  };

  return (
    <PageLayoutReport menu={<LayoutReportMenu isGTVT={true} clickAction={actionClick} />} breadcrumbs={['reportTitle', 'reportEvents']}>
      <div className={classes.container}>
        {renderReport()}
      </div>
    </PageLayoutReport>
  );
};

export default GTVTReport;
