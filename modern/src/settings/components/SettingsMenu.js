import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';
import PublishIcon from '@mui/icons-material/Publish';
import CampaignIcon from '@mui/icons-material/Campaign';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import DeviceHub from '@mui/icons-material/DeviceHub';

import AddRoadIcon from '@mui/icons-material/AddRoad';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useAdministrator, useManager, useRestriction,
} from '../../common/util/permissions';
import useFeatures from '../../common/util/useFeatures';

const MenuItem = ({
  title, link, icon, selected,
}) => (
  <ListItemButton key={link} component={Link} to={link} selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

const SettingsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction('readonly');
  const admin = useAdministrator();
  const manager = useManager();
  const userId = useSelector((state) => state.session.user.id);

  const features = useFeatures();

  return (
    <>
      <List>
        <MenuItem
          title={t('sharedPreferences')}
          link="/settings/preferences"
          icon={<SettingsIcon />}
          selected={location.pathname === '/settings/preferences'}
        />
        {!readonly && (
          <>
            <MenuItem
              title={t('sharedNotifications')}
              link="/settings/notifications"
              icon={<NotificationsIcon />}
              selected={location.pathname.startsWith('/settings/notification')}
            />
            <MenuItem
              title={t('settingsUser')}
              link={`/settings/user/${userId}`}
              icon={<PersonIcon />}
              selected={location.pathname === `/settings/user/${userId}`}
            />
            <MenuItem
              title={t('deviceTitle')}
              link="/settings/devices"
              icon={<SmartphoneIcon />}
              selected={location.pathname.startsWith('/settings/device')}
            />
            <MenuItem
              title={t('sharedGeofences')}
              link="/geofences"
              icon={<CreateIcon />}
              selected={location.pathname.startsWith('/settings/geofence')}
            />
            {!features.disableGroups && (
              <MenuItem
                title={t('settingsGroups')}
                link="/settings/groups"
                icon={<FolderIcon />}
                selected={location.pathname.startsWith('/settings/group')}
              />
            )}
            {!features.disableDrivers && (
              <MenuItem
                title={t('sharedDrivers')}
                link="/settings/drivers"
                icon={<PersonIcon />}
                selected={location.pathname.startsWith('/settings/driver')}
              />
            )}
            {!features.disableCalendars && (
              <MenuItem
                title={t('sharedCalendars')}
                link="/settings/calendars"
                icon={<TodayIcon />}
                selected={location.pathname.startsWith('/settings/calendar')}
              />
            )}
            {!features.disableComputedAttributes && (
              <MenuItem
                title={t('sharedComputedAttributes')}
                link="/settings/attributes"
                icon={<StorageIcon />}
                selected={location.pathname.startsWith('/settings/attribute')}
              />
            )}
            {!features.disableMaintenance && (
              <MenuItem
                title={t('sharedMaintenance')}
                link="/settings/maintenances"
                icon={<BuildIcon />}
                selected={location.pathname.startsWith('/settings/maintenance')}
              />
            )}
            <MenuItem
              title={t('sharedSavedCommands')}
              link="/settings/commands"
              icon={<PublishIcon />}
              selected={location.pathname.startsWith('/settings/command') && !location.pathname.startsWith('/settings/command-send')}
            />
          </>
        )}
      </List>
      {manager && (
        <>
          <Divider />
          <List>
            {admin && (
              <MenuItem
                title={t('settingsServer')}
                link="/settings/server"
                icon={<StorageIcon />}
                selected={location.pathname === '/settings/server'}
              />
            )}
            {admin && (
            <MenuItem
              title={t('userDevices')}
              link="/settings/userdevices"
              icon={<DeviceHub />}
              selected={location.pathname.startsWith('/settings/userdevices')}
            />
            )}
            {admin && (
              <MenuItem
                title={t('systemFuel')}
                link="/settings/fuels"
                icon={<LocalGasStationIcon />}
                selected={location.pathname === '/settings/fuel'}
              />
            )}
            {admin && (
              <MenuItem
                title={t('sysVehicle')}
                link="/settings/vehicles"
                icon={<NoCrashIcon />}
                selected={location.pathname === '/settings/vehicle'}
              />
            )}
            {admin && (
              <MenuItem
                title={t('sysTollstation')}
                link="/tollstations"
                icon={<AddRoadIcon />}
                selected={location.pathname.startsWith('/settings/tollstation')}
              />
            )}
            {admin && (
              <MenuItem
                title={t('sysTollstationfee')}
                link="/settings/tollstationfees"
                icon={<AttachMoneyIcon />}
                selected={location.pathname === '/settings/tollstationfee'}
              />
            )}
            {admin && (
              <MenuItem
                title={t('sysAnnoucements')}
                link="/settings/announcements"
                icon={<CampaignIcon />}
                selected={location.pathname === '/settings/announcement'}
              />
            )}
            <MenuItem
              title={t('settingsUsers')}
              link="/settings/users"
              icon={<PeopleIcon />}
              selected={location.pathname.startsWith('/settings/user') && location.pathname !== `/settings/user/${userId}`}
            />
            <Divider />
          </List>
        </>
      )}
      <Divider />
    </>
  );
};

export default SettingsMenu;
