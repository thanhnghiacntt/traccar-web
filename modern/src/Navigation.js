import React, { useState } from 'react';
import {
  Route, Routes, useLocation, useNavigate,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LinearProgress } from '@mui/material';
import MainPage from './main/MainPage';
import CombinedReportPage from './reports/CombinedReportPage';
import RouteReportPage from './reports/RouteReportPage';
import ServerPage from './settings/ServerPage';
import UsersPage from './settings/UsersPage';
import DevicePage from './settings/DevicePage';
import UserPage from './settings/UserPage';
import NotificationsPage from './settings/NotificationsPage';
import NotificationPage from './settings/NotificationPage';
import GroupsPage from './settings/GroupsPage';
import GroupPage from './settings/GroupPage';
import FuelPage from './settings/FuelPage';
import FuelsPage from './settings/FuelsPage';
import AnnouncementPage from './settings/AnnouncementPage';
import AnnouncementsPage from './settings/AnnouncementsPage';
import VehiclePage from './settings/VehiclePage';
import VehiclesPage from './settings/VehiclesPage';
import TollstationPage from './settings/TollstationPage';
import TollstationsPage from './settings/TollstationsPage';
import TollstationfeePage from './settings/TollstationfeePage';
import TollstationfeesPage from './settings/TollstationfeesPage';
import PositionPage from './other/PositionPage';
import NetworkPage from './other/NetworkPage';
import EventReportPage from './reports/EventReportPage';
import CameraImageReportPage from './reports/CameraImageReportPage';
import CameraVideoReportPage from './reports/CameraVideoReportPage';

import TollstationReportPage from './reports/TollstationReportPage';
import OverspeedReportPage from './reports/OverspeedReportPage';
import ReplayPage from './other/ReplayPage';
import TripReportPage from './reports/TripReportPage';
import StopReportPage from './reports/StopReportPage';
import SummaryReportPage from './reports/SummaryReportPage';
import FuelSummaryReportPage from './reports/FuelSummaryReportPage';

import ChartReportPage from './reports/ChartReportPage';
import DriversPage from './settings/DriversPage';
import DriverPage from './settings/DriverPage';
import CalendarsPage from './settings/CalendarsPage';
import CalendarPage from './settings/CalendarPage';
import ComputedAttributesPage from './settings/ComputedAttributesPage';
import ComputedAttributePage from './settings/ComputedAttributePage';
import MaintenancesPage from './settings/MaintenancesPage';
import MaintenancePage from './settings/MaintenancePage';
import CommandsPage from './settings/CommandsPage';
import CommandPage from './settings/CommandPage';
import StatisticsPage from './reports/StatisticsPage';
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import ResetPasswordPage from './login/ResetPasswordPage';
import GeofencesPage from './other/GeofencesPage';
import TollstationsMapPage from './other/TollstationsPage';
import LiveCamera from './camera/LiveCamera';
import GeofencePage from './settings/GeofencePage';
import useQuery from './common/util/useQuery';
import { useEffectAsync } from './reactHelper';
import { devicesActions } from './store';
import EventPage from './other/EventPage';
import PreferencesPage from './settings/PreferencesPage';
import AccumulatorsPage from './settings/AccumulatorsPage';
import CommandSendPage from './settings/CommandSendPage';
import App from './App';
import ChangeServerPage from './other/ChangeServerPage';
import DevicesPage from './settings/DevicesPage';
import UserDevicesPage from './settings/UserDevicesPage';

