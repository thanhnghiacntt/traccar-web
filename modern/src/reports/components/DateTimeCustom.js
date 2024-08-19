import { TableBody, TableCell, TableRow, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import React from 'react';
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

const DateTimeCustom = ({ actionChange, lable, timeDefault }) => {
  const [time, setTime] = React.useState(timeDefault);
  const [date, setDate] = React.useState(moment().format('YYYY-MM-DD'));
  const classes = useStyles();
  const t = useTranslation();

  const handleDateTimeChange = (date, time) => {
    const dateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    actionChange(dateTime);
  };

  return (
    <Table className={classes.tableStyle}>
      <TableBody>
        <TableRow>
          <TableCell className={classes.tdStyle}>
            {t(lable)}
            :
          </TableCell>
          <TableCell className={classes.tdStyle}>
            <TextField
              type="time"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
                handleDateTimeChange(date, e.target.value);
              }}
              fullWidth />
          </TableCell>
          <TableCell className={classes.tdStyle}>
            <TextField
              type="date"
              value={date}
              onChange={(e) => {
                setDate(moment(e.target.value).format('YYYY-MM-DD'));
                handleDateTimeChange(e.target.value, time);
              }}
              fullWidth />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default DateTimeCustom;
