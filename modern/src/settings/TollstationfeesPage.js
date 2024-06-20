import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import CollectionFab from './components/CollectionFab';
import CollectionActions from './components/CollectionActions';
import TableShimmer from '../common/components/TableShimmer';
import SearchHeader, { filterByKeyword } from './components/SearchHeader';
import LabelField from '../common/components/LabelField';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: '1%',
    paddingRight: theme.spacing(1),
  },
}));

const TollstationfeesPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tollstationfees');
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'settingsGroups']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('sysTollstation')}</TableCell>
            <TableCell>{t('sysTollstationlink')}</TableCell>
            <TableCell>{t('sysVehiclType')}</TableCell>
            <TableCell>{t('sysTollstationPrice')}</TableCell>

            <TableCell className={classes.columnAction} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <LabelField
                  endpoint={`/api/tollstations/${item.tollstationId}`}
                />
              </TableCell>
              <TableCell>
                {item.tollstationlinkId && (
                <LabelField
                  endpoint={`/api/tollstations/${item.tollstationlinkId}`}
                />
                )}
              </TableCell>
              <TableCell>
                <LabelField
                  endpoint={`/api/vehicles/${item.vehicletypeId}`}
                />
              </TableCell>
              <TableCell>{item.fee}</TableCell>

              <TableCell className={classes.columnAction} padding="none">
                <CollectionActions
                  itemId={item.id}
                  editPath="/settings/tollstationfee"
                  endpoint="tollstationfees"
                  setTimestamp={setTimestamp}
                />
              </TableCell>
            </TableRow>
          )) : (<TableShimmer columns={2} endAction />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/tollstationfee" />
    </PageLayout>
  );
};

export default TollstationfeesPage;
