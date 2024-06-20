import React from 'react';
import { useSelector } from 'react-redux';
import Draggable from 'react-draggable';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardMedia,
  Divider,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
import usePositionAttributes from '../attributes/usePositionAttributes';
import AddressValue from './AddressValue';

import { useTranslation } from './LocalizationProvider';
import PositionStopValue from './PositionStopValue';
import { useAttributePreference } from '../util/preferences';

const useStyles = makeStyles((theme) => ({
  card: {
    pointerEvents: 'auto',
    width: theme.dimensions.popupMaxWidth,
  },
  media: {
    height: theme.dimensions.popupImageHeight,
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
const StatusRow = ({ name, content }) => {
  const classes = useStyles();

  return (
    <TableRow>
      <TableCell className={classes.cellNowrap}>
        <Typography variant="body2" style={{ fontWeight: 500 }}>{name}</Typography>
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
const StopCard = ({ deviceId, position, onClose, desktopPadding = 0 }) => {
  const classes = useStyles({ desktopPadding });
  const t = useTranslation();

  const device = useSelector((state) => state.devices.items[deviceId]);

  const deviceImage = device?.attributes?.deviceImage;

  const positionAttributes = usePositionAttributes(t);
  const positionItems = useAttributePreference('positionItems', 'fixTime,speed,course,startTime,endTime,duration');

  return (
    <div className={classes.root}>
      {device && (
      <Draggable
        handle={`.${classes.media}, .${classes.header}`}
      >
        <Card elevation={3} className={classes.card}>
          {deviceImage ? (
            <CardMedia
              className={classes.media}
              image={`/api/media/${device.uniqueId}/${deviceImage}`}
            >
              <IconButton
                size="small"
                onClick={onClose}
                onTouchStart={onClose}
              >
                <CloseIcon fontSize="small" className={classes.mediaButton} />
              </IconButton>
            </CardMedia>
          ) : (
            <div className={classes.header}>
              <Typography variant="body2" style={{ color: 'white', fontWeight: 900 }}>
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
          {position && (
          <CardContent className={classes.content}>
            <Table size="small" classes={{ root: classes.table }}>
              <TableBody>
                {positionItems.split(',').filter((key) => position.hasOwnProperty(key)).map((key) => (
                  <StatusRow
                    key={key}
                    name={positionAttributes.hasOwnProperty(key) ? positionAttributes[key].name : key}
                    content={(
                      <PositionStopValue
                        position={position}
                        property={position.hasOwnProperty(key) ? key : null}
                        attribute={position.hasOwnProperty(key) ? null : key}
                      />
                          )}
                  />
                ))}
              </TableBody>
            </Table>
            <Divider />
            <Typography variant="body2" style={{ color: '#2e7d32', paddingTop: '6px' }}>
              <AddressValue latitude={position.latitude} longitude={position.longitude} originalAddress={position.address} />
            </Typography>
          </CardContent>
          )}
        </Card>
      </Draggable>
      )}
    </div>
  );
};

export default StopCard;
