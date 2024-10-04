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
  const [reportType, setReportType] = useState('vehicleRoute');

  const actionClick = (selectedReportType) => {
    setReportType(selectedReportType);
  };

  const renderReport = () => {
    switch (reportType) {
      case 'vehicleRoute':
        return <VehicleRoute keyTitle="vehicleRoute" />;
      case 'vehicleSpeed':
        return <VehicleSpeed keyTitle="vehicleSpeed" />;
      case 'stoppingReport':
        return <StoppingReport keyTitle="stoppingReport" />;
      case 'driverSummaryReport':
        return <DriverSummaryReport keyTitle="driverSummaryReport" />;
      case 'vehicleSummaryReport':
        return <VehicleSummaryReport keyTitle="vehicleSummaryReport" />;
      case 'exceedingSpeedLimit':
        return <ExceedingSpeedLimit keyTitle="exceedingSpeedLimit" />;
      case 'continuousDrivingTime':
        return <ContinuousDrivingTime keyTitle="continuousDrivingTime" />;
      case 'drivingTimeReportfortheDay':
        return <DrivingTimeReportForTheDay keyTitle="drivingTimeReportfortheDay" />;
      case 'detailSpeedViolation':
        return <DrivingTimeReportForTheDay keyTitle="detailSpeedViolation" />;
      case 'statisticsSpeedViolationByProvince':
        return <DrivingTimeReportForTheDay keyTitle="statisticsSpeedViolationByProvince" />;
      case 'detailContinuousDrivingViolation4h':
        return <DrivingTimeReportForTheDay keyTitle="detailContinuousDrivingViolation4h" />;
      case 'detailContinuousDrivingViolation10h':
        return <DrivingTimeReportForTheDay keyTitle="detailContinuousDrivingViolation10h" />;
      case 'summaryProvinceViolation':
        return <DrivingTimeReportForTheDay keyTitle="summaryProvinceViolation" />;
      case 'detailDataTransmissionViolationByTransportCompany':
        return <DrivingTimeReportForTheDay keyTitle="detailDataTransmissionViolationByTransportCompany" />;
      default:
        return <div>Select a report type from the menu.</div>;
    }
  };

  return (
    <PageLayoutReport menu={<LayoutReportMenu isGTVT clickAction={actionClick} />} breadcrumbs={['reportTitle', 'reportEvents']}>
      <div className={classes.container}>
        {renderReport()}
      </div>
    </PageLayoutReport>
  );
};

export default GTVTReport;
