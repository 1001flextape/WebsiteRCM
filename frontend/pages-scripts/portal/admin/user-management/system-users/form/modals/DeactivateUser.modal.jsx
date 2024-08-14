// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';
import { UserContext } from '../context/SystemUser.context';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';

function DeactivateUserModal({ isOpened, onClose }) {

  const {
    email,
    isDeactivatedState,
    setIsDeactivatedValue,


    reactivateUser,
    deactivateUser,
  } = useContext(UserContext)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [input, setInput] = useState("")

  const handleDeactivateUserSubmit = () => {

    if (onClose) {
      onClose()
    }
    setInput("")

    if (input === email) {
      if (isDeactivatedState.booleanValue) {
        reactivateUser()
      } else {
        deactivateUser()
      }
    }

  }

  const handleDisableSubmit = (event) => {
    const text = event.target.value;

    if (text === email) {
      setIsSubmitDisabled(false)
    } else {
      setIsSubmitDisabled(true)
    }
  }


  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header={isDeactivatedState.booleanValue ? "Activate User" : "Deactivate User"}
      onSubmit={handleDeactivateUserSubmit}
      submitLabel={isDeactivatedState.booleanValue ? "Activate User" : "Deactivate User"}
      disableSubmit={isSubmitDisabled}
    >
      {/* <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      > */}
      <Typography variant="h6" gutterBottom>
        {isDeactivatedState.booleanValue && "This user currently does not have access."}
        {!isDeactivatedState.booleanValue && "This user currently has access."}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <br />
        <div>
          Please type "{email}" to {isDeactivatedState.booleanValue ? "activate" : "deactivate"}
        </div>
        <TextField
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleDisableSubmit(e);
          }}
        />
        {/* <Typography variant="body1" sx={{ mr: 1 }}>
          /p/
        </Typography>
        <TextField
          label="Slug"
          variant="outlined"
          fullWidth
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        /> */}
      </Box>
      {/* </Box> */}
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeactivateUserModal
