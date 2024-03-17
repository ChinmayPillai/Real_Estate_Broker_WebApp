import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

const MarketBidButton = ({ bidAmount, userId, propertyId }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleBidSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/marketorder', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'buy',
          user_id: userId, // Replace with the actual user ID
          property_id: propertyId, // Replace with the actual property ID
          bid_amount: bidAmount, // Send the bid amount to the API
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle JSON response
        Swal.fire({
          icon: 'success',
          title: 'Market Order Buy Successful',
          text: `Bid of ${bidAmount} submitted successfully!`,
        });
      } else {
        // Handle non-JSON response (like HTML error page)
        const errorText = await response.text();
        Swal.fire({
          icon: 'error',
          title: 'Market Order Buy Failed',
          text: `Failed to submit bid. Server error: ${errorText}`,
        });
      }
    } catch (error) {
      console.error('Error placing Market Order:', error);
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again later.',
      });
    } finally {
      // Close the dialog
      handleDialogClose();
    };
  };
  

  return (
    <div>
      <Button style={{ width: '100%' }} variant="contained" color="primary" className="buy-button" onClick={handleDialogOpen}>
        Market Order Buy
      </Button>

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
          <Button onClick={handleBidSubmit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MarketBidButton;
