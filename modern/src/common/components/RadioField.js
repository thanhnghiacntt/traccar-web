import {
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffectAsync } from '../../reactHelper';

const RadioField = ({
  endpoint,
}) => {
  const [item, setItem] = useState();

  useEffectAsync(async () => {
    if (endpoint) {
      console.log(endpoint);
      const response = await fetch(endpoint);
      if (response.ok) {
        setItem(await response.json());
      } else {
        throw Error(await response.text());
      }
    }
  }, []);

  if (item) {
    return (
      <InputLabel>
        <input
          type="radio"
          value="Toll statio"
        />
      </InputLabel>

    );
  }
  return null;
};

export default RadioField;
