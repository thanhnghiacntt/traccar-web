import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import {
  IconButton, Paper, Slider, Toolbar, Typography, Select, MenuItem, useMediaQuery,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { styled } from '@mui/material/styles';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TuneIcon from '@mui/icons-material/Tune';
import DownloadIcon from '@mui/icons-material/Download';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import MapView from '../map/core/MapView';
import MapSelectedLocation from '../map/main/MapSelectedLocation';
import MapRoutePath from '../map/MapRoutePath';
import MapRoutePoints from '../map/MapRoutePoints';
import MapPositions from '../map/MapPositions';
import MapRouteStops from '../map/MapRouteStops';
import { formatTime } from '../common/util/formatter';
import ReportFilter from '../reports/components/ReportFilter';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useCatch } from '../reactHelper';
import MapCamera from '../map/MapCamera';
import MapGeofence from '../map/MapGeofence';
import StatusCard from '../common/components/StatusCard';
import StopCard from '../common/components/StopCard';
import { reportsActions } from '../store';
import { usePreference } from '../common/util/preferences';
import LoadingProgress from '../common/components/LoadingProgress';
import FlowChart from '../reports/components/FlowChart';
import theme from '../common/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    zIndex: 3,
    left: 0,
    top: 0,
    margin: theme.spacing(1.5),
    width: theme.dimensions.drawerWidthDesktop,
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: 0,
    },
  },
  title: {
    flexGrow: 1,
  },
  slider: {
    width: '100%',
  },
  playSpeed: {
    height: '25px',
    width: '80px',
    marginLeft: '20px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControlLabel: {
    height: '100%',
    width: '100%',
    paddingRight: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    top: 60,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(1),
    },
  },
}));

