// libraries
import React, { useContext, useState } from 'react'

// mine
// import { SiteDesignerPagesContext } from '../context/SiteDesignerPages.context';
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';
import { UsersContext } from '../context/SystemUsers.context';

function NewUserModal({ isOpened, onClose }) {
  const {      
    email, setEmail,
  } = useContext(UsersContext)

  const handleSubmit = () => {

    if (onClose) {
      onClose()
    }
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Create User"
      onSubmit={handleSubmit}
      submitLabel={"Create"}
    >
      <Typography variant="h6" gutterBottom>
        Enter the users email address
      </Typography>
      <br />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="johndoe@email.com"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
    </InformationModal>
  )
}

export default NewUserModal
