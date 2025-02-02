import React, { useState } from 'react';
import moment from 'moment';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DropzoneArea } from 'react-mui-dropzone';
import EditItemView from './components/EditItemView';
import SelectField from '../common/components/SelectField';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import deviceCategories from '../common/util/deviceCategories';
import { useTranslation } from '../common/components/LocalizationProvider';
import useDeviceAttributes from '../common/attributes/useDeviceAttributes';
import { useAdministrator } from '../common/util/permissions';
import SettingsMenu from './components/SettingsMenu';
import useCommonDeviceAttributes from '../common/attributes/useCommonDeviceAttributes';
import { useCatch } from '../reactHelper';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

const DevicePage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const admin = useAdministrator();

  const commonDeviceAttributes = useCommonDeviceAttributes(t);
  const deviceAttributes = useDeviceAttributes(t);

  const [item, setItem] = useState();

  const handleFiles = useCatch(async (files) => {
    if (files.length > 0) {
      const response = await fetch(`/api/devices/${item.id}/image`, {
        method: 'POST',
        body: files[0],
      });
      if (response.ok) {
        setItem({ ...item, attributes: { ...item.attributes, deviceImage: await response.text() } });
      } else {
        throw Error(await response.text());
      }
    }
  });

  const validate = () => item && item.name && item.uniqueId;
  console.log(item);

  return (
    <EditItemView
      endpoint="devices"
      item={item}
      setItem={setItem}
      validate={validate}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'sharedDevice']}
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
                helperText={t('deviceIdentifierHelp')}
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
              <SelectField
                value={item.groupId || 0}
                onChange={(event) => setItem({ ...item, groupId: Number(event.target.value) })}
                endpoint="/api/groups"
                label={t('groupParent')}
              />
              <TextField
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label={t('sharedPhone')}
              />
              <TextField
                value={item.model || ''}
                onChange={(event) => setItem({ ...item, model: event.target.value })}
                label={t('deviceModel')}
              />
              <TextField
                value={item.contact || ''}
                onChange={(event) => setItem({ ...item, contact: event.target.value })}
                label={t('deviceContact')}
              />
              <TextField
                value={item.imeimdvr || ''}
                onChange={(event) => setItem({ ...item, imeimdvr: event.target.value })}
                label={t('shareImeiMDVR')}
              />
              <TextField
                value={item.simmdvr || ''}
                onChange={(event) => setItem({ ...item, simmdvr: event.target.value })}
                label={t('shareSIMMDVR')}
              />
              <SelectField
                value={item.category || 'default'}
                emptyValue={null}
                onChange={(event) => setItem({ ...item, category: event.target.value })}
                data={deviceCategories.map((category) => ({
                  id: category,
                  name: t(`category${category.replace(/^\w/, (c) => c.toUpperCase())}`),
                }))}
                label={t('deviceCategory')}
              />
              <TextField
                label={t('userExpirationTime')}
                type="date"
                value={(item.expirationTime && moment(item.expirationTime).locale('en').format(moment.HTML5_FMT.DATE)) || '2099-01-01'}
                onChange={(e) => setItem({ ...item, expirationTime: moment(e.target.value, moment.HTML5_FMT.DATE).locale('en').format() })}
                disabled={!admin}
              />
              <FormControlLabel
                control={<Checkbox checked={item.share} onChange={(event) => setItem({ ...item, share: event.target.checked })} />}
                label={t('shareDevice')}
              />
              <FormControlLabel
                control={<Checkbox checked={item.tollfee} onChange={(event) => setItem({ ...item, tollfee: event.target.checked })} />}
                label={t('deviceTollfee')}
              />
              <FormControlLabel
                control={<Checkbox checked={item.disabled} onChange={(event) => setItem({ ...item, disabled: event.target.checked })} />}
                label={t('sharedDisabled')}
                disabled={!admin}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('deviceFuelTitle')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.fueltime || '0.0'}
                onChange={(event) => setItem({ ...item, fueltime: event.target.value })}
                label={t('deviceFuelTime')}
              />
              <TextField
                value={item.fuelkm || '0.0'}
                onChange={(event) => setItem({ ...item, fuelkm: event.target.value })}
                label={t('deviceFuelKM')}
              />
              <SelectField
                value={item.fueltype || 0}
                onChange={(event) => setItem({ ...item, fueltype: Number(event.target.value) })}
                endpoint="/api/fuels"
                label={t('deviceFuelTitleType')}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('deviceTransportTitle')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                type="number"
                value={item.maxcapacity || '0'}
                onChange={(event) => setItem({ ...item, maxcapacity: event.target.value })}
                label={t('deviceMaxCapacity')}
              />
              <TextField
                value={item.maxpayload || '0.0'}
                onChange={(event) => setItem({ ...item, maxpayload: event.target.value })}
                label={t('deviceMaxpayload')}
              />
              <SelectField
                value={item.vehicletype || 0}
                onChange={(event) => setItem({ ...item, vehicletype: Number(event.target.value) })}
                endpoint="/api/vehicles"
                label={t('sysVehicle')}
              />
            </AccordionDetails>
          </Accordion>
          {item.id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('attributeDeviceImage')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <DropzoneArea
                  dropzoneText={t('sharedDropzoneText')}
                  acceptedFiles={['image/*']}
                  filesLimit={1}
                  onChange={handleFiles}
                  showAlerts={false}
                />
              </AccordionDetails>
            </Accordion>
          )}
          {item.id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('devideDriverActive')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <SelectField
                  value={item.driverId || 0}
                  onChange={(event) => setItem({ ...item, driverId: Number(event.target.value) })}
                  endpoint={`/api/drivers?deviceId=${item.id}`}
                  label={t('driverName')}
                />
              </AccordionDetails>
            </Accordion>
          )}
          <EditAttributesAccordion
            attributes={item.attributes}
            setAttributes={(attributes) => setItem({ ...item, attributes })}
            definitions={{ ...commonDeviceAttributes, ...deviceAttributes }}
          />
        </>
      )}
    </EditItemView>
  );
};

export default DevicePage;
