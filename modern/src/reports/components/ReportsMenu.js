import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import TimelineIcon from '@mui/icons-material/Timeline';
import SpeedIcon from '@mui/icons-material/Speed';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import PlayArrow from '@mui/icons-material/PlayArrow';

import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import RouteIcon from '@mui/icons-material/Route';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EditRoadIcon from '@mui/icons-material/EditRoad';
import ArtTrackIcon from '@mui/icons-material/ArtTrack';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAdministrator, useRestriction } from '../../common/util/permissions';

const MenuItem = ({
  title, link, icon, selected,
}) => (
  <ListItemButton key={link} component={Link} to={link} selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

const ReportsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const admin = useAdministrator();
  const readonly = useRestriction('readonly');

  return (
    <>
      <List>
        <MenuItem
          title={t('reportCombined')}
          link="/reports/combined"
          icon={<StarIcon />}
          selected={location.pathname === '/reports/combined'}
        />
        <MenuItem
          title={t('reportRoute')}
          link="/reports/route"
          icon={<TimelineIcon />}
          selected={location.pathname === '/reports/route'}
        />
        <MenuItem
          title={t('reportEvents')}
          link="/reports/event"
          icon={<NotificationsActiveIcon />}
          selected={location.pathname === '/reports/event'}
        />
        <MenuItem
          title={t('reportTrips')}
          link="/reports/trip"
          icon={<PlayCircleFilledIcon />}
          selected={location.pathname === '/reports/trip'}
        />
        <MenuItem
          title={t('reportStops')}
          link="/reports/stop"
          icon={<PauseCircleFilledIcon />}
          selected={location.pathname === '/reports/stop'}
        />
        <MenuItem
          title={t('reportSummary')}
          link="/reports/summary"
          icon={<FormatListBulletedIcon />}
          selected={location.pathname === '/reports/summary'}
        />
        <MenuItem
          title={t('reportChart')}
          link="/reports/chart"
          icon={<TrendingUpIcon />}
          selected={location.pathname === '/reports/chart'}
        />
        <MenuItem
          title={t('reportReplay')}
          link="/replay"
          icon={<RouteIcon />}
        />
      </List>
      <List>
        <Divider />
        <MenuItem
          title={t('reportCameraImage')}
          link="/reports/cameraimage"
          icon={<PhotoCameraIcon />}
          selected={location.pathname === '/reports/cameraimage'}
        />
        <MenuItem
          title={t('reportCameraVideo')}
          link="/reports/cameravideo"
          icon={<PlayArrow />}
          selected={location.pathname === '/reports/cameravideo'}
        />
      </List>
      <List>
        <Divider />
        <MenuItem
          title={t('reportFuelbyKM')}
          link="/reports/fuelsummary"
          icon={<LocalGasStationIcon />}
          selected={location.pathname === '/reports/fuelsummary'}
        />
        <MenuItem
          title={t('reportFuelSummary')}
          link="/reports/fuelsummary"
          icon={<ArtTrackIcon />}
          selected={location.pathname === '/reports/fuelsummary'}
        />
      </List>
      <List>
        <Divider />

        <MenuItem
          title={t('reportTollStation')}
          link="/reports/tollstation"
          icon={<EditRoadIcon />}
          selected={location.pathname === '/reports/tollstation'}
        />
      </List>
      <List>
        <Divider />
        <MenuItem
          title={t('reportQCVN31Route')}
          link="/reports/route"
          icon={<TimelineIcon />}
          selected={location.pathname === '/reports/route'}

        />
        <MenuItem
          title={t('reportQCVN31Speeds')}
          link="#"
          icon={<SpeedIcon />}
        />
        <MenuItem
          title={t('reportQCVN31OverSpeed')}
          link="/reports/overspeed"
          icon={<NetworkCheckIcon />}
          selected={location.pathname === '/reports/overspeed'}

        />
        <MenuItem
          title={t('reportQCVN31DContinuosTime')}
          link="/reports/trip"
          icon={<DepartureBoardIcon />}
          selected={location.pathname === '/reports/trip'}

        />
        <MenuItem
          title={t('reportQCVN31Stops')}
          link="/reports/stop"
          icon={<PauseCircleFilledIcon />}
          selected={location.pathname === '/reports/stop'}

        />
        <MenuItem
          title={t('reportQCVN31Summary')}
          link="/reports/summary"
          icon={<FormatListBulletedIcon />}
          selected={location.pathname === '/reports/summary'}

        />
      </List>
      {(admin || !readonly) && (
        <>
          <Divider />
          <List>
            <MenuItem
              title={t('reportScheduled')}
              link="/reports/scheduled"
              icon={<EventRepeatIcon />}
            />
            {admin && (
              <MenuItem
                title={t('statisticsTitle')}
                link="/reports/statistics"
                icon={<BarChartIcon />}
                selected={location.pathname === '/reports/statistics'}
              />
            )}
          </List>
        </>
      )}
    </>
  );
};

export default ReportsMenu;
