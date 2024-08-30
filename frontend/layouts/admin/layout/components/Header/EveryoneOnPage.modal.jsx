// libraries
import React from 'react';
import PropTypes from 'prop-types';

// mine
import AdminLayoutContext from '../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';

// MUI
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

function EveryoneOnPageModal({ isOpened, onClose }) {
  const { whoIsOnPage } = React.useContext(AdminLayoutContext);

  return (
    <Dialog open={isOpened} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Who is on the page</DialogTitle>
      <DialogContent dividers>
        <h3 style={{ paddingBottom: '5px', paddingTop: '5px' }}>
          Total: {whoIsOnPage.total}
        </h3>

        <Stack direction="row" spacing={1}>
          {whoIsOnPage.list &&
            whoIsOnPage.list.map((user) => (
              <UserChip
                key={user.id}
                email={user.email}
                firstName={user.firstName}
                lastName={user.lastName}
                username={user.username}
                callByType={user.callByType}
                picturePreview={user.picture}
                labelColor={user.labelColor}
                circleColor={user.circleColor}
              />
            ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EveryoneOnPageModal.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EveryoneOnPageModal;
