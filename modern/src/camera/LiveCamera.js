import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import {
  Divider, Typography, IconButton, useMediaQuery, Toolbar,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useNavigate } from 'react-router-dom';
import { useEffectAsync } from '../reactHelper';
// import { Cmsv6Player } from './lib/';
import MapView from '../map/core/MapView';
import MapCurrentLocation from '../map/MapCurrentLocation';
import MapGeofenceEdit from '../map/draw/MapGeofenceEdit';
import GeofencesList from '../other/GeofencesList';
import { useTranslation } from '../common/components/LocalizationProvider';
import MapGeocoder from '../map/geocoder/MapGeocoder';
import { errorsActions } from '../store';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    top: 70,
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  drawerPaper: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: theme.dimensions.drawerWidthTablet,
    },
    [theme.breakpoints.down('sm')]: {
      height: theme.dimensions.drawerHeightPhone,
    },
  },
  mapContainer: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  fileInput: {
    display: 'none',
  },
}));

const LiveCamera = () => {
  const theme = useTheme();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const t = useTranslation();
  const options = {
    domId: 'cmsv6flash',
    isVodMode: false,
    width: 600,
    height: 500,
    lang: 'en',
  };
  useEffect(() => {
    // document.head.innerHTML += '<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">';
    const script = document.createElement('script');

    script.src = 'http://112.213.85.66:88/808gps/open/player/js/cmsv6player.min.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const isPhone = useMediaQuery(theme.breakpoints.down('sm'));

  const [selectedGeofenceId, setSelectedGeofenceId] = useState();

  const handleFile = (event) => {
    const files = Array.from(event.target.files);
    const [file] = files;
    const reader = new FileReader();
    reader.onload = async () => {
      const xml = new DOMParser().parseFromString(reader.result, 'text/xml');
      const segment = xml.getElementsByTagName('trkseg')[0];
      const coordinates = Array.from(segment.getElementsByTagName('trkpt'))
        .map((point) => `${point.getAttribute('lat')} ${point.getAttribute('lon')}`)
        .join(', ');
      const area = `LINESTRING (${coordinates})`;
      const newItem = { name: '', area };
      try {
        const response = await fetch('/api/geofences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newItem),
        });
        if (response.ok) {
          const item = await response.json();
          navigate(`/settings/geofence/${item.id}`);
        } else {
          throw Error(await response.text());
        }
      } catch (error) {
        dispatch(errorsActions.push(error.message));
      }
    };
    reader.onerror = (event) => {
      dispatch(errorsActions.push(event.target.error));
    };
    reader.readAsText(file);
  };

  const url = 'http://112.213.85.66:88/StandardApiAction_login.action?account=admin&password=admin';
  const camID = '325842';
  useEffectAsync(async () => {
    const response = await fetch(url, { referrerPolicy: 'unsafe-url' });
    if (response.ok) {
      const items = await response.json();
      // eslint-disable-next-line no-undef
      const swfobject = new Cmsv6Player(options);
      const initFlash = () => {
        if (swfobject === undefined || swfobject.setWindowNum === undefined) {
          setTimeout(initFlash, 50);
        } else {
          const serverIp = '112.213.85.66';
          const serverPort = '6605';
          swfobject.setWindowNum(4);
          swfobject.setServerInfo(serverIp, serverPort);
        }
      };
      // const jsession = items.jsession;
      console.log(items.result);
      console.log(items.jsession);
      const devIdno = camID;
      const stream = 1;
      const minBufferTime = 2;
      const maxBufferTime = 6;
      initFlash();
      swfobject.setBufferTime(0, minBufferTime);
      swfobject.setBufferTimeMax(0, maxBufferTime);
      swfobject.stopVideo(0);
      swfobject.stopVideo(1);
      swfobject.stopVideo(2);
      swfobject.stopVideo(3);
      swfobject.setVideoInfo(0, `${camID} CH1`);
      swfobject.setVideoInfo(1, `${camID} CH2`);
      swfobject.setVideoInfo(2, `${camID} CH3`);
      swfobject.setVideoInfo(3, `${camID} CH4`);
      swfobject.startVideo(0, items.jsession, devIdno, '0', stream, true);
      swfobject.startVideo(1, items.jsession, devIdno, '1', stream, true);
      swfobject.startVideo(2, items.jsession, devIdno, '2', stream, true);
      swfobject.startVideo(3, items.jsession, devIdno, '3', stream, true);
    } else {
      throw Error(await response.text());
    }
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Drawer
          anchor={isPhone ? 'bottom' : 'left'}
          variant="permanent"
          style={{ 'margin-right': '40px' }}
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar>
            <IconButton edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{t('sharedLiveCamera')}</Typography>
            <label htmlFor="upload-gpx">
              <input accept=".gpx" id="upload-gpx" type="file" className={classes.fileInput} onChange={handleFile} />
              <IconButton edge="end" component="span" onClick={() => {}}>
                <UploadFileIcon />
              </IconButton>
            </label>
          </Toolbar>
          <Divider />
          <GeofencesList onGeofenceSelected={setSelectedGeofenceId} />
        </Drawer>
        <div>
          <div id="cmsv6flash" style={{ width: '100%', float: 'left' }} />

        </div>
        <div className={classes.mapContainer}>
          <MapView>
            <MapGeofenceEdit selectedGeofenceId={selectedGeofenceId} />
          </MapView>
          <MapCurrentLocation />
          <MapGeocoder />
        </div>
      </div>
    </div>
  );
};

export default LiveCamera;
