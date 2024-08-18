import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TextField, TableHead, TableRow, TableCell, Button, Select, MenuItem, Box, Typography, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { reportsActions } from '../../store';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAttributePreference, usePreference } from '../../common/util/preferences';
import {
  formatDistance, formatHours, formatVolume, formatTime,
} from '../../common/util/formatter';
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

const StoppingReport = ({ keyTitle }) => {
  const [fromTime, setFromTime] = React.useState('00:00');
  const [fromDate, setFromDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [toTime, setToTime] = React.useState(moment().format('HH:mm'));
  const [toDate, setToDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [vehicles, setVehicles] = useState([]); // State để lưu danh sách xe
  const [vehicle, setVehicle] = useState(vehicles.length > 0 ? vehicles[0] : null);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const distanceUnit = useAttributePreference('distanceUnit');
  const volumeUnit = useAttributePreference('volumeUnit');
  const hours12 = usePreference('twelveHourFormat');
  const list = ['order', 'startTime', 'endTime', 'startOdometer', 'endOdometer', 'driverAddress', 'duration', 'engineHours', 'spentFuel'];

  const t = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  // useEffect để gọi API và lấy danh sách xe
  useEffect(() => {
    setIsLoading(true); // Bắt đầu tải
    fetch('/api/devices')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setVehicle(data[0]);
        }
        setVehicles(data);
        setIsLoading(false); // Bắt đầu tải
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
        setIsLoading(false); // Bắt đầu tải
      });
  }, []);

  const handleFromDateTimeChange = (date, time) => {
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    dispatch(reportsActions.updateFrom(dateTime));
  };

  const handleToDateTimeChange = (date, time) => {
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    dispatch(reportsActions.updateTo(dateTime));
  };

  const changeSelect = (e) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.name === e.target.value);
    setVehicle(selectedVehicle);
  };

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
    const fromDateTime = moment(`${fromDate} ${fromTime}`, 'YYYY-MM-DD HH:mm').toISOString();
    const toDateTime = moment(`${toDate} ${toTime}`, 'YYYY-MM-DD HH:mm').toISOString();
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
                                <Table className={classes.tableStyle}>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className={classes.tdStyle} style={{ width: '90px' }}>
                                        {t('reportFrom')}
                                        :
                                      </TableCell>
                                      <TableCell className={classes.tdStyle}>
                                        <TextField
                                          type="time"
                                          value={fromTime}
                                          onChange={(e) => {
                                            setFromTime(e.target.value);
                                            handleFromDateTimeChange(fromDate, e.target.value);
                                          }}
                                          fullWidth />
                                      </TableCell>
                                      <TableCell className={classes.tdStyle}>
                                        <TextField
                                          type="date"
                                          value={fromDate}
                                          onChange={(e) => {
                                            setFromDate(moment(e.target.value).format('YYYY-MM-DD'));
                                            handleFromDateTimeChange(e.target.value, fromTime);
                                          }}
                                          fullWidth />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableCell>
                              <TableCell className={classes.tdStyle}>
                                <Table className={classes.tableStyle}>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className={classes.tdStyle} style={{ width: '100px' }}>
                                        {t('reportTo')}
                                        :
                                      </TableCell>
                                      <TableCell className={classes.tdStyle}>
                                        <TextField
                                          type="time"
                                          value={toTime}
                                          onChange={(e) => {
                                            setToTime(e.target.value);
                                            handleToDateTimeChange(toDate, e.target.value);
                                          }}
                                          fullWidth />
                                      </TableCell>
                                      <TableCell className={classes.tdStyle}>
                                        <TextField
                                          type="date"
                                          value={toDate}
                                          onChange={(e) => {
                                            setToDate(moment(e.target.value).format('YYYY-MM-DD'));
                                            handleToDateTimeChange(e.target.value, toTime);
                                          }}
                                          fullWidth />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className={classes.tdStyle}>
                                <Table className={classes.tableStyle}>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell className={classes.tdStyle} style={{ width: '90px' }}>
                                        {t('licensePlates')}
                                        :
                                      </TableCell>
                                      <TableCell className={classes.tdStyle}>
                                        <Select
                                          value={vehicle ? vehicle.name : ''}
                                          onChange={(e) => changeSelect(e)}
                                          className={classes.selectIcon}
                                          displayEmpty
                                        >
                                          {vehicles.map((vehicle) => (
                                            <MenuItem key={vehicle.id} value={vehicle.name}>
                                              {vehicle.name}
                                            </MenuItem>
                                          ))}
                                        </Select>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
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

export default StoppingReport;
