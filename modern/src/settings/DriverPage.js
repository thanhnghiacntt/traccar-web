import React, { useState } from 'react';

import TextField from '@mui/material/TextField';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from './components/EditItemView';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import { formatTime } from '../common/util/formatter';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const DriverPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [item, setItem] = useState();
  const defaultDate = formatTime(new Date(), 'date');
  const validate = () => item && item.name && item.uniqueId;

  return (
    <EditItemView
      endpoint="drivers"
      item={item}
      setItem={setItem}
      validate={validate}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'sharedDriver']}
    >
      {item && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.name || ''}
                onChange={(event) => setItem({ ...item, name: event.target.value })}
                label={t('sharedName')}
              />
              <TextField
                value={item.uniqueId || ''}
                onChange={(event) => setItem({ ...item, uniqueId: event.target.value })}
                label={t('deviceIdentifier')}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedExtra')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.citizenId || ''}
                onChange={(event) => setItem({ ...item, citizenId: event.target.value })}
                label={t('driverCitizenID')}
              />
              <TextField
                type="date"
                value={formatTime(item.dob, 'date') || defaultDate}
                onChange={(event) => setItem({ ...item, dob: event.target.value })}
                label={t('driverDob')}
              />
              <TextField
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label={t('driverPhone')}
              />
              <TextField
                value={item.address || ''}
                onChange={(event) => setItem({ ...item, address: event.target.value })}
                label={t('driverAddress')}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('driverLicense')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.license || ''}
                onChange={(event) => setItem({ ...item, license: event.target.value })}
                label={t('driverLicenseNo')}
              />
              <TextField
                type="date"
                value={formatTime(item.aprovalDate, 'date') || defaultDate}
                onChange={(event) => setItem({ ...item, aprovalDate: event.target.value })}
                label={t('driveraprovaldate')}
              />
              <TextField
                type="date"
                value={formatTime(item.expirationDate, 'date') || defaultDate}
                onChange={(event) => setItem({ ...item, expirationDate: event.target.value })}
                label={t('driverexpirationdate')}
              />
            </AccordionDetails>
          </Accordion>
          <EditAttributesAccordion
            attributes={item.attributes}
            setAttributes={(attributes) => setItem({ ...item, attributes })}
            definitions={{}}
          />
        </>
      )}
    </EditItemView>
  );
};

export default DriverPage;
