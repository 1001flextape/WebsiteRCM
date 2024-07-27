// libraries
import React, { useContext, useState } from 'react'

// mine
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';
import { RoleContext } from '../context/Role.context';

function DeleteRoleModal({ isOpened, onClose }) {
  const {
    currentName,
    deleteRole
  } = useContext(RoleContext)

  const [input, setInput] = useState("")

  const handleSubmit = () => {

    if (input === currentName) {
      deleteRole()
    }
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete Role"
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <Typography variant="h6" gutterBottom>
        Enter the role name to delete the role:
        <br />
        "{currentName}"
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Role Name"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      {/* </Box> */}
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeleteRoleModal
