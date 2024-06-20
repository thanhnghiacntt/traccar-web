import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from 'react-router-dom';
import LinkIcon from '@mui/icons-material/Link';
// import { yellow } from '@mui/material/colors';
// import { red } from '@mui/material/colors';

import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from '../../common/components/LocalizationProvider';
import CollectionActions from './CollectionActions';
import { usePreference } from '../../common/util/preferences';
import { formatTime } from '../../common/util/formatter';
import { useDeviceReadonly } from '../../common/util/permissions';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: '1%',
    paddingRight: theme.spacing(1),
  },
  rowHead: {
    fontSize: '9px',
    backgroundColor: '#f2f7f4',
    color: 'black',
  },
  expire: {
    backgroundColor: 'red',
    color: 'white',
  },
  expireWaring: {
    backgroundColor: 'yellow',
    color: 'black',
  },
  active: {
    backgroundColor: 'green',
    color: 'black',
  },
}));

const Row = ({ item }) => {
  const [open, setOpen] = React.useState(true);
  console.log(item);
  const { contactNumber, expirationTime, userName, devices } = item;
  const classes = useStyles();
  const navigate = useNavigate();
  const t = useTranslation();

  const hours12 = usePreference('twelveHourFormat');

  const deviceReadonly = useDeviceReadonly();

  const actionConnections = {
    key: 'connections',
    title: t('sharedConnections'),
    icon: <LinkIcon fontSize="small" />,
    handler: (deviceId) => navigate(`/settings/device/${deviceId}/connections`),
  };
  const dateCompare = (expire) => {
    if (!expire) return -1;
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(expire);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    console.log(diffDays);
    return diffDays;
  };
  const getCss = (value) => {
    const days = dateCompare(value);
    if (days <= 7 && days >= 0) return classes.expireWaring;
    if (days < 0) {
      return classes.expire;
    }
    return classes.active;
  };
  return (
    <>
      <TableRow
        className={classes.rowHead}
        sx={{
          '& .MuiTableCell-root': {
            height: '10px',
            padding: '0',
          },
          '&:last-child td, &:last-child th': {
            border: 0,
          },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <h4>{userName}</h4>
        </TableCell>
        <TableCell align="left">
          <h4>{contactNumber}</h4>
        </TableCell>
        <TableCell align="left">
          <h4>{formatTime(expirationTime, 'date', hours12)}</h4>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: '12px' }}>{t('sharedName')}</TableCell>
                    <TableCell style={{ fontSize: '12px' }}>{t('deviceIdentifier')}</TableCell>
                    <TableCell style={{ fontSize: '12px' }}>{t('sharedPhone')}</TableCell>
                    <TableCell style={{ fontSize: '12px' }}>{t('userExpirationTime')}</TableCell>
                    <TableCell style={{ fontSize: '12px' }} className={classes.columnAction}>
                      {t('action')}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {devices.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.uniqueId}</TableCell>
                      <TableCell>{item.phone}</TableCell>

                      <TableCell className={getCss(item.expirationTime)}>{formatTime(item.expirationTime, 'date', hours12)}</TableCell>

                      <TableCell className={classes.columnAction} padding="none">
                        <CollectionActions
                          itemId={item.id}
                          editPath="/settings/device"
                          endpoint="devices"
                          customActions={[actionConnections]}
                          readonly={deviceReadonly}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default Row;
