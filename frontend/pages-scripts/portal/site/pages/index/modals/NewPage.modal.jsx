// libraries
import React, { useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography, Box } from '@mui/material';

// mine
import { SiteDesignerPagesContext } from '../context/SiteDesignerPages.context';

function NewPageModal({ isOpened, onClose }) {
  const {
    slug, setSlug,
    hasHomePage,
    createPage,
    createHomePage,
    isHomePageOptionShowing, // Assuming this is the boolean to control the visibility of the "Create Home Page" button
  } = useContext(SiteDesignerPagesContext);

  const handleSlugChange = (e) => {
    let value = e.target.value;

    // Only allow URL-safe characters (letters, numbers, hyphen, underscore, period, and slash)
    const urlSafePattern = /^[a-zA-Z0-9-_./]*$/;

    if (slug.length === 0 && value === "/") {
      return;
    }

    // Prevent adding a "/" if the last character is already a "/"
    if (slug.endsWith('/') && value[value.length - 1] === '/') {
      return;
    }

    // Remove any characters not matching the URL-safe pattern
    if (urlSafePattern.test(value)) {
      setSlug(value.toLowerCase());
    }
  };

  const handleSubmitPage = () => {
    if (onClose) {
      onClose();
    }
    createPage();
  };

  const handleCreateHomePage = () => {
    if (onClose) {
      onClose();
    }
    createHomePage();
  };

  // Determine if the submit button should be disabled
  let isSubmitDisabled = !slug || slug.includes('//') || slug.startsWith('/') || slug.endsWith('/');

  if (slug.length === 0) {
    isSubmitDisabled = false;
  }

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
      <DialogTitle style={{ padding: '16px 24px', background: '#ffffff', color: '#000000' }}>
        Create New Page
      </DialogTitle>

      {isHomePageOptionShowing && (
        <DialogContent style={{ padding: '20px', minWidth: '300px', borderTop: '1px solid #dbdbdb' }}>
          <Button
            variant="contained"
            onClick={handleCreateHomePage}
            color="primary"
            style={{ marginBottom: '12px', width: 'auto' }} // Adjusted width
            disabled={hasHomePage}
          >
            Create Home Page
          </Button>
        </DialogContent>
      )}
      <DialogContent style={{ padding: '20px', minWidth: '300px', borderTop: '1px solid #dbdbdb' }}>
        <Typography variant="body1" gutterBottom>
          Create a page under "/p/" domain:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, height: "95px", }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            /p/
          </Typography>
          <TextField
            label="Slug"
            variant="outlined"
            fullWidth
            value={slug}
            onChange={handleSlugChange}
            sx={{ flex: 1, width: "275px", }}
            helperText={isSubmitDisabled ? "Invalid slug. '/' is allowed for subdirectories but cannot be at the start or end." : ''}
            error={isSubmitDisabled}
          />
        </Box>
        {/* {!isHomePageOptionShowing && ( */}
        <DialogActions style={{ padding: '8px 24px', borderTop: "1px solid #dbdbdb", marginTop: '20px' }}>
          <Button onClick={onClose} variant="outlined" style={{ marginRight: '8px' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitPage}
            color="primary"
            disabled={isSubmitDisabled} // Disable button based on slug validation
          >
            Create Page
          </Button>
        </DialogActions>
        {/* )} */}
      </DialogContent>
    </Dialog>
  );
}

export default NewPageModal;
