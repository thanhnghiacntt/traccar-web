import React, { useState, useEffect } from 'react';
import './css/flowchart.css';
import { useDispatch } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Typography from '@mui/material/Typography';

import Stack from '@mui/material/Stack';
import { usePreference } from '../../common/util/preferences';

import { reportsActions } from '../../store';

import {
  formatHours, formatTime,
} from '../../common/util/formatter';
import { useTranslation } from '../../common/components/LocalizationProvider';

// import AddressValue from '../../common/components/AddressValue';

const FlowChart = ({ positions, from, to }) => {
  const dispatch = useDispatch();
  const t = useTranslation();
  const [totalstoptime, setTotalStopTime] = useState(0);
  const hours12 = usePreference('twelveHourFormat');

  const calculateTotalStopTime = (items) => {
    let total = 0;
    items.forEach((item) => {
      total += item.duration;
    });
    setTotalStopTime(total);
    // console.log(total);
  };
  useEffect(() => {
    calculateTotalStopTime(positions);
  });
  const fixedAddressLength = ((value, length) => (value.length > length ? `${value.substring(0, length - 3)}...` : value));
  return (
    <div className="content">
      <figure className="chart cf">
        <ul className="administration">
          <li className="department dep-a">
            <a style={{ fontSize: '12px', textAlign: 'left', padding: '4px', height: '100px' }}>
              <div>
                <Stack direction="row" alignItems="center" gap={1}>
                  <DateRangeIcon />
                  <Typography variant="body2" style={{ fontWeight: 500 }}>
                    {formatTime(from, 'seconds', hours12)}
                    <br />
                    {formatTime(to, 'seconds', hours12)}
                  </Typography>
                </Stack>
                <hr className="hr" />
                {t('totalStops')}
                {' '}
                {positions.length}
                <br />

                {t('totalStopTime')}
                {' '}
                {formatHours(totalstoptime)}
                {' '}

              </div>
            </a>
            <ul className="sections">
              {positions.map((position, index) => (
                <li key={position.startTime} className="section">
                  <a onClick={() => dispatch(reportsActions.selectedStopIndex(index))} href="#">
                    <span>
                      <Stack direction="row" alignItems="center" gap={0}>
                        <AssistantDirectionIcon />
                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                          {fixedAddressLength(position.address, 40)}
                        </Typography>
                      </Stack>
                      <hr className="hr" />
                      <Stack direction="row" alignItems="center" gap={1}>
                        <AccessTimeIcon />
                        <Typography variant="body2" style={{ fontWeight: 500 }}>
                          {formatHours(position.duration)}
                        </Typography>
                      </Stack>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </figure>
    </div>
  );
};
export default FlowChart;
