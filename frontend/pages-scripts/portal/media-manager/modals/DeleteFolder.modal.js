import React, { useContext } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

// mine
import { postMediaManagerDeleteFolderGraphQL } from '../store/mediaManager-deleteFolder.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

function DeleteFolderModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext);

  const handleSubmit = () => {
    postMediaManagerDeleteFolderGraphQL({
      id: mediaManager.selectedFolderId,
      folderId: router.query?.id,
    }).then(postResult => {
      if (!postResult.errors) {
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
      } else {
        setMediaManager(prevState => ({
          ...prevState,
          modal_isDeleteFolderModalOpened: false,
          modal_isDeleteFolderFailedModalOpened: true,
        }));
      }
    }).catch((error) => {
      console.error('Error deleting folder:', error);
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
      <DialogTitle style={{ padding: '16px 24px', background: '#f44336', color: "#f1f4f5" }}>
        Delete Folder
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: '300px' }}>
        <Typography variant="body1" color="textSecondary">
          Are you sure you want to delete this folder?
        </Typography>
        <Typography variant="h6" color="error" style={{ marginTop: '4px' }}>
          "{mediaManager.selectFolderName}"
        </Typography>
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px', borderTop: "2px solid #dbdbdb" }}>
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

export default DeleteFolderModal;
