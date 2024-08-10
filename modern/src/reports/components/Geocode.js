import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TextField, TableHead, TableRow, TableCell, Button, Select, MenuItem, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import { reportsActions } from '../../store';
import { useTranslation } from '../../common/components/LocalizationProvider';
// import { FormControl } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  geo: {
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
}));

const Geocode = (lat, lng) => {
  const [address, setAddress] = useState(null);
  const t = useTranslation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

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
    <Typography>
      <Link href="#" className={classes.geo} onClick={handleSearch} underline="always">
        {address ? "Xem địa chỉ"}
      </Link>
    </Typography>
  );
};

export default Geocode;
