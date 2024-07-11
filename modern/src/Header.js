import React from 'react';
import { makeStyles } from '@mui/styles';
import { useTranslation } from './common/components/LocalizationProvider';

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#0959a1',
    borderRadius: 0,
    height: 60,
    marginBottom: 0,
  },
  colorText: {
    color: 'white',
  },
  dropdownMenuHover: {
    '&:hover .dropdown-menu': {
      display: 'block',
    },
  },
  dropdownMenuLinkHover: {
    '& li a:hover': {
      backgroundColor: '#0959a1',
    },
  },
  listItemLink: {
    background: '#0959a1',
    border: '0px solid #fff',
    textAlign: 'left',
    overflow: 'hidden',
    fontSize: 'medium',
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#ffffff',
    height: '100%',
    marginBottom: '0px',
    boxShadow: '1px 1px 5px -4px rgba(0, 0, 0, 0.4)',
    transition: 'all linear 0.15s',
  },
  colorBackground: {
    background: '#ffffff',
  },
});

const Header = () => {
  const classes = useStyles();
  const t = useTranslation();

  return (
    <nav className={`navbar ${classes.navbar}`}>
      <div className="container-fluid">
        <div className="navbar-header" />
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className={`dropdown ${classes.dropdownMenuHover}`}>
              <a href="#" className={`dropdown-toggle ${classes.listItemLink} ${classes.colorText}`} data-toggle="dropdown" role="button" aria-expanded="false">
                {t('enterpriseReport')}
                <span className="caret" />
              </a>
              <ul className={`dropdown-menu ${classes.dropdownMenuLinkHover}`} role="menu">
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="/reports/totalmonthreport">{t('totalMonthReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('distinctReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('turnOffEngineReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('quotaReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('airConditioningReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('tripReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('tripByVehicleReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('tollStationReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('signalLossReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('pulseErrorReport')}</a></li>
              </ul>
            </li>
            <li className={`dropdown ${classes.dropdownMenuHover}`}>
              <a href="/reports/transportreport" className={`dropdown-toggle ${classes.listItemLink} ${classes.colorText}`} data-toggle="dropdown" role="button" aria-expanded="false">
                {t('ministryTransportReport')}
                <span className="caret" />
              </a>
              <ul className={`dropdown-menu ${classes.dropdownMenuLinkHover}`} role="menu">
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('changeVehicleReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('speedupReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('speedLimitReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('timeDrivingReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('stopReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('totalByVehicleReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('generalReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('drivingTimeOnDayReport')}</a></li>
                <li><a className={`${classes.listItemLink} ${classes.colorBackground}`} href="#">{t('dataTransmissionReport')}</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
