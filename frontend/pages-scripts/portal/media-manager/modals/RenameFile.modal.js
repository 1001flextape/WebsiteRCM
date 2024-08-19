// libraries
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// mine
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';
import { postMediaManagerRenameFileGraphQL } from '../store/mediaManager-renameFile.store';
import { MediaManagerContext } from '../context/mediaManager.context';

function RenameFileModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext);

  const [name, setName] = useState('');

  const handleSubmit = () => {
    postMediaManagerRenameFileGraphQL({
      id: mediaManager.selectedFileId,
      name,
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

export default RenameFileModal;
