// libraries
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

function DeleteFolderFailedModal({ isOpened, onClose }) {

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        style: {
          padding: 0,
        }
      }}
    >
      <DialogTitle style={{ padding: '16px 24px' }}>
        Cannot Delete Folder
      </DialogTitle>

      <DialogContent style={{ padding: '10px 20px', minWidth: '300px' }}>
        <Typography variant="body1">
          You cannot delete a folder that contains files.
        </Typography>
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="contained" color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFolderFailedModal;
