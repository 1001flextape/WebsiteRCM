import React, { useContext } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';
import { postMediaManagerDeleteFileGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-deleteFile.store';
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';

// mine


function DeleteFileSelectionModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(SelectMediaManagerContext);

  const handleSubmit = () => {
    postMediaManagerDeleteFileGraphQL({
      id: mediaManager.selectedFileId,
      folderId: mediaManager.explorerFolderId,
    }).then(() => {
      getMediaManagerPageGraphQL({
        folderId: mediaManager.explorerFolderId,
      }).then(result => {
        const foldersFromServer = result.data.backendMediaManagerFolder_getMany;
        const filesFromServer = result.data.backendMediaManagerFile_getMany;

        setMediaManager(prevState => ({
          ...prevState,
          files: filesFromServer,
          folders: foldersFromServer,
        }));
      });
    }).catch((error) => {
      console.error('Error deleting file:', error);
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
        Delete File
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
        <Typography variant="body1" color="textSecondary">
          Are you sure you want to delete this file?
        </Typography>
        <Typography variant="h6" color="error" style={{ marginTop: '4px' }}>
          "{mediaManager.selectFileName}"
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

export default DeleteFileSelectionModal;