const ReplayPage = () => {
  const t = useTranslation();
  const classes = useStyles();
  const navigate = useNavigate();
  const timerRef = useRef();
  const dispatch = useDispatch();

  const hours12 = usePreference('twelveHourFormat');

  const defaultDeviceId = useSelector((state) => state.devices.selectedId);
  const selectedStopIndex = useSelector((state) => state.reports.selectedStopId);

  const [positions, setPositions] = useState([]);
  const [positionsStop, setPositionsStop] = useState([]);

  const [index, setIndex] = useState(0);
  const [stopindex, setStopIndex] = useState(0);

  const [selectedDeviceId, setSelectedDeviceId] = useState(defaultDeviceId);
  const [showCard, setShowCard] = useState(false);
  const [showStopCard, setStopShowCard] = useState(false);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [expanded, setExpanded] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [playSpeed, setPlaySpeed] = useState(500);
  const [loading, setLoading] = useState(false);
  const [stoploading, setStopLoading] = useState(false);
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
  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const [expandedMore, setExpandedMore] = React.useState(!!desktop);

  const handleExpandClick = () => {
    setExpandedMore(!expandedMore);
  };

  const deviceName = useSelector((state) => {
    if (selectedDeviceId) {
      const device = state.devices.items[selectedDeviceId];
      if (device) {
        return device.name;
      }
    }
    return null;
  });

  useEffect(() => {
    if (playing && positions.length > 0) {
      timerRef.current = setInterval(() => {
        setIndex((index) => index + 1);
      }, playSpeed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, positions, playSpeed]);
  useEffect(() => {
    if (index >= positions.length - 1) {
      clearInterval(timerRef.current);
      setPlaying(false);
    }
  }, [index, positions]);

  const onPointClick = useCallback((_, index) => {
    setIndex(index);
  }, [setIndex]);

  const onMarkerClick = useCallback((positionId) => {
    setShowCard(!!positionId);
    setStopShowCard(false);
  }, [setShowCard]);
  const onMarkerStopClick = useCallback((index) => {
    setStopIndex(index);
    setStopShowCard(true);
    setShowCard(false);
  }, [setStopShowCard]);
  const handleSubmit = useCatch(async ({ deviceId, from, to }) => {
    setSelectedDeviceId(deviceId);
    setFrom(from);
    setTo(to);
    const query = new URLSearchParams({ deviceId, from, to });
    setLoading(true);
    try {
      const response = await fetch(`/api/positions?${query.toString()}`);
      if (response.ok) {
        setIndex(0);
        const positions = await response.json();
        setPositions(positions);
        if (positions.length) {
          setExpanded(false);
        } else {
          throw Error(t('sharedNoData'));
        }
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
    setStopLoading(true);
    try {
      const responseStops = await fetch(`/api/reports/stops?${query.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      if (responseStops.ok) {
        setPositionsStop(await responseStops.json());
      } else {
        throw Error(await responseStops.text());
      }
    } finally {
      setStopLoading(false);
      // calculateTotalStopTime(positionsStop);
    }
  });

  const handleDownload = () => {
    const query = new URLSearchParams({ deviceId: selectedDeviceId, from, to });
    window.location.assign(`/api/positions/kml?${query.toString()}`);
  };
  const handleSpeedChange = (value) => {
    setPlaySpeed(value);
  };
  return (
    <div className={classes.root}>
      <MapView>
        <MapGeofence />
        <MapRoutePath positions={positions} />
        <MapRoutePoints positions={positions} onClick={onPointClick} />
        <MapRouteStops positions={positionsStop} onClick={onMarkerStopClick} />
        {index < positions.length && (
          <MapPositions positions={[positions[index]]} onClick={onMarkerClick} titleField="fixTime" />
        )}
        <MapSelectedLocation positions={positionsStop} />

      </MapView>
      <MapCamera positions={positions} />
      <div className={classes.sidebar}>
        <Paper elevation={3} square>
          <Toolbar>
            <IconButton edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>{t('reportReplay')}</Typography>
            {!expanded && (
              <>
                <IconButton onClick={handleDownload}>
                  <DownloadIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => setExpanded(true)}>
                  <TuneIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Paper>
        <Paper className={classes.content} square>
          {!expanded ? (
            <>
              <Typography variant="subtitle1" align="center">{deviceName}</Typography>
              <div className={classes.controls}>
                <Slider
                  className={classes.slider}
                  max={positions.length - 1}
                  step={null}
                  marks={positions.map((_, index) => ({ value: index }))}
                  value={index}
                  onChange={(_, index) => setIndex(index)}
                />
                <Select
                  className={classes.playSpeed}
                  value={playSpeed}
                  onChange={(event) => handleSpeedChange(Number(event.target.value))}
                >
                  <MenuItem value={500}>1x</MenuItem>
                  <MenuItem value={400}>2x</MenuItem>
                  <MenuItem value={300}>3x</MenuItem>
                  <MenuItem value={200}>4x</MenuItem>
                  <MenuItem value={100}>5x</MenuItem>
                  <MenuItem value={50}>8x</MenuItem>
                  <MenuItem value={10}>10x</MenuItem>

                </Select>
              </div>
              <div className={classes.controls}>
                {`${index + 1}/${positions.length}`}
                <IconButton onClick={() => setIndex((index) => index - 1)} disabled={playing || index <= 0}>
                  <FastRewindIcon />
                </IconButton>
                <IconButton onClick={() => setPlaying(!playing)} disabled={index >= positions.length - 1}>
                  {playing ? <PauseIcon /> : <PlayArrowIcon /> }
                </IconButton>
                <IconButton onClick={() => setIndex((index) => index + 1)} disabled={playing || index >= positions.length - 1}>
                  <FastForwardIcon />
                </IconButton>
                {positions[index] && formatTime(positions[index].fixTime, 'seconds', hours12)}
              </div>
              <ExpandMore
                expand={expandedMore}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
              <Collapse in={expandedMore} timeout="auto" unmountOnExit>

                {!stoploading && (
                <FlowChart
                  positions={positionsStop}
                  from={from}
                  to={to}
                />
                )}
              </Collapse>
            </>
          ) : (
            <ReportFilter handleSubmit={handleSubmit} fullScreen showOnly />
          )}
        </Paper>
      </div>
      {showCard && index < positions.length && (
        <StatusCard
          deviceId={selectedDeviceId}
          position={positions[index]}
          onClose={() => setShowCard(false)}
          disableActions
        />
      )}
      {showStopCard && stopindex < positionsStop.length && (
        <StopCard
          deviceId={selectedDeviceId}
          position={positionsStop[stopindex]}
          onClose={() => setStopShowCard(false)}
          disableActions
        />
      )}
      {selectedStopIndex >= 0 && (
        <StopCard
          deviceId={selectedDeviceId}
          position={positionsStop[selectedStopIndex]}
          onClose={() => dispatch(reportsActions.selectedStopIndex(-1))}
          disableActions
        />
      )}
      {loading && <LoadingProgress />}
    </div>
  );
};

export default ReplayPage;
