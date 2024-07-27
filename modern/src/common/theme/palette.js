import {
  grey, green, indigo, red, common, blue,
} from '@mui/material/colors';

const colors = {
  white: common.white,
  background: grey[50],
  primary: indigo[900],
  secondary: green[800],
  positive: green[500],
  medium: blue[900],
  negative: red[500],
  neutral: grey[500],
  geometry: '#3bb2d0',
  device: grey[900],
};

export default {
  background: {
    default: colors.background,
  },
  primary: {
    main: colors.positive,
  },
  secondary: {
    main: colors.secondary,
    contrastText: colors.white,
  },
  colors,
};
