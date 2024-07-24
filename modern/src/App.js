import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinearProgress, useMediaQuery } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import theme from './common/theme';
import BottomMenu from './common/components/BottomMenu';
import SocketController from './SocketController';
import CachingController from './CachingController';
import { useEffectAsync } from './reactHelper';
import { sessionActions } from './store';
import ToolbarEx from './common/components/ToolbarEx';

const useStyles = makeStyles(() => ({
  page: {
    flexGrow: 1,
    overflow: 'auto',
  },
  menu: {
    zIndex: 1204,
  },
  navbar: {
    backgroundColor: '#0959a1',
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const desktop = useMediaQuery(theme.breakpoints.up('md'));

  const newServer = useSelector((state) => state.session.server.newServer);
  const initialized = useSelector((state) => !!state.session.user);

  useEffectAsync(async () => {
    if (!initialized) {
      const response = await fetch('/api/session');
      if (response.ok) {
        dispatch(sessionActions.updateUser(await response.json()));
      } else if (newServer) {
        navigate('/register');
      } else {
        navigate('/login');
      }
    }
    return null;
  }, [initialized]);

  return !initialized ? (<LinearProgress />) : (
    <>
      <SocketController />
      <CachingController />
      <ToolbarEx />
      <nav className={`navbar navbar-expand-lg navbar-light ${classes.navbar} fixed-top`}>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Bản đồ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Báo cáo</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className={classes.page}>
        <Outlet />
      </div>
      {!desktop && (
        <div className={classes.menu}>
          <BottomMenu />
        </div>
      )}
    </>
  );
};

export default App;
