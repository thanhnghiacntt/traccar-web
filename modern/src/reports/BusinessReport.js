import React, { useState } from 'react';
import PageLayoutReport from '../common/components/PageLayoutReport';
import LayoutReportMenu from './components/LayoutReportMenu';
import useReportStyles from './common/useReportStyles';

// Import report components
import EngineReport from './components/EngineReport';
import ParkingReport from './components/ParkingReport';
import JourneyReport from './components/JourneyReport';
import PulseErrorReport from './components/PulseErrorReport';
import ReportLostSignal from './components/ReportLostSignal';
import EngineStatusReport from './components/EngineStatusReport';
import RouteScheduleReport from './components/RouteScheduleReport';
import AirConditionerReport from './components/AirConditionerReport';
import DetailedActivityReport from './components/DetailedActivityReport';
import BusinessSpeedingReport from './components/BusinessSpeedingReport';
import StationEntryExitReport from './components/StationEntryExitReport';
import SummaryReportActivities from './components/SummaryReportActivities';
import AccumulatedKmSummaryReport from './components/AccumulatedKmSummaryReport';
import RouteScheduleSummaryReport from './components/RouteScheduleSummaryReport';
import ReportVehiclePassingTollPoint from './components/ReportVehiclePassingTollPoint';
import RoadTollCollectionTollReportStage from './components/RoadTollCollectionTollReportStage';
import MonthlyRouteScheduleSummaryReport from './components/MonthlyRouteScheduleSummaryReport';

const renderReport = (reportType) => {
  switch (reportType) {
    case 'engineReport':
      return <EngineReport />;
    case 'parkingReport':
      return <ParkingReport />;
    case 'journeyReport':
      return <JourneyReport />;
    case 'pulseErrorReport':
      return <PulseErrorReport />;
    case 'reportLostSignal':
      return <ReportLostSignal />;
    case 'engineStatusReport':
      return <EngineStatusReport />;
    case 'routeScheduleReport':
      return <RouteScheduleReport />;
    case 'airConditionerReport':
      return <AirConditionerReport />;
    case 'detailedActivityReport':
      return <DetailedActivityReport />;
    case 'businessSpeedingReport':
      return <BusinessSpeedingReport />;
    case 'stationEntryExitReport':
      return <StationEntryExitReport />;
    case 'summaryReportActivities':
      return <SummaryReportActivities />;
    case 'accumulatedKmSummaryReport':
      return <AccumulatedKmSummaryReport />;
    case 'routeScheduleSummaryReport':
      return <RouteScheduleSummaryReport />;
    case 'reportVehiclePassingTollPoint':
      return <ReportVehiclePassingTollPoint />;
    case 'roadTollCollectionTollReportStage':
      return <RoadTollCollectionTollReportStage />;
    case 'monthlyRouteScheduleSummaryReport':
      return <MonthlyRouteScheduleSummaryReport />;
    default:
      return <div>Select a report type from the menu</div>;
  }
};

const BusinessReport = () => {
  const classes = useReportStyles();
  const [reportType, setReportType] = useState(null);

  const actionClick = (selectedReportType) => {
    setReportType(selectedReportType);
  };

  return (
    <PageLayoutReport menu={<LayoutReportMenu isGTVT={false} clickAction={(e) => actionClick(e)} />} breadcrumbs={['reportTitle', 'reportEvents']}>
      <div className={classes.container}>
        {renderReport(reportType)}
      </div>
    </PageLayoutReport>
  );
};

export default BusinessReport;
