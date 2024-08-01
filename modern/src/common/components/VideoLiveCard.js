import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Draggable from 'react-draggable';
// import VideoPlayer from 'react-player/file';
import ReactHlsPlayer from 'react-hls-player';

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import RouteIcon from '@mui/icons-material/Route';
import PublishIcon from '@mui/icons-material/Publish';
import PendingIcon from '@mui/icons-material/Pending';
import { useTranslation } from './LocalizationProvider';
import PositionValue from './PositionValue';
import AddressInstance from './AddressInstance';
import usePositionAttributes from '../attributes/usePositionAttributes';
import useDriverAttributes from '../attributes/useDriverAttributes';
import { formatTime } from '../util/formatter';
import { useCatchCallback } from '../../reactHelper';
import { useAttributePreference } from '../util/preferences';

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: 'auto',
    width: theme.dimensions.popupMaxWidth,
    // height: 'calc(100vh - 20px)',
    overflowY: 'auto',
  },
  media: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  mediaButton: {
    color: theme.palette.colors.white,
    mixBlendMode: 'difference',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 1, 0, 2),
    background: theme.palette.colors.secondary,
  },
  content: {
    top: 60,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  negative: {
    color: theme.palette.colors.negative,
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
  },
  table: {
    '& .MuiTableCell-sizeSmall': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  cell: {
    borderBottom: 'none',
  },
  cellNowrap: {
    borderBottom: 'none',
    whiteSpace: 'nowrap',
  },
  actions: {
    justifyContent: 'space-between',
  },
  root: ({ desktopPadding }) => ({
    pointerEvents: 'none',
    position: 'fixed',
    zIndex: 5,
    left: '50%',
    [theme.breakpoints.up('md')]: {
      left: `calc(50% + ${desktopPadding} / 2)`,
      bottom: theme.spacing(3),
    },
    [theme.breakpoints.down('md')]: {
      left: '50%',
      bottom: `calc(${theme.spacing(3)} + ${theme.dimensions.bottomBarHeight}px)`,
    },
    transform: 'translateX(-50%)',
  }),
}));
const formatValue = (key, value) => {
  switch (key) {
    case 'expirationDate':
    case 'aprovalDate':
      return formatTime(value, 'date', null);
    default:
      return value;
  }
};

const StatusRow = ({ name, content }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.cellNowrap}>
        <Typography variant="body2" style={{ fontWeight: 500 }}>
          {name}
        </Typography>
      </TableCell>
      <TableCell className={classes.cell}>
        <Typography variant="body2" color="textSecondary">
          &nbsp;&nbsp;
          {content}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

