import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';

const ImageViewer = ({ src }) => (
  <ImageListItem>
    <img
      src={`${src}?w=196&fit=crop&auto=format`}
      srcSet={`${src}?w=196&fit=crop&auto=format&dpr=2 2x`}
      alt=""
      loading="lazy"
    />
  </ImageListItem>
);

export default ImageViewer;
