// libraries
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import UserChip from '@/components/chip/user.chip';

function WhoEditThisInputModal({ isOpened, onClose, usersWhoChangedValue }) {
  return (
    <Dialog
      open={isOpened}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{
        style: {
          padding: 0,
        }
      }}
    >
      <DialogTitle style={{ padding: '16px 24px' }}>
        Who edited this input
      </DialogTitle>

      <DialogContent style={{ padding: '5px 20px 20px 20px', minWidth: "300px" }}>
        {usersWhoChangedValue && usersWhoChangedValue.length && usersWhoChangedValue.map(user => (
          <UserChip {...user} />
        ))}

      </DialogContent>

      <DialogActions style={{ padding: '8px 24px' }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WhoEditThisInputModal;
