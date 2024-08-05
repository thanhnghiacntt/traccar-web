import React from 'react';
import { Container, Button, Grid, Typography, Paper, TextField, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { reportsActions } from '../../store';
import moment from 'moment';
import { useTranslation, selectedLanguage } from '../../common/components/LocalizationProvider';

const VehicleRoute = () => {
  const [fromTime, setFromTime] = React.useState('00:00');
  const [fromDate, setFromDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  const [toDate, setToDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));  
  const from = useSelector((state) => state.reports.from);
  const to = useSelector((state) => state.reports.to);
  const t = useTranslation();
  const dispatch = useDispatch();

  const handleFromDateTimeChange = (date, time) => {
    const dateTime = moment(`${date}T${time}`).format('YYYY-MM-DDTHH:mm:ss');
    dispatch(reportsActions.updateFrom(dateTime));
  };

  const handleToDateTimeChange = (date, time) => {
    const dateTime = moment(`${date}T${time}`).format('YYYY-MM-DDTHH:mm:ss');
    dispatch(reportsActions.updateTo(dateTime));
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, marginBottom: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t('vehicleRoute')}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Thời gian bắt đầu"
              type="time"
              value={fromTime}
              onChange={(e) => {
                setFromTime(e.target.value);
                handleFromDateTimeChange(fromDate, e.target.value);
              }}
              fullWidth
            />
            <TextField
              label="Ngày bắt đầu"
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                handleFromDateTimeChange(e.target.value, fromTime);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Thời gian kết thúc"
              type="time"
              fullWidth
            />
            <TextField
              label="Ngày kết thúc"
              type="date"
              fullWidth
            />
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" fullWidth>
          Tìm kiếm
        </Button>
      </Paper>
    </Container>
  );
};

export default VehicleRoute;
