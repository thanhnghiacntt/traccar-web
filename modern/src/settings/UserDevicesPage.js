import React, { useState } from 'react';
import CollapsibleTable from './components/CollapsibleTable';
import { useEffectAsync } from '../reactHelper';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import CollectionFab from './components/CollectionFab';

const UserDevicesPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/userdevices');
      if (response.ok) {
        const result = await response.json();
        setItems(result);
        console.log(result[0].userName);
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'userDevices']}>
      { !loading ? (
        <CollapsibleTable
          rows={items}
        />
      ) : (<div>no content</div>)}
      <CollectionFab editPath="/settings/device" />
    </PageLayout>
  );
};

export default UserDevicesPage;
