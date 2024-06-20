import { useMemo } from 'react';

export default (t) => useMemo(() => ({
  name: {
    name: t('driverName'),
    type: 'string',
  },
  phone: {
    name: t('driverPhone'),
    type: 'string',
  },
  aprovalDate: {
    name: t('driveraprovaldate'),
    type: 'string',
  },
  expirationDate: {
    name: t('driverexpirationdate'),
    type: 'string',
  },
  license: {
    name: t('driverLicense'),
    type: 'string',
  },
  citizenId: {
    name: t('driverCitizenID'),
    type: 'string',
  },
}), [t]);
