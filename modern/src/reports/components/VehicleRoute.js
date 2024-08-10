import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TextField, TableHead, TableRow, TableCell, Button, Select, MenuItem, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { reportsActions } from '../../store';
import { useTranslation } from '../../common/components/LocalizationProvider';
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
  },
}));

const VehicleRoute = () => {
  const [fromTime, setFromTime] = React.useState('00:00');
  const [fromDate, setFromDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [toTime, setToTime] = React.useState('00:00');
  const [toDate, setToDate] = React.useState(moment().format('YYYY-MM-DD'));
  const [vehicles, setVehicles] = useState([]); // State để lưu danh sách xe
  const [vehicle, setVehicle] = useState(vehicles.length > 0 ? vehicles[0] : null);
  const [result, setResult] = useState([]);

  const t = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  // useEffect để gọi API và lấy danh sách xe
  useEffect(() => {
    fetch('/api/devices')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setVehicle(data[0]);
        }
        setVehicles(data);
      })
      .catch((error) => console.error('Error fetching vehicles:', error));
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
        <TableRow>
          <TableCell align="center" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Số Thứ Tự</TableCell>
          <TableCell align="center" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Thời điểm</TableCell>
          <TableCell align="center" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Toạ độ</TableCell>
          <TableCell align="center" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Tốc độ</TableCell>
          <TableCell align="center" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Địa điểm</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell align="center">{index + 1}</TableCell>
            <TableCell align="center">{row.serverTime}</TableCell>
            <TableCell align="center">
              {`${row.latitude},${row.longitude}`}
            </TableCell>
            <TableCell align="center" style={{ whiteSpace: 'nowrap' }}>
              {`${row.speed} km/h`}
            </TableCell>
            <TableCell align="center">{row.GhiChu}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const handleSearch = () => {
    const fromDateTime = moment(`${fromDate} ${fromTime}`, 'YYYY-MM-DD HH:mm').toISOString();
    const toDateTime = moment(`${toDate} ${toTime}`, 'YYYY-MM-DD HH:mm').toISOString();
    const vehicleId = vehicle.id; // Giả sử `vehicle` lưu ID của xe được chọn
    fetch(`/api/reports/route?from=${fromDateTime}&to=${toDateTime}&deviceId=${vehicleId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        // 'Authorization': 'Bearer your-auth-token' // nếu API yêu cầu authentication
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => console.error('Error fetching search results:', error));
  };

  return (
    <Container className={classes.container}>
      <Table className={classes.tableStyle}>
        <TableHead className={classes.header}>
          <TableRow>
            <TableCell>{t('vehicleRoute')}</TableCell>
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
                            <TableCell>
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
          <TableRow>
            <TableCell>
              {result && result.length > 0 ? (
                resultsTable(result)
              ) : (
                <Box
                  component="img"
                  src="/images/s_icon_camera.png"
                  alt="No Image"
                  sx={{
                    marginBottom: '10px',
                  }}
                />
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default VehicleRoute;