const VideoLiveCard = ({ deviceId, position, onClose, disableActions, desktopPadding = 0 }) => {
  const classes = useStyles({ desktopPadding });
  const navigate = useNavigate();
  const t = useTranslation();
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const device = useSelector((state) => state.devices.items[deviceId]);
  const driver = useSelector((state) => state.drivers.items[device && device.driverId ? device.driverId : 0]);

  // const deviceImage = device?.attributes?.deviceImage;

  const positionAttributes = usePositionAttributes(t);
  const driverAttributes = useDriverAttributes(t);

  const positionItems = useAttributePreference('positionItems', 'fixTime,speed,course,startTime,endTime,duration,event,alarm,motion,geofence,ignition,batteryLevel');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleGeofence = useCatchCallback(async () => {
    const newItem = {
      name: '',
      area: `CIRCLE (${position.latitude} ${position.longitude}, 50)`,
    };
    const response = await fetch('/api/geofences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      const item = await response.json();
      const permissionResponse = await fetch('/api/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId: position.deviceId, geofenceId: item.id }),
      });
      if (!permissionResponse.ok) {
        throw Error(await permissionResponse.text());
      }
      navigate(`/settings/geofence/${item.id}`);
    } else {
      throw Error(await response.text());
    }
  }, [navigate, position]);

  return (
    <>
      <div className={classes.root}>
        {device && (
          <Draggable
            handle={`.${classes.media}, .${classes.header}, .${classes.content}`}
          >
            <Card elevation={3} className={classes.card}>
              {device && (
              <div className={classes.header}>
                <Typography variant="subtitle2" style={{ color: 'white', fontWeight: 900 }}>
                  {device.name}
                </Typography>
                <IconButton
                  size="small"
                  onClick={onClose}
                  onTouchStart={onClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
              )}
              <div className={classes.media}>
                {device?.model && (
                <ReactHlsPlayer
                  src={`https://live.thietbihanhtrinh.vn/0/${device.uniqueId}/stream.m3u8`}
                  autoPlay={Boolean(true)}
                  controls
                  muted
                  playsInline={Boolean(true)}
                  width="100%"
                  height="auto"
                />
                )}
              </div>
              {device?.model && (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <div className={classes.media}>
                    <ReactHlsPlayer
                      src={`https://live.thietbihanhtrinh.vn/1/${device.uniqueId}/stream.m3u8`}
                      autoPlay={Boolean(true)}
                      controls
                      muted
                      playsInline={Boolean(true)}
                      width="100%"
                      height="auto"
                    />
                  </div>
                </Collapse>
              )}
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              {position && (
                <CardContent className={classes.content}>
                  <Table size="small" classes={{ root: classes.table }}>
                    <TableBody>
                      {positionItems.split(',').filter((key) => position.hasOwnProperty(key) || position.attributes.hasOwnProperty(key)).map((key) => (
                        <StatusRow
                          key={key}
                          name={positionAttributes.hasOwnProperty(key) ? positionAttributes[key].name : key}
                          content={(
                            <PositionValue
                              position={position}
                              property={position.hasOwnProperty(key) ? key : null}
                              attribute={position.hasOwnProperty(key) ? null : key}
                            />
                          )}
                        />
                      ))}
                      {driver && 'name,phone,license,aprovalDate,expirationDate,citizenId'.split(',').map((key) => (
                        <StatusRow
                          key={key}
                          name={driverAttributes.hasOwnProperty(key) ? driverAttributes[key].name : key}
                          content={formatValue(key, driver[key])}
                        />
                      ))}
                    </TableBody>
                  </Table>
                  <Divider />
                </CardContent>
              )}
              {position && (
              <CardContent className={classes.content}>
                <Typography variant="body2" style={{ color: '#2e7d32' }}>
                  <AddressInstance latitude={position.latitude} longitude={position.longitude} />
                </Typography>
              </CardContent>
              )}
              <Divider />

              <CardActions classes={{ root: classes.actions }} disableSpacing>
                <IconButton
                  color="secondary"
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  disabled={!position}
                >
                  <PendingIcon />
                </IconButton>
                <IconButton
                  onClick={() => navigate('/replay')}
                  disabled={disableActions || !position}
                >
                  <RouteIcon />
                </IconButton>
                <IconButton
                  onClick={() => navigate(`/settings/command-send/${deviceId}`)}
                  disabled={disableActions}
                >
                  <PublishIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Draggable>
        )}
      </div>
      {position && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => navigate(`/position/${position.id}`)}><Typography color="secondary">{t('sharedShowDetails')}</Typography></MenuItem>
          <MenuItem onClick={handleGeofence}>{t('sharedCreateGeofence')}</MenuItem>
          <MenuItem component="a" target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${position.latitude}%2C${position.longitude}`}>{t('linkGoogleMaps')}</MenuItem>
          <MenuItem component="a" target="_blank" href={`http://maps.apple.com/?ll=${position.latitude},${position.longitude}`}>{t('linkAppleMaps')}</MenuItem>
          <MenuItem component="a" target="_blank" href={`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${position.latitude}%2C${position.longitude}&heading=${position.course}`}>{t('linkStreetView')}</MenuItem>
        </Menu>
      )}
    </>
  );
};

export default VideoLiveCard;
