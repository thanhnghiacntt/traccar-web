import moment from 'moment';
import {
  altitudeFromMeters,
  altitudeUnitString,
  distanceFromMeters,
  distanceUnitString,
  speedFromKnots,
  speedUnitString,
  volumeFromLiters,
  volumeUnitString,
} from './converter';
import { prefixString } from './stringUtils';

export const formatBoolean = (value, t) => (value ? t('sharedYes') : t('sharedNo'));

export const formatNumber = (value, precision = 1) => Number(value.toFixed(precision));

export const formatPercentage = (value) => `${value}%`;

export const formatTime = (value, format, hours12) => {
  if (value) {
    const m = moment(value);
    switch (format) {
      case 'date':
        return m.format('DD-MM-YYYY');
      case 'time':
        return m.format(hours12 ? 'hh:mm:ss A' : 'HH:mm:ss');
      case 'minutes':
        return m.format(hours12 ? 'YYYY-MM-DD hh:mm A' : 'DD-MM-YYYY HH:mm');
      default:
        return m.format(hours12 ? 'YYYY-MM-DD hh:mm:ss A' : 'DD-MM-YYYY HH:mm:ss');
    }
  }
  return '';
};

export const formatStatus = (value, t) => t(prefixString('deviceStatus', value));
export const formatAlarm = (value, t) => (value ? t(prefixString('alarm', value)) : '');

export const formatCourse = (value) => {
  const courseValues = ['\u2191', '\u2197', '\u2192', '\u2198', '\u2193', '\u2199', '\u2190', '\u2196'];
  let normalizedValue = (value + 45 / 2) % 360;
  if (normalizedValue < 0) {
    normalizedValue += 360;
  }
  return courseValues[Math.floor(normalizedValue / 45)];
};
export const formatDirection = (degree, t) => {
  if (degree >= 22.5 && degree < 67.5) {
    return t('compassNE');
  } if (degree >= 67.5 && degree < 112.5) {
    return t('compassE');
  } if (degree >= 112.5 && degree < 157.5) {
    return t('compassSE');
  } if (degree >= 157.5 && degree < 202.5) {
    return t('compassS');
  } if (degree >= 202.5 && degree < 247.5) {
    return t('compassSW');
  } if (degree >= 247.5 && degree < 292.5) {
    return t('compassW');
  } if (degree >= 292.5 && degree < 337.5) {
    return t('compassNW');
  }
  return t('compassN');
};

export const formatDistance = (value, unit, t) => `${distanceFromMeters(value, unit).toFixed(2)} ${distanceUnitString(unit, t)}`;

export const formatAltitude = (value, unit, t) => `${altitudeFromMeters(value, unit).toFixed(2)} ${altitudeUnitString(unit, t)}`;

export const formatSpeed = (value, unit, t) => `${speedFromKnots(value, unit).toFixed(2)} ${speedUnitString(unit, t)}`;
export const formatSpeedNoText = (value, unit) => parseInt(speedFromKnots(value, unit).toFixed(0), 10);
export const formatVolume = (value, unit, t) => `${volumeFromLiters(value, unit).toFixed(2)} ${volumeUnitString(unit, t)}`;

export const formatHours = (value) => moment.duration(value).humanize();
export const formatMoney = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
}).format(value);

export const formatNumericHours = (value, t) => {
  const hours = Math.floor(value / 3600000);
  const minutes = Math.floor((value % 3600000) / 60000);
  return `${hours} ${t('sharedHourAbbreviation')} ${minutes} ${t('sharedMinuteAbbreviation')}`;
};

export const formatCoordinate = (key, value, unit) => {
  let hemisphere;
  let degrees;
  let minutes;
  let seconds;

  if (key === 'latitude') {
    hemisphere = value >= 0 ? 'N' : 'S';
  } else {
    hemisphere = value >= 0 ? 'E' : 'W';
  }

  switch (unit) {
    case 'ddm':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = (value - degrees) * 60;
      return `${degrees}° ${minutes.toFixed(6)}' ${hemisphere}`;
    case 'dms':
      value = Math.abs(value);
      degrees = Math.floor(value);
      minutes = Math.floor((value - degrees) * 60);
      seconds = Math.round((value - degrees - minutes / 60) * 3600);
      return `${degrees}° ${minutes}' ${seconds}" ${hemisphere}`;
    default:
      return `${value.toFixed(6)}°`;
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return 'positive';
    case 'offline':
      return 'negative';
    case 'unknown':
    default:
      return 'neutral';
  }
};

export const getBatteryStatus = (batteryLevel) => {
  if (batteryLevel >= 70) {
    return 'positive';
  }
  if (batteryLevel > 30) {
    return 'medium';
  }
  return 'negative';
};

export const formatNotificationTitle = (t, notification, includeId) => {
  let title = t(prefixString('event', notification.type));
  if (notification.type === 'alarm') {
    const alarmString = notification.attributes.alarms;
    if (alarmString) {
      const alarms = alarmString.split(',');
      if (alarms.length > 1) {
        title += ` (${alarms.length})`;
      } else {
        title += ` ${formatAlarm(alarms[0], t)}`;
      }
    }
  }
  if (includeId) {
    title += ` [${notification.id}]`;
  }
  return title;
};
