// libraries
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';
import { postMediaManagerRenameFileGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-renameFile.store';
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';

// mine

function RenameFileSelectionModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(SelectMediaManagerContext);

  const [name, setName] = useState('');

  const handleSubmit = () => {
    console.log('explorerFolderId:', mediaManager.explorerFolderId)
    postMediaManagerRenameFileGraphQL({
      id: mediaManager.selectedFileId,
      name,
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
    });

    onClose();
  };

  useEffect(() => {
    setName(mediaManager.selectFileName);
  }, [mediaManager]);

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
      <DialogTitle style={{ padding: '16px 24px' }}>
        Rename file.
      </DialogTitle>

      <DialogContent style={{ padding: '5px 20px 20px 20px', minWidth: "300px" }}>
        <TextField
          id="outlined-basic"
          label="File name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RenameFileSelectionModal;
