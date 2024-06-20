import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl, InputLabel, Select, MenuItem,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Stack from '@mui/material/Stack';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { useSelector } from 'react-redux';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
import ImageDialog from '../common/components/ImageDialog';

import { formatTime } from '../common/util/formatter';
import ReportFilter from './components/ReportFilter';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import ReportsMenu from './components/ReportsMenu';
// import ImageViewerWithText from './components/ImageViewerWithText';

import { useCatch, useEffectAsync } from '../reactHelper';
import useReportStyles from './common/useReportStyles';
import { usePreference } from '../common/util/preferences';
import MapView from '../map/core/MapView';
import MapGeofence from '../map/MapGeofence';
import MapPositions from '../map/MapPositions';
import MapCamera from '../map/MapCamera';
import scheduleReport from './common/scheduleReport';

const CameraImageReportPage = () => {
  const navigate = useNavigate();
  const classes = useReportStyles();
  const t = useTranslation();

  const devices = useSelector((state) => state.devices.items);
  const hours12 = usePreference('twelveHourFormat');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [position, setPosition] = useState(null);

  useEffectAsync(async () => {
    if (selectedItem) {
      const response = await fetch(`/api/positions?id=${selectedItem}`);
      if (response.ok) {
        const positions = await response.json();
        if (positions.length > 0) {
          setPosition(positions[0]);
        }
      } else {
        throw Error(await response.text());
      }
    } else {
      setPosition(null);
    }
  }, [selectedItem]);

  const handleSubmit = useCatch(async ({ deviceId, from, to, type }) => {
    const query = new URLSearchParams({ deviceId, from, to });
    query.append('type', 'media');
    // console.log(query.toString());
    if (type === 'export') {
      window.location.assign(`/api/reports/events/xlsx?${query.toString()}`);
    } else if (type === 'mail') {
      const response = await fetch(`/api/reports/events/mail?${query.toString()}`);
      if (!response.ok) {
        throw Error(await response.text());
      }
    } else {
      setLoading(true);
      try {
        const response = await fetch(`/api/reports/events?${query.toString()}`, {
          headers: { Accept: 'application/json' },
        });
        if (response.ok) {
          setItems(await response.json());
        } else {
          throw Error(await response.text());
        }
      } finally {
        setLoading(false);
      }
    }
  });

  const handleSchedule = useCatch(async (deviceIds, groupIds, report) => {
    report.type = 'events';
    const error = await scheduleReport(deviceIds, groupIds, report);
    if (error) {
      throw Error(error);
    } else {
      navigate('/reports/scheduled');
    }
  });

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleImageClick = (item) => {
    setOpenDialog(true);
    const url = `https://www.vngts.com/api/media/${devices[item.deviceId]?.uniqueId}/${item.attributes.file}`;
    setSelectedImage(url);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  return (
    <PageLayout menu={<ReportsMenu />} breadcrumbs={['reportTitle', 'reportEvents']}>
      <div className={classes.container}>
        {selectedItem && (
          <div className={classes.containerMap}>
            <MapView>
              <MapGeofence />
              {position && <MapPositions positions={[position]} titleField="fixTime" />}
            </MapView>
            {position && <MapCamera latitude={position.latitude} longitude={position.longitude} />}
          </div>
        )}
        <div className={classes.containerMain}>
          <div className={classes.header}>
            <ReportFilter handleSubmit={handleSubmit} handleSchedule={handleSchedule}>
              <div className={classes.filterItem}>
                <FormControl fullWidth>
                  <InputLabel>{t('reportEventTypes')}</InputLabel>
                  <Select
                    label={t('reportEventTypes')}
                    value="media"
                  >
                    <MenuItem key="media" value="media">{t('mediaImage')}</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </ReportFilter>

          </div>
          <div>
            <ImageList>
              {!loading && items.map((item) => (
                <div key={item.id}>
                  <ImageListItem>
                    <img
                      src={`https://www.vngts.com/api/media/${devices[item.deviceId]?.uniqueId}/${item.attributes.file}?w=196&fit=crop&auto=format`}
                      srcSet={`https://www.vngts.com/api/media/${devices[item.deviceId]?.uniqueId}/${item.attributes.file}?w=196&fit=crop&auto=format&dpr=2 2x`}
                      alt=""
                      loading="lazy"
                    />
                    <ImageListItemBar
                      actionIcon={(
                        <IconButton
                          aria-label={`info about ${item.type}`}
                          onClick={() => handleImageClick(item)}
                        >
                          <InfoIcon />
                        </IconButton>

                    )}
                      position="below"
                    />
                  </ImageListItem>
                  <Stack direction="row" alignItems="center" gap={1} spacing={2}>
                    {item.positionId ? selectedItem === item.positionId ? (
                      <IconButton size="small" onClick={() => setSelectedItem(null)}>
                        <GpsFixedIcon fontSize="small" />
                      </IconButton>
                    ) : (
                      <IconButton size="small" onClick={() => setSelectedItem(item.positionId)}>
                        <LocationSearchingIcon fontSize="small" />
                      </IconButton>
                    ) : ''}
                    {formatTime(item.eventTime, 'seconds', hours12)}
                  </Stack>

                </div>
              ))}
            </ImageList>
          </div>
        </div>
        {selectedImage && (
        <ImageDialog
          isOpen={openDialog}
          handleClose={handleClose}
          src={selectedImage}
        />
        )}
      </div>
    </PageLayout>
  );
};

export default CameraImageReportPage;
