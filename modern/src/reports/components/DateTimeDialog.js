import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import makeStyles from '@mui/styles/makeStyles';
import moment from 'moment';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import { InputLabel } from '@mui/material';

import './css/DateTimePicker.css';
import './css/Calendar.css';
import './css/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { reportsActions } from '../../store';
import { useTranslation } from '../../common/components/LocalizationProvider';

const DateTimeDialog = ({ isOpen, handleClose }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const from = useSelector((state) => state.reports.from);
  const to = useSelector((state) => state.reports.to);
  const t = useTranslation();

  const useStyles = makeStyles((theme) => ({
    card: {
      pointerEvents: 'auto',
      width: theme.dimensions.popupMaxWidth,
    },
    datetimg: {
      padding: '4px',
    },
    root: {
      '& .MuiPaper-root': {
        width: '100%',
        maxWidth: '650px', // Set your width here
      },
    },
    media: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    mediaButton: {
      color: theme.palette.colors.white,
      mixBlendMode: 'difference',
      cursor: 'pointer',
    },
    paper: { minWidth: '800px' },
  }));
  const classes = useStyles(theme);
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent>
          <Card>
            <CardHeader
              title={t('dateTimeSetting')}
              subheader={t('dateTimeSettingHelper')}

            />
            <CardContent>
              <div className={classes.datetimg}>
                <InputLabel>{t('reportFrom')}</InputLabel>
                <DateTimePicker
                  onChange={(value) => dispatch(reportsActions.updateFrom(moment(value).format('YYYY-MM-DDTHH:mm:ss')))}
                  value={from}
                  format="dd/MM/yyyy HH:mm"
                  clearIcon={null}
                  disableClock={Boolean(true)}
                />
              </div>
              <div className={classes.datetimg}>
                <InputLabel>{t('reportTo')}</InputLabel>
                <DateTimePicker
                  onChange={(value) => dispatch(reportsActions.updateTo(moment(value).format('YYYY-MM-DDTHH:mm:ss')))}
                  value={to}
                  format="dd/MM/yyyy HH:mm"
                  clearIcon={null}
                  disableClock={Boolean(true)}
                />
              </div>

            </CardContent>
            <CardActions
              disableSpacing
            >
              <Button aria-expanded={Boolean(true)} onClick={handleClose}>{t('cancel')}</Button>
              <Button onClick={handleClose} autoFocus>
                {t('agree')}
              </Button>
            </CardActions>
          </Card>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DateTimeDialog;
