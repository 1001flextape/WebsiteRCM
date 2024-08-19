// libraries
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// mine
import { MediaManagerContext } from '../context/mediaManager.context';
import { postMediaManagerRestoreFileGraphQL } from '../store/mediaManager-restoreTrashedFile.store copy';
import { getMediaManagerTrashedPageGraphQL } from '../store/mediaManager-getTrashedPage.store';

function RestoreFileModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext);

  const handleSubmit = () => {
    postMediaManagerRestoreFileGraphQL({
      id: mediaManager.selectedFileId,
    }).then(() => {
      // if in trash view, refresh to show it is out of the trash.
      if (router.pathname === "/portal/media-manager/trash") {
        getMediaManagerTrashedPageGraphQL().then(result => {
          const files = result.data.backendMediaManagerFile_viewTrash;

          setMediaManager(prevState => ({
            ...prevState,
            files,
          }));
        });
      }
    });

    onClose();
  };

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
        Restore File
      </DialogTitle>

      <DialogContent style={{ padding: '10px 20px', minWidth: '300px' }}>
        <Typography variant="body1">
          Are you sure you want to restore this file?
        </Typography>
        <Typography variant="h6" style={{ marginTop: '10px' }}>
          "{mediaManager.selectFileName}"
        </Typography>
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Restore
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RestoreFileModal;
