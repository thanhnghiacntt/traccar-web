import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import EditItemView from './components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import { useCatch } from '../reactHelper';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const AnnouncementPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [item, setItem] = useState();

  const onItemSaved = useCatch(async () => {
    await fetch('/api/announcements');
  });

  const validate = () => item && item.name;

  return (
    <EditItemView
      endpoint="announcements"
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
            <TextField
              value={item.name || ''}
              onChange={(event) => setItem({ ...item, name: event.target.value })}
              label={t('sharedName')}
            />
            <TextField
              value={item.type || 0}
              onChange={(event) => setItem({ ...item, type: event.target.value })}
              label={t('sysAnnoucementType')}
            />
            <TextField
              value={item.content || ''}
              onChange={(event) => setItem({ ...item, content: event.target.value })}
              label={t('sysAnnoucementContent')}
              multiline
              rows={10}
              variant="outlined"
            />
          </AccordionDetails>
        </Accordion>
      )}
    </EditItemView>
  );
};

export default AnnouncementPage;
