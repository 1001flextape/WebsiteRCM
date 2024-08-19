// libraries
import React, { useContext } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// mine
import { postMediaManagerDeleteFileGraphQL } from '../store/mediaManager-deleteFile.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

function DeleteFileModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext);

  const handleSubmit = () => {
    postMediaManagerDeleteFileGraphQL({
      id: mediaManager.selectedFileId,
      folderId: router.query.id,
    }).then(() => {
      getMediaManagerPageGraphQL({
        folderId: router.query?.id,
      }).then(result => {
        const foldersFromServer = result.data.backendMediaManagerFolder_getMany;
        const filesFromServer = result.data.backendMediaManagerFile_getMany;

        setMediaManager(prevState => ({
          ...prevState,
          files: filesFromServer,
          folders: foldersFromServer,
        }));
      });
    });

    onClose();
  };

  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        style: {
          padding: 0,
        }
      }}
    >
      <DialogTitle style={{ padding: '16px 24px', color: 'red' }}>
        Delete File
      </DialogTitle>

      <DialogContent style={{ padding: '5px 20px 20px 20px', minWidth: "300px" }}>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this file?
        </Typography>
        <Typography variant="h6" color="error">
          "{mediaManager.selectFileName}"
        </Typography>
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteFileModal;
