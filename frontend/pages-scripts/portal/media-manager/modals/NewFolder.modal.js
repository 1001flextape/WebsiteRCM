// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// mine
import { postMediaManagerNewFolderGraphQL } from '../store/mediaManager-addFolder.store';
import { MediaManagerContext } from '../context/mediaManager.context';
import { getMediaManagerPageGraphQL } from '../store/mediaManager-getPage.store';

function NewFolderModal({ isOpened, onClose }) {
  const { mediaManager, setMediaManager } = useContext(MediaManagerContext);
  const router = useRouter();

  const [name, setName] = useState('');

  const handleSubmit = () => {
    postMediaManagerNewFolderGraphQL({
      name,
      folderId: router.query?.id,
    }).then(result => {
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
      <DialogTitle style={{ padding: '16px 24px' }}>
        Create a new folder.
      </DialogTitle>

      <DialogContent style={{ padding: '5px 20px 20px 20px', minWidth: "300px" }}>
        <TextField
          id="outlined-basic"
          label="Folder name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!name}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewFolderModal;