import ScheduledPage from './reports/ScheduledPage';
import DeviceConnectionsPage from './settings/DeviceConnectionsPage';
import GroupConnectionsPage from './settings/GroupConnectionsPage';
import UserConnectionsPage from './settings/UserConnectionsPage';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [redirectsHandled, setRedirectsHandled] = useState(false);

  const { pathname } = useLocation();
  const query = useQuery();

  useEffectAsync(async () => {
    if (query.get('token')) {
      const token = query.get('token');
      await fetch(`/api/session?token=${encodeURIComponent(token)}`);
      navigate(pathname);
    } else if (query.get('deviceId')) {
      const deviceId = query.get('deviceId');
      const response = await fetch(`/api/devices?uniqueId=${deviceId}`);
      if (response.ok) {
        const items = await response.json();
        if (items.length > 0) {
          dispatch(devicesActions.selectId(items[0].id));
        }
      } else {
        throw Error(await response.text());
      }
      navigate('/');
    } else if (query.get('eventId')) {
      const eventId = parseInt(query.get('eventId'), 10);
      navigate(`/event/${eventId}`);
    } else {
      setRedirectsHandled(true);
    }
  }, [query]);

  if (!redirectsHandled) {
    return (<LinearProgress />);
  }
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/change-server" element={<ChangeServerPage />} />
      <Route path="/" element={<App />}>
        <Route index element={<MainPage />} />

        <Route path="position/:id" element={<PositionPage />} />
        <Route path="network/:positionId" element={<NetworkPage />} />
        <Route path="event/:id" element={<EventPage />} />
        <Route path="replay" element={<ReplayPage />} />
        <Route path="geofences" element={<GeofencesPage />} />
        <Route path="tollstations" element={<TollstationsMapPage />} />
        <Route path="livecamera" element={<LiveCamera />} />

        <Route path="settings">
          <Route path="accumulators/:deviceId" element={<AccumulatorsPage />} />
          <Route path="calendars" element={<CalendarsPage />} />
          <Route path="calendar/:id" element={<CalendarPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="commands" element={<CommandsPage />} />
          <Route path="command/:id" element={<CommandPage />} />
          <Route path="command" element={<CommandPage />} />
          <Route path="command-send/:deviceId" element={<CommandSendPage />} />
          <Route path="attributes" element={<ComputedAttributesPage />} />
          <Route path="attribute/:id" element={<ComputedAttributePage />} />
          <Route path="attribute" element={<ComputedAttributePage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="device/:id/connections" element={<DeviceConnectionsPage />} />
          <Route path="device/:id" element={<DevicePage />} />
          <Route path="device" element={<DevicePage />} />
          <Route path="userdevices" element={<UserDevicesPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="driver/:id" element={<DriverPage />} />
          <Route path="driver" element={<DriverPage />} />
          <Route path="geofence/:id" element={<GeofencePage />} />
          <Route path="geofence" element={<GeofencePage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="group/:id/connections" element={<GroupConnectionsPage />} />
          <Route path="group/:id" element={<GroupPage />} />
          <Route path="group" element={<GroupPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="fuel/:id" element={<FuelPage />} />
          <Route path="fuel" element={<FuelPage />} />
          <Route path="fuels" element={<FuelsPage />} />
          <Route path="announcement/:id" element={<AnnouncementPage />} />
          <Route path="announcement" element={<AnnouncementPage />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="vehicle/:id" element={<VehiclePage />} />
          <Route path="vehicle" element={<VehiclePage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="tollstation/:id" element={<TollstationPage />} />
          <Route path="tollstation" element={<TollstationPage />} />
          <Route path="tollstations" element={<TollstationsPage />} />
          <Route path="tollstationfee/:id" element={<TollstationfeePage />} />
          <Route path="tollstationfee" element={<TollstationfeePage />} />
          <Route path="tollstationfees" element={<TollstationfeesPage />} />
          <Route path="maintenances" element={<MaintenancesPage />} />
          <Route path="maintenance/:id" element={<MaintenancePage />} />
          <Route path="maintenance" element={<MaintenancePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="notification/:id" element={<NotificationPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="preferences" element={<PreferencesPage />} />
          <Route path="server" element={<ServerPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="user/:id/connections" element={<UserConnectionsPage />} />
          <Route path="user/:id" element={<UserPage />} />
          <Route path="user" element={<UserPage />} />
        </Route>

        <Route path="reports">
          <Route path="combined" element={<CombinedReportPage />} />
          <Route path="chart" element={<ChartReportPage />} />
          <Route path="event" element={<EventReportPage />} />
          <Route path="tollstation" element={<TollstationReportPage />} />
          <Route path="overspeed" element={<OverspeedReportPage />} />
          <Route path="route" element={<RouteReportPage />} />
          <Route path="stop" element={<StopReportPage />} />
          <Route path="summary" element={<SummaryReportPage />} />
          <Route path="fuelsummary" element={<FuelSummaryReportPage />} />
          <Route path="trip" element={<TripReportPage />} />
          <Route path="scheduled" element={<ScheduledPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="cameraimage" element={<CameraImageReportPage />} />
          <Route path="cameravideo" element={<CameraVideoReportPage />} />

        </Route>
      </Route>
    </Routes>
  );
};

export default Navigation;
