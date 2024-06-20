import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FormControl, InputLabel, Select, MenuItem,
  IconButton, Table, TableBody, TableCell, TableHead, TableRow,
} from '@mui/material';
import Download from '@mui/icons-material/Download';
import PlayCircle from '@mui/icons-material/PlayCircle';

import { useSelector } from 'react-redux';
import TableShimmer from '../common/components/TableShimmer';
import { formatTime } from '../common/util/formatter';
import ReportFilter from './components/ReportFilter';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import ReportsMenu from './components/ReportsMenu';
// import ImageViewerWithText from './components/ImageViewerWithText';

import { useCatch } from '../reactHelper';
import useReportStyles from './common/useReportStyles';
import scheduleReport from './common/scheduleReport';

const CameraVideoReportPage = () => {
  const navigate = useNavigate();
  const classes = useReportStyles();
  const t = useTranslation();

  const devices = useSelector((state) => state.devices.items);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedChanel, setChanel] = useState('0');
  const [devicename, SetDeviceName] = useState('');

  const url = `http://${process.env.REACT_APP_VIDEO_AUTH_URL}/StandardApiAction_login.action?account=${process.env.REACT_APP_VIDEO_ACCOUNT}&password=${process.env.REACT_APP_VIDEO_PASSWORD}`;
  let swfobject = null;

  const initFlash = () => {
    // eslint-disable-next-line no-undef
    swfobject = new Cmsv6Player({
      domId: 'cmsv6flash',
      isVodMode: true,
      width: 400,
      height: 300,
      lang: 'en',
    });
    if (swfobject === undefined || swfobject.setWindowNum === undefined || swfobject === null) {
      setTimeout(initFlash, 50);
    } else {
      const serverIp = process.env.REACT_APP_VIDEO_AUTH_URL;
      const serverPort = '6605';
      swfobject.setWindowNum(1);
      swfobject.setServerInfo(serverIp, serverPort);
    }
  };
  const handleSubmit = useCatch(async ({ deviceId, from, to, type }) => {
    const query = new URLSearchParams({ deviceId, from, to });
    query.append('type', type);
    const mdvrId = devices[deviceId].imeimdvr ? devices[deviceId].imeimdvr : 0;
    const devname = devices[deviceId].name ? devices[deviceId].name : '';
    SetDeviceName(devname);
    // if (imeimdvr) setImeimdvr(mdvrId);
    setLoading(true);
    initFlash();
    try {
      const response = await fetch(url);
      if (response.ok) {
        const items = await response.json();
        // console.log(items.jsession);
        if (items.result === 0) {
        // setJsession(items.jsession);
          const devIdno = mdvrId;
          const stream = 1;
          const chanel = selectedChanel;
          const [day, month, year] = formatTime(from, 'date', false).split('-');
          const [h, m, s] = formatTime(from, 'time', false).split(':');
          const startTimeSeconds = h * 60 * 60 + m * 60 + s;
          const [h1, m1] = formatTime(to, 'time', false).split(':');
          const endTimeSeconds = h1 * 60 * 60 + m1 * 60;

          const { jsession } = items;
          // console.log(`${devIdno}->${stream}->${chanel}->${day}->${startTimeSeconds}->${endTimeSeconds}->${jsession}`);
          const options = {
            DevIDNO: devIdno,
            LOC: 1,
            CHN: chanel,
            YEAR: year,
            MON: month,
            DAY: day,
            RECTYPE: -1,
            FILEATTR: 2,
            DownType: 2,
            jsession,
            BEG: startTimeSeconds,
            END: endTimeSeconds,
            ARM1: 0,
            ARM2: 0,
            RES: 0,
            STREAM: stream,
            STORE: 0,
          };
          // console.log(options);
          const query = new URLSearchParams(options);
          const urlwithparams = `http://${process.env.REACT_APP_VIDEO_AUTH_URL}/StandardApiAction_getVideoFileInfo.action?${query.toString()}`;
          // console.log(urlwithparams);
          const response = await fetch(urlwithparams, {
            method: 'POST',
          });
          if (response.ok) {
          // setSnackbarOpen(true);
            const items = await response.json();
            const { result, files } = items;

            // console.log(items);
            if (result === 0 || result === 26) {
              // console.log(items);
              setItems(files);
              // console.log(filestest);
            } else {
              // console.log(message);
              // setItems(filestest);
              // console.log(filestest);
              throw Error(t('cameraoffline'));
            }
          } else {
            throw Error(await response.text());
          }
        }
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
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
  function zeroPad(input, length) {
    return (Array(length + 1).join('0') + input).slice(-length);
  }
  function convertSecondToTime(sec) {
    const hour = parseInt(sec / 3600, 10);
    let remaining = sec - hour * 3600;
    const minute = parseInt(remaining / 60, 10);
    remaining -= minute * 60;
    return `${zeroPad(hour, 2)}:${zeroPad(minute, 2)}:${zeroPad(remaining, 2)}`;
  }

  function videoFileReplay(item) {
    let playbackURL = item.PlaybackUrl;
    playbackURL = playbackURL.replaceAll('FILECHN=0', `FILECHN=${selectedChanel}`);
    playbackURL = playbackURL.replaceAll('PLAYCHN=0', `PLAYCHN=${selectedChanel}`);
    if (swfobject === null) initFlash();
    swfobject.setVideoInfo(0, '');
    swfobject.stopVodM();
    swfobject.startVodM(playbackURL, '');
    const section = document.querySelector('#cmsv6flash');
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // console.log(playbackURL);
  }
  return (
    <PageLayout menu={<ReportsMenu />} breadcrumbs={['reportTitle', 'reportEvents']}>
      <div className={classes.container}>
        <div className={classes.containerMain}>
          <div className={classes.header}>
            <ReportFilter handleSubmit={handleSubmit} handleSchedule={handleSchedule}>
              <div className={classes.filterItem}>
                <FormControl fullWidth>
                  <InputLabel>{t('reportEventTypes')}</InputLabel>
                  <Select
                    label={t('reportEventTypes')}
                    value={selectedChanel}
                    onChange={(event, child) => {
                      let values = event.target.value;
                      const clicked = child.props.value;
                      if (values.includes('ch1') && values.length > 1) {
                        values = [clicked];
                      }
                      setChanel(clicked);
                      // console.log(clicked);
                    }}
                  >
                    <MenuItem key="ch1" value="0">{t('videoch1')}</MenuItem>
                    <MenuItem key="ch2" value="1">{t('videoch2')}</MenuItem>
                    <MenuItem key="ch3" value="2">{t('videoch3')}</MenuItem>
                    <MenuItem key="ch4" value="3">{t('videoch4')}</MenuItem>

                  </Select>
                </FormControl>
              </div>
            </ReportFilter>

          </div>
          <div id="cmsv6flash" />
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.columnAction} />
                  <TableCell>{t('sharedDevice')}</TableCell>
                  <TableCell>{t('channel')}</TableCell>
                  <TableCell>{t('timeStart')}</TableCell>
                  <TableCell>{t('timeEnd')}</TableCell>
                  <TableCell>{t('videoType')}</TableCell>
                  <TableCell>{t('downLoad')}</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {!loading ? items?.map((item) => (
                  <TableRow key={item.file}>
                    <TableCell className={classes.columnAction} padding="none">
                      <IconButton size="small" onClick={() => videoFileReplay(item)}>
                        <PlayCircle fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>{devicename}</TableCell>
                    <TableCell>{Number(selectedChanel) + 1}</TableCell>
                    <TableCell>{convertSecondToTime(item.beg)}</TableCell>
                    <TableCell>{convertSecondToTime(item.end)}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <Download fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )) : (<TableShimmer columns={5 + 2} startAction />)}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CameraVideoReportPage;
