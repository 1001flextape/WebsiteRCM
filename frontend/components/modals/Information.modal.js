// Libraries
import * as React from 'react';

// MUI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

//icons
import InfoIcon from '@mui/icons-material/Info';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: '#212121',
};

export default function InformationModal({ isOpened, onClose, onSubmit, children, disableSubmit, header, submitLabel, hideSumbitButton }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(isOpened);

  const handleClose = (event) => {
    if (onClose) {
      onClose(event)
    }
  }

  React.useEffect(() => {
    setOpen(isOpened)
  }, [isOpened])


  const handleSubmit = function (event) {
    event.preventDefault();

    if (!disableSubmit) {
      if (onSubmit) onSubmit(event);
    } else {
      handleClose(event)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="information-title"
        aria-describedby="information-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%", background: theme.palette.info.main, color: theme.palette.info.contrastText, p: 2 }}>
            <Typography variant="h6" component="h2">
              <span
                style={{
                  verticalAlign: "sub",
                  // display: "inline-flex"
                }}
              >
                <InfoIcon style={{ marginRight: "3px" }} />
              </span>
              <span>
                {header || "Information"}
              </span>
            </Typography>

          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: "100%", p: 2 }}>
            {children}
            <div>
              <br />
              <Button
                sx={{ float: "right" }}
                onClick={handleClose}
              // variant="contained"
              // sx={{ background: theme.palette.error.main, color: theme.palette.primary.contrastText, borderColor: theme.palette.error.contrastText }}
              >
                Cancel
              </Button>

              {!hideSumbitButton && (

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: theme.palette.info.main, color: theme.palette.info.contrastText, borderColor: theme.palette.info.contrastText }}
                  disabled={disableSubmit}
                >
                  {submitLabel || "Got it!"}
                </Button>
              )}
            </div>
          </Box>

          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            We cannot find a creator account, but we found a student account. If this is a problem, please contact your tech support!
          </Typography>
          <br />
          <GatsbyLink to="/app/dashboard">
            Go to student portal
          </GatsbyLink> */}
        </Box>
      </Modal >
    </div >
  );
}