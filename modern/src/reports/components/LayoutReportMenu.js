import React from 'react';
import {
  List, ListItemIcon, ListItemText, ListItem,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../common/components/LocalizationProvider';

const Item = ({
  title, icon, alt,
}) => (
  <ListItem>
    <ListItemIcon>
      <img src={icon} alt={alt ?? title} />
    </ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

const LayoutReportMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  return (
    <>
      <div style={{ width: '340px', backgroundColor: '#e0f2f1', height: '100%' }}>
        <List component="nav">
          Báo cáo TT73/2014/TT - BGTVT
          <Item
            title={t('vehicleRoute')}
            icon="/images/s_baoCaoHanhTriNh.png" />
          <Item
            title={t('vehicleSpeed')}
            icon="/images/s_icon_baoCaoQuaTocDo.png" />
          <Item
            title={t('exceedingSpeed​​Limit')}
            icon="/images/s_icon_baoCaoQuaTocDo.png" />
          <Item
            title={t('continuousDrivingTime')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png" />
          <Item
            title={t('stoppingReport')}
            icon="/images/s_icon_baoCaoDungDo.png" />
          <Item
            title={t('vehicleSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png" />
          <Item
            title={t('driverSummaryReport')}
            icon="/images/s_icon_baoCaoTongHop.png" />
          <Item
            title={t('drivingTimeReportfortheDay')}
            icon="/images/s_icon_baoCaoTGLXLT_Ngay.png" />
        </List>
      </div>
    </>
  );
};

export default LayoutReportMenu;
