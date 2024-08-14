// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';
import { UserContext } from '../context/SystemUser.context';

function DeleteUserModal({ isOpened, onClose }) {

  const {
    deleteUser,
    email,
  } = useContext(UserContext)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [input, setInput] = useState("")

  const handleDeleteUser = () => {

    if (onClose) {
      onClose()
    }

    if (input === email) {
      deleteUser()
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

  // // CreatePageForm.js
  // import React, { useState } from 'react';
  // import { Button, TextField, Box, Typography } from '@mui/material';

  // const CreatePageForm = ({ onCreatePage }) => {
  //   const [slug, setSlug] = useState('');

  //   const handleCreatePage = () => {
  //     // Perform any necessary validation before creating the page
  //     if (slug.trim() !== '') {
  //       onCreatePage(slug);
  //     }
  //   };

  //   return (
  //     <Box
  //       sx={{
  //         width: 400,
  //         bgcolor: 'background.paper',
  //         boxShadow: 24,
  //         p: 4,
  //       }}
  //     >
  //       <Typography variant="h6" gutterBottom>
  //         Choose a Slug for the New Page
  //       </Typography>
  //       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  //         <Typography variant="body1" sx={{ mr: 1 }}>
  //           /p/
  //         </Typography>
  //         <TextField
  //           label="Slug"
  //           variant="outlined"
  //           fullWidth
  //           value={slug}
  //           onChange={(e) => setSlug(e.target.value)}
  //         />
  //       </Box>
  //       <Button variant="contained" onClick={handleCreatePage}>
  //         Create Home Page
  //       </Button>
  //     </Box>
  //   );
  // };

  // export default CreatePageForm;


  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header={"Delete User"}
      onSubmit={handleDeleteUser}
      submitLabel={"Delete User"}
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
        <div>
          You can delete a user account only before the user has activated it by changing their temporary password. Once the password is changed, the account becomes active and deletion is no longer possible.
        </div>
        <br />
        <br />
        <div>
          Please type "{email}" to delete
        </div>
        <TextField
          label="Type email address here."
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            handleDisableSubmit(e);
          }}
        />
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>


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

export default DeleteUserModal
