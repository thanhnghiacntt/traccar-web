import React, { useState } from 'react';
import {
  List, ListItemIcon, ListItemText, ListItem, Collapse, ListItemButton,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { makeStyles, useTheme } from '@mui/styles';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '340px',
    backgroundColor: '#e0f2f1',
    height: '100%',
  },
  titleMenu: {
    display: 'flex',
    alignItems: 'center',
    borderTop: '1px solid #ffffff',
    background: '#00A9A5',
    color: '#FFFFFF',
    fontSize: '16px',
    fontFamily: 'Tahoma',
    fontWeight: 'bold',
    padding: theme.spacing(1),
    '&:hover': {
      background: '#00A9A5',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const OneReport = ({ handle, open, title, classes, children }) => (
  <List component="nav">
    <ListItemButton onClick={handle} className={classes.titleMenu}>
      {open ? <ExpandLess className={classes.icon} /> : <ExpandMore className={classes.icon} />}
      <ListItemText primary={title} />
    </ListItemButton>
    <Collapse in={open} timeout="auto" unmountOnExit>
      {children}
    </Collapse>
  </List>
);

const Item = ({ title, icon, alt }) => (
  <ListItem>
    <ListItemIcon>
      <img src={icon} alt={alt ?? title} style={{ width: 24 }} />
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

const LayoutReportMenu = ({ isGTVT }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const t = useTranslation();
  const [open, setOpen] = useState(true);
  const [isSynthesisReport, setIsSynthesisReport] = useState(true);
  const [isActivityReport, setIsActivityReport] = useState(true);
  const [isScheduleReport, setIsScheduleReport] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSynthesisReport = () => {
    setIsSynthesisReport(!isSynthesisReport);
  };

  const handleActivityReport = () => {
    setIsActivityReport(!isActivityReport);
  };

  const handleScheduleReport = () => {
    setIsScheduleReport(!isScheduleReport);
  };

  if (!isGTVT) {
    return (
      <div className={classes.menu}>
        <OneReport
          handle={handleSynthesisReport}
          open={isSynthesisReport}
          title={t('synthesisReport')}
          classes={classes}>
          <List component="div" disablePadding>
            <Item
              title={t('summaryReportActivitiesTeam')}
              icon="/images/s_icon_baoCaoTongHop.png"
            />
            <Item
              title={t('summaryReportActivities')}
              icon="/images/s_icon_baoCaoTongHop.png"
            />
            <Item
              title={t('detailedActivityReport')}
              icon="/images/s_icon_baoCaoChiTiet.png"
            />
            <Item
              title={t('summaryReportActivitiesSignalLoss')}
              icon="/images/s_icon_baoCaoChiTiet.png"
            />
            <Item
              title={t('appointmentReport')}
              icon="/images/s_icon_listCompanies.png"
            />
            <Item
              title={t('vehicleOperatingKmSummaryReport')}
              icon="/images/report_summary.png"
            />
          </List>
        </OneReport>
        <OneReport
          handle={handleActivityReport}
          open={isActivityReport}
          title={t('activityReport')}
          classes={classes}>
          <List component="div" disablePadding>
            <Item
              title={t('summaryReportAirConditioning')}
              icon="/images/s_icon_baoCaoBatDieuHoa.png"
            />
            <Item
              title={t('parkingReport')}
              icon="/images/s_icon_baoCaoDungDo.png"
            />
            <Item
              title={t('stationEntryExitReport')}
              icon="/images/s_icon_baoCaoRaVaoTram.png"
            />
            <Item
              title={t('businessTripReport')}
              icon="/images/s_icon_baoCaoChuyenKD.png"
            />
            <Item
              title={t('airConditionerReport')}
              icon="/images/s_icon_baoCaoBatDieuHoa.png"
            />
            <Item
              title={t('reportVehiclePassingTollPoint')}
              icon="/images/s_icon_baoCaoXeQuaDiemThuPhi.png"
            />
            <Item
              title={t('roadTollCollectionTollReportStage')}
              icon="/images/config-icon.png"
            />
            <Item
              title={t('tollPointFareReport')}
              icon="/images/s_icon_baoCaoXeQuaDiemThuPhi.png"
            />
            <Item
              title={t('monthlyActivitySummaryReport')}
              icon="/images/reports-icon.png"
            />
          </List>
        </OneReport>
        <OneReport
          handle={handleScheduleReport}
          open={isScheduleReport}
          title={t('scheduleReport')}
          classes={classes}>
          <List component="div" disablePadding>
            <Item
              title={t('journeyReport')}
              icon="/images/s_baoCaoHanhTrinh.png"
            />
            <Item
              title={t('routeScheduleReport')}
              icon="/images/s_icon_baoCaoLichTrinhTuyen.png"
            />
            <Item
              title={t('routeScheduleSummaryReport')}
              icon="/images/s_icon_baoCaoTHLichTrinhTuyen.png"
            />
            <Item
              title={t('monthlyRouteScheduleSummaryReport')}
              icon="/images/s_icon_baoCaoTHLichTrinhTuyen.png"
            />
          </List>
        </OneReport>
      </div>
    );
  }

  return (
    <div className={classes.menu}>
      <OneReport
        handle={handleClick}
        open={open}
        title={t('reportTT73GTVT')}
        classes={classes}>
        <List component="div" disablePadding>
          <Item
            title={t('vehicleRoute')}
            icon="/images/s_baoCaoHanhTriNh.png"
          />
          <Item
            title={t('vehicleSpeed')}
            icon="/images/s_icon_baoCaoQuaTocDo.png"
          />
          <Item
            title={t('exceedingSpeed​​Limit')}
            icon="/images/s_icon_baoCaoQuaTocDo.png"
          />
          <Item
            title={t('continuousDrivingTime')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png"
          />
          <Item
            title={t('stoppingReport')}
            icon="/images/s_icon_baoCaoDungDo.png"
          />
          <Item
            title={t('vehicleSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png"
          />
          <Item
            title={t('driverSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png"
          />
          <Item
            title={t('drivingTimeReportfortheDay')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png"
          />
        </List>
      </OneReport>
    </div>
  );
};

export default LayoutReportMenu;
