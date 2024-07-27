// libraries
import React, { useContext, useState } from 'react'

// mine
// import { SiteDesignerPagesContext } from '../context/SiteDesignerPages.context';
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';
import { RoleContext } from '../context/Roles.context';

function NewRoleModal({ isOpened, onClose }) {
  // const {
  //   slug, setSlug,
  //   hasHomePage,
  //   createPage,
  //   createHomePage,
  // } = useContext(SiteDesignerPagesContext)

  const {
    role, setRole,
    newRoleName, setNewRoleName,
    createRole,
  } = useContext(RoleContext)

  const handleSubmit = () => {

    if (onClose) {
      onClose()
    }

    createRole()
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Create Role"
      onSubmit={handleSubmit}
      submitLabel={"Create"}
    >
      <Typography variant="h6" gutterBottom>
        Choose a Name for the New Role
      </Typography>
      <br />
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Cool Role Name"
          variant="outlined"
          fullWidth
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
      </Box>
    </InformationModal>
  )
}

export default NewRoleModal
