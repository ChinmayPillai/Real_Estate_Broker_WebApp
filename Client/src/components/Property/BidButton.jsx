import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const BidButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleBidSubmit = () => {
    // Handle the bid submission logic here
    console.log('Bid submitted:', bidAmount);
    setOpenDialog(true);
    handleClose();
  };

  return (
    <div>
      <Button style={{ width: '100%' }} variant="contained" color="primary" className="buy-button" onClick={handleClick}>
        Limit Order Buy
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          <TextField
            label="Enter Bid Amount"
            variant="outlined"
            size="small"
            value={bidAmount}
            onChange={handleBidChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleBidSubmit}
            fullWidth
            size='small'
            style={{ marginTop: '10px' }}
          >
            Submit Bid
          </Button>
        </Box>
      </Popover>
      {/* Dialog for confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Bid</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to submit a bid for {bidAmount}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogClose} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BidButton;
