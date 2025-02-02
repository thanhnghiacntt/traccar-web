import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import MenuIcon from '@mui/icons-material/Menu';
// import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';

// import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import AdbIcon from '@mui/icons-material/Adb';
import { makeStyles, useTheme } from '@mui/styles';
import { green, grey } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';
import { useTranslation } from './LocalizationProvider';
import { nativePostMessage } from './NativeInterface';
import { sessionActions } from '../../store';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    gap: theme.spacing(1),
    height: '20px',
    fontSize: '14px',
    fontWeight: 'bolder',
    color: grey[700],
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    width: theme.dimensions.drawerWidthTablet,
  },
  linkButton: {
    fontSize: '14px',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textTransform: 'none',
    color: grey[600],
    '&:hover': {
      backgroundColor: green[200],
      textDecoration: 'underline',
      color: green[600],
    },
  },
  linkButtonActive: {
    fontSize: '14px',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textTransform: 'none',
    color: green[900],
    '&:hover': {
      backgroundColor: green[200],
      textDecoration: 'underline',

    },
  },
}));

const ToolbarEx = () => {
  const navigate = useNavigate();
  const t = useTranslation();
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();
  // const theme = useTheme();
  const handleLogout = async () => {
    setAnchorElUser(null);
    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };
  const handleAccount = () => {
    setAnchorElUser(null);

    navigate(`/settings/user/${user.id}`);
  };
  const handleSelection = (value) => {
    // console.log(value);
    switch (value) {
      case 'map':
        navigate('/');
        break;
      case 'camera':
        navigate('/livecamera');
        break;
      case 'history':
        navigate('/replay');
        break;
      case 'manager':
        navigate('/settings/preferences');
        break;
      case 'comreport':
        // setAnchorEl(event.reports/route);
        navigate('/reports/route');
        break;
      case 'qcvn31':
        // setAnchorEl(event.reports/route);
        navigate('/reports/overspeed');
        break;
      case 'support':
        // setAnchorElsp(event.currentTarget);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: theme.palette.colors.toolbar,
        borderRadius: '8px',
        width: '100%',
      }}
    >
      <List style={{ display: 'flex', width: '100%', marginLeft: '10px', background: theme.palette.colors.toolbar }}>
        <ListItem
          disablePadding
        >
          <Button
            onClick={() => handleSelection('map')}
            variant="text"
            size="small"
            className={classes.linkButtonActive}
          >

            {t('toobarExMap')}
          </Button>

        </ListItem>
        <ListItem
          disablePadding
        >
          <Button
            onClick={() => handleSelection('camera')}
            variant="text"
            size="small"
            className={classes.linkButton}
          >

            {t('toobarExCamera')}
          </Button>

        </ListItem>
        <ListItem
          disablePadding

        >
          <Button
            onClick={() => handleSelection('history')}
            variant="text"
            size="small"
            className={classes.linkButton}

          >

            {t('toobarExHistory')}
          </Button>
        </ListItem>
        <ListItem
          disablePadding
        >
          <Button
            onClick={() => handleSelection('comreport')}
            variant="text"
            size="small"
            className={classes.linkButton}

          >

            {t('toobarExComReport')}
          </Button>
        </ListItem>
        <ListItem
          disablePadding
        >
          <Button
            onClick={() => handleSelection('manager')}
            variant="text"
            size="small"
            className={classes.linkButton}

          >

            {t('toobarExManager')}
          </Button>
        </ListItem>
        <ListItem
          disablePadding
        >
          <Button
            onClick={handleClick}
            variant="text"
            size="small"
            className={classes.linkButton}

          >

            {t('toobarExSupport')}
          </Button>
        </ListItem>
      </List>

      <Box sx={{ marginRight: '14px' }}>
        <Tooltip title="Thông tin tài khoản">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleAccount}>
            <Typography color="textPrimary">{t('settingsUser')}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography color="error">{t('loginLogout')}</Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Vùng miền</TableCell>
                <TableCell align="right">Hotline</TableCell>
                <TableCell align="right">Gia hạn dịch vụ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="right">Miền Bắc</TableCell>
                <TableCell align="right">0978702238</TableCell>
                <TableCell align="right">0978702238</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Miền Trung</TableCell>
                <TableCell align="right">0978702238</TableCell>
                <TableCell align="right">0978702238</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="right">Miền Nam</TableCell>
                <TableCell align="right">0978702238</TableCell>
                <TableCell align="right">0978702238</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Popover>
    </Box>
  );
};
export default ToolbarEx;
