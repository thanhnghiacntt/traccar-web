import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SelectField from '../common/components/SelectField';
import EditItemView from './components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import { useCatch } from '../reactHelper';
import { fuelsActions } from '../store';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const TollstationfeePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const [item, setItem] = useState();

  const onItemSaved = useCatch(async () => {
    const response = await fetch('/api/tollstationfees');
    if (response.ok) {
      dispatch(fuelsActions.update(await response.json()));
    } else {
      throw Error(await response.text());
    }
  });

  const validate = () => item && item.tollstationId;

  return (
    <EditItemView
      endpoint="tollstationfees"
      item={item}
      setItem={setItem}
      validate={validate}
      onItemSaved={onItemSaved}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'groupDialog']}
    >
      {item && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">
              {t('sharedRequired')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <SelectField
              value={item.tollstationId || 0}
              onChange={(event) => setItem({ ...item, tollstationId: Number(event.target.value) })}
              endpoint="/api/tollstations"
              label={t('sysTollstationName')}
            />
            <SelectField
              value={item.tollstationlinkId || 0}
              onChange={(event) => setItem({ ...item, tollstationlinkId: Number(event.target.value) })}
              endpoint="/api/tollstations"
              label={t('sysTollstationlink')}
            />
            <SelectField
              value={item.vehicletypeId || 0}
              onChange={(event) => setItem({ ...item, vehicletypeId: Number(event.target.value) })}
              endpoint="/api/vehicles"
              label={t('sysVehiclType')}
            />
            <TextField
              value={item.fee || 0.0}
              onChange={(event) => setItem({ ...item, fee: Number(event.target.value) })}
              label={t('sysTollstationPrice')}
            />
          </AccordionDetails>
        </Accordion>
      )}
    </EditItemView>
  );
};

export default TollstationfeePage;
