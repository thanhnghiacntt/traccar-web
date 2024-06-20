import React from 'react';
// import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import {
  IconButton, Tooltip, Avatar, ListItemAvatar, ListItemText, ListItemButton, Typography,
} from '@mui/material';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import Battery60Icon from '@mui/icons-material/Battery60';
import BatteryCharging60Icon from '@mui/icons-material/BatteryCharging60';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VideoCameraFront from '@mui/icons-material/VideoCameraFront';
import Battery20Icon from '@mui/icons-material/Battery20';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import ErrorIcon from '@mui/icons-material/Error';
import {
  grey, green, red,
} from '@mui/material/colors';

import moment from 'moment';
import { devicesActions } from '../store';
import {
  formatAlarm, formatBoolean, formatPercentage, formatStatus, getStatusColor, formatSpeedNoText,
} from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { mapIconKey, mapIcons } from '../map/core/preloadImages';
import { useAdministrator } from '../common/util/permissions';
import { ReactComponent as EngineIcon } from '../resources/images/data/engine.svg';
import { useAttributePreference } from '../common/util/preferences';
import CircleProgressBar from '../common/components/CircleProgressBar/CircleProgressBar';

const useStyles = makeStyles((theme) => ({
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
  iconSpeed: {
    width: '60px',
    height: '60px',
  },
  batteryText: {
    fontSize: '0.75rem',
    fontWeight: 'normal',
    lineHeight: '0.875rem',
  },
  positive: {
    color: theme.palette.colors.positive,
  },
  medium: {
    color: theme.palette.colors.medium,
  },
  negative: {
    color: theme.palette.colors.negative,
  },
  neutral: {
    color: theme.palette.colors.neutral,
  },
}));

const DeviceRow = ({ data, index, style }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();
  // const navigate = useNavigate();

  const theme = useTheme();

  const admin = useAdministrator();

  const item = data[index];
  const position = useSelector((state) => state.session.positions[item.id]);
  const speedUnit = useAttributePreference('speedUnit');
  // const swfobject = useSelector((state) => state.devices.swfobject);

  const geofences = useSelector((state) => state.geofences.items);

  const devicePrimary = useAttributePreference('devicePrimary', 'name');
  const deviceSecondary = useAttributePreference('deviceSecondary', '');
  const showLiveCameraId = useSelector((state) => state.devices.showLiveCameraId);

  const formatProperty = (key) => {
    if (key === 'geofenceIds') {
      const geofenceIds = item[key] || [];
      return geofenceIds
        .filter((id) => geofences.hasOwnProperty(id))
        .map((id) => geofences[id].name)
        .join(', ');
    }
    return (<Typography variant="subtitle2" style={{ color: theme.palette.colors.device, fontWeight: 'bold' }}>{item[key]}</Typography>);
  };

  const secondaryText = () => {
    let status;
    if (item.status === 'online' || !item.lastUpdate) {
      status = formatStatus(item.status, t);
    } else {
      status = moment(item.lastUpdate).fromNow();
    }
    return (
      <>
        {deviceSecondary && item[deviceSecondary] && `${formatProperty(deviceSecondary)} • `}
        <span className={classes[getStatusColor(item.status)]}>{status}</span>
      </>
    );
  };
  const getAvataBgColor = (status) => {
    switch (status) {
      case 'online':
        return green[500];
      case 'offline':
        return red[500];
      case 'unknown':
      default:
        return grey[500];
    }
  };
  return (
    <div style={style}>
      <ListItemButton
        key={item.id}
        disabled={!admin && item.disabled}
      >
        <ListItemAvatar onClick={() => dispatch(devicesActions.selectId(item.id))}>
          <Avatar sx={{ bgcolor: getAvataBgColor(item.status) }}>
            <img className={classes.icon} src={mapIcons[mapIconKey(item.category)]} alt="" />
          </Avatar>

        </ListItemAvatar>
        <ListItemText
          primary={formatProperty(devicePrimary)}
          primaryTypographyProps={{ noWrap: true }}
          secondary={secondaryText()}
          secondaryTypographyProps={{ noWrap: true }}
          onClick={() => dispatch(devicesActions.selectId(item.id))}
        />
        {item?.model && (
        <Tooltip title={`${t('deviceCamera')}`}>
          <IconButton
            size="small"
            onClick={() => {
              // console.log(item.id);
              // if (swfobject !== null) {
              //   swfobject.stopVideo(0);
              //   swfobject.stopVideo(1);
              //   swfobject.stopVideo(2);
              //   swfobject.stopVideo(3);
              // }
              dispatch(devicesActions.showCamera(item.id));
            }}
          >
            <CameraAltIcon
              width={20}
              height={20}
              className={classes.positive}
            />
          </IconButton>
        </Tooltip>
        )}
        {item?.imeimdvr && (
        <Tooltip title={`${t('deviceCamera')}`}>
          <IconButton
            size="small"
            onClick={() => {
              if (showLiveCameraId !== null) {
                dispatch(devicesActions.showLiveCamera(null));
              } else {
                dispatch(devicesActions.showLiveCamera(item.id));
              }
            }}
          >
            <VideoCameraFront
              width={20}
              height={20}
              className={classes.positive}
            />
          </IconButton>
        </Tooltip>
        )}
        {position && (
        <CircleProgressBar
          percentage={formatSpeedNoText(position.speed, speedUnit)}
          className={classes.iconSpeed}
          innerText={speedUnit}
        />
        )}
        {position && (
          <>
            {position.attributes.hasOwnProperty('alarm') && (
              <Tooltip title={`${t('eventAlarm')}: ${formatAlarm(position.attributes.alarm, t)}`}>
                <IconButton size="small">
                  <ErrorIcon fontSize="small" className={classes.negative} />
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('ignition') && (
              <Tooltip title={`${t('positionIgnition')}: ${formatBoolean(position.attributes.ignition, t)}`}>
                <IconButton size="small">
                  {position.attributes.ignition ? (
                    <EngineIcon width={20} height={20} className={classes.positive} />
                  ) : (
                    <EngineIcon width={20} height={20} className={classes.neutral} />
                  )}
                </IconButton>
              </Tooltip>
            )}
            {position.attributes.hasOwnProperty('batteryLevel') && (
              <Tooltip title={`${t('positionBatteryLevel')}: ${formatPercentage(position.attributes.batteryLevel)}`}>
                <IconButton size="small">
                  {position.attributes.batteryLevel > 70 ? (
                    position.attributes.charge
                      ? (<BatteryChargingFullIcon fontSize="small" className={classes.positive} />)
                      : (<BatteryFullIcon fontSize="small" className={classes.positive} />)
                  ) : position.attributes.batteryLevel > 30 ? (
                    position.attributes.charge
                      ? (<BatteryCharging60Icon fontSize="small" className={classes.medium} />)
                      : (<Battery60Icon fontSize="small" className={classes.medium} />)
                  ) : (
                    position.attributes.charge
                      ? (<BatteryCharging20Icon fontSize="small" className={classes.negative} />)
                      : (<Battery20Icon fontSize="small" className={classes.negative} />)
                  )}
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
      </ListItemButton>
    </div>
  );
};

export default DeviceRow;
