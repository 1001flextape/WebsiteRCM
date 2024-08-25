// libraries
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// mine
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';
import { postMediaManagerRenameFolderGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-renameFolder.store';
import { getMediaManagerPageGraphQL } from '@/pages-scripts/portal/media-manager/store/mediaManager-getPage.store';

function RenameFolderSelectionModal({ isOpened, onClose }) {
  const router = useRouter();
  const { mediaManager, setMediaManager } = useContext(SelectMediaManagerContext);

  const [name, setName] = useState('');

  const handleSubmit = () => {
    postMediaManagerRenameFolderGraphQL({
      id: mediaManager.selectedFolderId,
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
    setName(mediaManager.selectFolderName);
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
        Rename Folder
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
        <Button onClick={handleSubmit} variant="contained" disabled={!name}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}

RenameFolderSelectionModal.propTypes = {
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
};

export default RenameFolderSelectionModal;
