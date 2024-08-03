import React, { useState } from 'react';
import PageLayoutReport from '../common/components/PageLayoutReport';
import LayoutReportMenu from './components/LayoutReportMenu';
import useReportStyles from './common/useReportStyles';

const renderReport = () => {
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
        {renderReport()}
      </div>
    </PageLayoutReport>
  );
};

export default BusinessReport;
