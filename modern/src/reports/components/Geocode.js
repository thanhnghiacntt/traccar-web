import React, { useState } from 'react';
import { Typography, Link } from '@mui/material';
import { useTranslation } from '../../common/components/LocalizationProvider';

const Geocode = ({ latitude, longitude }) => {
  const [address, setAddress] = useState(null);
  const t = useTranslation();

  const fetchAddress = () => {
    fetch(`/api/server/geocode?latitude=${latitude}&longitude=${longitude}`)
      .then((response) => response.text()) // Chuyển đổi response thành text
      .then((data) => {
        setAddress(data); // Sử dụng trực tiếp văn bản trả về
      })
      .catch((error) => console.error('Error fetching address:', error));
  };

  return (
    <Typography>
      {address !== null ? (
        <span>{address}</span>
      ) : (
        <Link href="#" onClick={(e) => { e.preventDefault(); fetchAddress(); }} underline="always">
          {t('sharedShowAddress')}
        </Link>
      )}
    </Typography>
  );
};

export default Geocode;
