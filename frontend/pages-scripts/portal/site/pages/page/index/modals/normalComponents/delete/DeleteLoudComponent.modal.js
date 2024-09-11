import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';

// MUI components
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';

// mine
import { SiteDesignerPageContext } from '../../../context/SiteDesignerPage.context';

function DeleteNormalComponentModal({ isOpened, onClose }) {

  const {
    normalSectionDeleteModal, setNormalSectionDeleteModal,

    handleNormalSectionDeletion,
  } = useContext(SiteDesignerPageContext)

  const [nameInput, setNameInput] = useState("")

  const handleSubmit = () => {
    handleNormalSectionDeletion()

    if (onClose) onClose();
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
        Delete Normal Section
      </DialogTitle>

      <DialogContent style={{ padding: '20px', minWidth: "300px" }}>
        <Typography variant="body1" color="textSecondary">
          Please enter the section name "{normalSectionDeleteModal.name}" to delete it.
        </Typography>
        <br />
        <TextField
          id="outlined-basic"
          label="Normal Section Name"
          variant="outlined"
          fullWidth
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
        />
      </DialogContent>

      <DialogActions style={{ padding: '8px 24px', borderTop: "2px solid #dbdbdb" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          style={{ marginRight: '8px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="error"
          disabled={nameInput !== normalSectionDeleteModal.name}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteNormalComponentModal;
