import React from 'react';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { makeStyles } from '@mui/styles';
import {
  Autocomplete, Container, createFilterOptions, TextField,
} from '@mui/material';
import { useTranslation } from '../common/components/LocalizationProvider';

const currentServer = `${window.location.protocol}//${window.location.host}`;

const officialServers = [
  currentServer,
  'http://localhost:8086',
  'http://localhost:3000',
];

const useStyles = makeStyles((theme) => ({
  icon: {
    textAlign: 'center',
    fontSize: '128px',
    color: theme.palette.colors.neutral,
  },
  container: {
    textAlign: 'center',
    padding: theme.spacing(5, 3),
  },
  field: {
    margin: theme.spacing(3, 0),
  },
}));

const ChangeServerPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const filter = createFilterOptions();

  const handleSubmit = (url) => {
    if (window.webkit && window.webkit.messageHandlers.appInterface) {
      window.webkit.messageHandlers.appInterface.postMessage(`server|${url}`);
    } else if (window.appInterface) {
      window.appInterface.postMessage(`server|${url}`);
    } else {
      window.location.replace(url);
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <ElectricalServicesIcon className={classes.icon} />
      <Autocomplete
        freeSolo
        className={classes.field}
        options={officialServers}
        renderInput={(params) => <TextField {...params} label={t('settingsServer')} />}
        value={currentServer}
        onChange={(_, value) => handleSubmit(value)}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (params.inputValue && !filtered.includes(params.inputValue)) {
            filtered.push(params.inputValue);
          }
          return filtered;
        }}
      />
    </Container>
  );
};

export default ChangeServerPage;
