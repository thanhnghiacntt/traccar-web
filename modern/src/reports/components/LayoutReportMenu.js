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
  itemIcon: {
    cursor: 'default',
    textDecoration: 'none',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
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

const Item = ({ title, icon, classes }) => (
  <ListItem style={{ cursor: 'point' }}>
    <ListItemIcon>
      <img src={icon} alt={title} className={classes.itemIcon} style={{ width: 24 }} />
    </ListItemIcon>
    <ListItemText primary={title} className={classes.itemIcon} />
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
  const [isEngineReport, setIsEngineReport] = useState(true);
  const [isSystemReport, setIsSystemReport] = useState(true);

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

  const handleSystemReport = () => {
    setIsSystemReport(!isSystemReport);
  };

  const handleEngineReport = () => {
    setIsEngineReport(!isEngineReport);
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
              title={t('summaryReportActivities')}
              icon="/images/s_icon_baoCaoTongHop.png"
              classes={classes}
            />
            <Item
              title={t('detailedActivityReport')}
              icon="/images/s_icon_baoCaoChiTiet.png"
              classes={classes}
            />
            <Item
              title={t('accumulatedKmSummaryReport')}
              icon="/images/s_icon_baoCaoTongHop.png"
              classes={classes}
            />
            <Item
              title={t('businessSpeedingReport')}
              icon="/images/report_summary.png"
              classes={classes}
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
              title={t('parkingReport')}
              icon="/images/s_icon_baoCaoDungDo.png"
              classes={classes}
            />
            <Item
              title={t('stationEntryExitReport')}
              icon="/images/s_icon_baoCaoRaVaoTram.png"
              classes={classes}
            />
            <Item
              title={t('airConditionerReport')}
              icon="/images/s_icon_baoCaoBatDieuHoa.png"
              classes={classes}
            />
            <Item
              title={t('reportVehiclePassingTollPoint')}
              icon="/images/s_icon_baoCaoXeQuaDiemThuPhi.png"
              classes={classes}
            />
            <Item
              title={t('roadTollCollectionTollReportStage')}
              icon="/images/config-icon.png"
              classes={classes}
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
              classes={classes}
            />
            <Item
              title={t('routeScheduleReport')}
              icon="/images/s_icon_baoCaoLichTrinhTuyen.png"
              classes={classes}
            />
            <Item
              title={t('routeScheduleSummaryReport')}
              icon="/images/s_icon_baoCaoTHLichTrinhTuyen.png"
              classes={classes}
            />
            <Item
              title={t('monthlyRouteScheduleSummaryReport')}
              icon="/images/s_icon_baoCaoTHLichTrinhTuyen.png"
              classes={classes}
            />
          </List>
        </OneReport>
        <OneReport
          handle={handleEngineReport}
          open={isEngineReport}
          title={t('engineReport')}
          classes={classes}>
          <List component="div" disablePadding>
            <Item
              title={t('engineReport')}
              icon="/images/default_car.png"
              classes={classes}
            />
            <Item
              title={t('engineStatusReport')}
              icon="/images/default_car.png"
              classes={classes}
            />
          </List>
        </OneReport>
        <OneReport
          handle={handleSystemReport}
          open={isSystemReport}
          title={t('systemReport')}
          classes={classes}>
          <List component="div" disablePadding>
            <Item
              title={t('pulseErrorReport')}
              icon="/images/bc_LoiXung.png"
              classes={classes}
            />
            <Item
              title={t('reportLostSignal')}
              icon="/images/s_icon_baoCaoMatGPS.png"
              classes={classes}
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
            classes={classes}
          />
          <Item
            title={t('vehicleSpeed')}
            icon="/images/s_icon_baoCaoQuaTocDo.png"
            classes={classes}
          />
          <Item
            title={t('exceedingSpeed​​Limit')}
            icon="/images/s_icon_baoCaoQuaTocDo.png"
            classes={classes}
          />
          <Item
            title={t('continuousDrivingTime')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png"
            classes={classes}
          />
          <Item
            title={t('stoppingReport')}
            icon="/images/s_icon_baoCaoDungDo.png"
            classes={classes}
          />
          <Item
            title={t('vehicleSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png"
            classes={classes}
          />
          <Item
            title={t('driverSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png"
            classes={classes}
          />
          <Item
            title={t('drivingTimeReportfortheDay')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png"
            classes={classes}
          />
        </List>
      </OneReport>
    </div>
  );
};

export default LayoutReportMenu;
