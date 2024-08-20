import React, { useState } from 'react';
import moment from 'moment';
import { Container, Table, TableBody, TableHead, TableRow, TableCell, Button, Box, Typography, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAttributePreference, usePreference } from '../../common/util/preferences';
import {
  formatDistance, formatHours, formatVolume, formatTime,
} from '../../common/util/formatter';
import DateTimeCustom from './DateTimeCustom';
import LicensePlates from './LicensePlates';
// import Geocode from './Geocode';
// import { FormControl } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: 1500,
    paddingLeft: '0px',
    paddingRight: '0px',
    marginLeft: '0px',
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  widthTable: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  header: {
    background: blue[500],
  },
  selectIcon: {
    width: '100%',
  },
  btnPrimary: {
    background: '#006dcc',
    color: blue[50],
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      background: '#006dcc',
      color: blue[50],
    },
  },
  tableStyle: {
    width: '100%',
  },
  trStyle: {
    width: '100%',
  },
  tdStyle: {
    border: 'none',
    textAlign: 'center',
  },
  cell: {
    border: `1px solid ${theme.palette.divider}`,
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  cellHeader: {
    border: '1px solid #9F9F9F',
    textAlign: 'center',
    padding: theme.spacing(1),
    background: '#DCDCDC',
  },
  rowHover: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  headerMain: {
    backgroundColor: '#00A9A5',
    color: 'White',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '20px',
  },
}));

const VehicleSummaryReport = ({ keyTitle }) => {
  const date = new Date();
  const [toDateTime, setToDateTime] = React.useState(date.toISOString());
  date.setHours(0, 0, 0, 0);
  const [fromDateTime, setFromDateTime] = React.useState(date.toISOString());
  const [vehicle, setVehicle] = useState(null);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const distanceUnit = useAttributePreference('distanceUnit');
  const volumeUnit = useAttributePreference('volumeUnit');
  const hours12 = usePreference('twelveHourFormat');
  const list = ['order', 'startTime', 'endTime', 'startOdometer', 'endOdometer', 'driverAddress', 'duration', 'engineHours', 'spentFuel'];

  const t = useTranslation();
  const theme = useTheme();
  const classes = useStyles(theme);

  const resultsTable = (data) => (
    <Table>
      <TableHead>
        <TableRow key="0">
          {list.map((text) => (
            <TableCell align="center" className={classes.cellHeader} key={text}>
              {t(text)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow className={classes.rowHover} key={`${index + 1}`}>
            <TableCell align="center" className={classes.cell}>{index + 1}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatTime(row.startTime, 'minutes', hours12)}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatTime(row.endTime, 'minutes', hours12)}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatDistance(row.startOdometer, distanceUnit, t)}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatDistance(row.endOdometer, distanceUnit, t)}</TableCell>
            <TableCell align="center" className={classes.cell}>{row.address}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatHours(row.duration)}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatHours(row.engineHours)}</TableCell>
            <TableCell align="center" className={classes.cell}>{formatVolume(row.spentFuel, volumeUnit, t)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleSearch = () => {
    setIsLoading(true); // Bắt đầu tải
    const vehicleId = vehicle.id; // Giả sử `vehicle` lưu ID của xe được chọn
    fetch(`/api/reports/stops?type=deviceOverspeed&from=${fromDateTime}&to=${toDateTime}&deviceId=${vehicleId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'Authorization': 'Bearer your-auth-token' // nếu API yêu cầu authentication
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <Container className={classes.container}>
      {isLoading ? (
        <Box sx={{ display: 'flex', position: 'fixed', width: '70%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Table className={classes.tableStyle}>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell className={classes.headerMain}>{t(keyTitle)}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2} className={classes.tdStyle}>
                <Table className={classes.tableStyle}>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.tdStyle}>
                        <Table className={classes.tableStyle}>
                          <TableBody>
                            <TableRow>
                              <TableCell className={classes.tdStyle}>
                                <DateTimeCustom actionChange={(value) => setFromDateTime(value)} lable="reportFrom" timeDefault="00:00" />
                              </TableCell>
                              <TableCell className={classes.tdStyle}>
                                <DateTimeCustom actionChange={(value) => setToDateTime(value)} lable="reportTo" timeDefault={moment().format('HH:mm')} />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.tdStyle}>
                                <LicensePlates actionChange={(vehicle) => setVehicle(vehicle)} />
                              </TableCell>
                              <TableCell className={classes.tdStyle}>
                                <Button variant="contained" color="primary" name={t('sharedSearch')} className={classes.btnPrimary} onClick={handleSearch}>
                                  {t('sharedSearch')}
                                </Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableCell>
            </TableRow>
            {result && result.length > 0 ? (
              <TableRow>
                <TableCell>
                  {resultsTable(result)}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
                    <Box
                      component="img"
                      src="/images/s_icon_camera.png"
                      alt="No Image"
                      sx={{ marginRight: '8px' }}
                    />
                    <Typography variant="body2">{t('noData')}</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

export default VehicleSummaryReport;
