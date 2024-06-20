import { useTranslation } from './LocalizationProvider';

const getErrorMsg = (message) => {
  const t = useTranslation();
  if (message) {
    if (message.includes('Time period exceeds the limit')) { return t('errorExceedDay'); }
    if (message.includes('Service Unavailable')) { return t('serviceUnavailable'); }
    if (message.includes('Error occurred while')) { return t('serviceUnavailable'); }
  }
  return message;
};
export default getErrorMsg;
