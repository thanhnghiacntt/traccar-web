import React, { useEffect, useState } from 'react';
import { Link } from '@mui/material';

import { useCatch } from '../../reactHelper';
import { useTranslation } from './LocalizationProvider';

const AddressInstance = ({ latitude, longitude }) => {
  const t = useTranslation();
  const [address, setAddress] = useState();
  const getAddress = useCatch(async () => {
    const query = new URLSearchParams({ latitude, longitude });
    const response = await fetch(`/api/server/geocode?${query.toString()}`);
    if (response.ok) {
      setAddress(await response.text());
    } else {
      throw Error(await response.text());
    }
  });
  useEffect(() => {
    getAddress();
  }, [latitude, longitude]);

  if (address) {
    return address;
  }
  return (<Link href="#" onClick={getAddress}>{t('sharedShowAddress')}</Link>);
};
export default AddressInstance;
