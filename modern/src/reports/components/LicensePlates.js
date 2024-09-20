import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, MenuItem, Select, TableBody, TableCell, TableRow } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Table } from 'react-bootstrap';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles(() => ({
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
}));

const LicensePlates = ({ actionChange, lable }) => {
  const classes = useStyles();
  const t = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]); // State để lưu danh sách xe
  const [vehicle, setVehicle] = useState(vehicles.length > 0 ? vehicles[0] : null);
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
  const changeSelect = (e) => {
    const selectedVehicle = vehicles.find((vehicle) => vehicle.name === e.target.value);
    actionChange(selectedVehicle);
  };
  return isLoading ? (
    <Box sx={{ display: 'flex', position: 'fixed', width: '70%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress size={60} />
    </Box>
  ) : (
    <Table className={classes.tableStyle}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.tdStyle}>
            {t(lable)}
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
  );
};

export default LicensePlates;
