import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';

import { useTheme } from '@mui/material/styles';
import {
  ImageListItem,
} from '@mui/material';

const ImageDialog = ({ isOpen, handleClose, src }) => {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    card: {
      pointerEvents: 'auto',
      width: theme.dimensions.popupMaxWidth,
    },
    root: {
      '& .MuiPaper-root': {
        width: '100%',
        maxWidth: '650px', // Set your width here
      },
    },
    media: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
    mediaButton: {
      color: theme.palette.colors.white,
      mixBlendMode: 'difference',
      cursor: 'pointer',
    },
    paper: { minWidth: '800px' },
  }));
  const classes = useStyles(theme);
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
      >
        <DialogContent>
          <DialogContentText>
            <ImageListItem className={classes.media}>
              <img
                src={src}
                alt=""
                loading="lazy"
              />
            </ImageListItem>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CloseIcon fontSize="small" className={classes.mediaButton} autoFocus onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ImageDialog;
