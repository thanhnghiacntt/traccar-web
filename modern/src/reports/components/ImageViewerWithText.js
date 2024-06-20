import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
// import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Stack from '@mui/material/Stack';
// import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { IconButton } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const www = 'https://www.vngts.com';

const ImageViewerWithText = ({ src, time, positionId, handleClick }) => {
  console.log(positionId);
  // console.log(selectedItem);
  return (
    <div>
      <ImageListItem>
        <img
          src={`${www + src}?w=196&fit=crop&auto=format`}
          srcSet={`${www + src}?w=196&fit=crop&auto=format&dpr=2 2x`}
          alt=""
          loading="lazy"
        />
      </ImageListItem>
      <Stack direction="row" alignItems="center" gap={1} spacing={2}>
        {positionId ? (
          <IconButton size="small" onClick={() => handleClick(positionId)}>
            <GpsFixedIcon fontSize="small" />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={() => handleClick(null)}>
            <LocationSearchingIcon fontSize="small" />
          </IconButton>
        )}
        {time}
      </Stack>

    </div>
  );
};

export default ImageViewerWithText;
