import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';

const BidButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleBidSubmit = () => {
    // Handle the bid submission logic here
    console.log('Bid submitted:', bidAmount);
    handleClose();
  };

  return (
    <div >
      <Button style={{width:'100%'}} variant="contained" color="primary" className="buy-button" onClick={handleClick}>
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
    </div>
  );
};

export default BidButton;
