import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import bgPic from "./bg_pic.jpeg"; // Import the image
import Swal from "sweetalert2"; // Import swal

const FundsPage = () => {
  const [currentFunds, setCurrentFunds] = useState(null); // Initial funds
  const [username, setUsername] = useState('-Username-'); // Initial username
  const [userId, setUserId] = useState('1'); // Initial user ID
  const [addAmount, setAddAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);

  useEffect(() => {
    const fetchCurrentFunds = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/funds/${userId}`, { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setCurrentFunds(data.funds); // Assuming data is an object with a 'funds' property
        } else {
          setError('Failed to fetch funds');
        }
      } catch (error) {
        console.error('Error fetching funds:', error);
        setError('An error occurred while fetching funds');
      }
    };
    fetchCurrentFunds(); // Call fetchCurrentFunds just once when the component mounts
    
  }, []);

  const handleAddFundsConfirmation = () => {
    Swal.fire({
      title: "Huh, Sure?",
      text: "Are you certain you wish to deposit funds?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenAddDialog(true);
      }
    });
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setError('');
  };

  const handleWithdrawalConfirmation = () => {
    Swal.fire({
      title: "Huh, Sure?",
      text: "Are you certain you wish to withdraw funds?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setOpenWithdrawDialog(true);
      }
    });
  };

  const handleCloseWithdrawDialog = () => {
    setOpenWithdrawDialog(false);
    setError('');
  };

  const handleAddAmountChange = (event) => {
    setAddAmount(event.target.value);
    setError('');
  };

  const handleWithdrawAmountChange = (event) => {
    setWithdrawAmount(event.target.value);
    setError('');
  };

  const handleAddFunds = async () => {
    if (isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0) {
      setError('Please enter a valid amount!');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/funds/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'add',
          amount: parseFloat(addAmount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentFunds(data.funds);
        setOpenAddDialog(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleWithdrawFunds = async () => {
    if (isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
      setError('Please enter a valid amount!');
      return;
    }
    if (parseFloat(withdrawAmount) > currentFunds) {
      setError('Insufficient Funds!');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/funds/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'withdraw',
          amount: parseFloat(withdrawAmount),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCurrentFunds(data.funds);
        setOpenWithdrawDialog(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: `url(${bgPic})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} align="center" style={{ marginTop: '100px' }}>
          <Typography variant="h4" style={{ marginTop:'30px' , marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{username}</Typography>
          <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Current Balance: {currentFunds !== null ? `$${currentFunds.toFixed(2)}` : 'Loading...'}</Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" style={{ backgroundColor: 'primary', color: 'white' }} size="large" onClick={handleAddFundsConfirmation}>
            Deposit Funds
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#FF5252', color: 'white', marginLeft: '150px', marginTop: '100px', marginBottom: '100px' }} size="large" onClick={handleWithdrawalConfirmation}>
            Withdraw Funds
          </Button>
        </Grid>
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add Funds</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Enter Amount"
              variant="outlined"
              value={addAmount}
              onChange={handleAddAmountChange}
              margin="normal"
            />
            {error && <Typography variant="body1" color="error">{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog}>Cancel</Button>
            <Button onClick={handleAddFunds} variant="contained" color="primary">Add</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openWithdrawDialog} onClose={handleCloseWithdrawDialog}>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Enter Amount"
              variant="outlined"
              value={withdrawAmount}
              onChange={handleWithdrawAmountChange}
              margin="normal"
            />
            {error && <Typography variant="body1" color="error">{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWithdrawDialog}>Cancel</Button>
            <Button onClick={handleWithdrawFunds} variant="contained" sx={{ bgcolor: '#FF5252', color: 'white' }}>Withdraw</Button>

          </DialogActions>
        </Dialog>
      </Grid>
    </div>
  );
};

export default FundsPage;
