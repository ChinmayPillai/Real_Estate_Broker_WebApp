import React, { useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

export default function FundsPage() {
  const [currentFunds, setCurrentFunds] = useState(1000); // Initial funds amount
  const [amount, setAmount] = useState(""); // Input amount for add or withdraw
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState("");
  
  const handleOpenDialog = (action) => {
    setOpenDialog(true);
    setDialogAction(action);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddFunds = () => {
    const addAmount = parseFloat(amount);
    if (!isNaN(addAmount) && addAmount > 0) {
      handleOpenDialog("add");
    }
  };

  const handleWithdrawFunds = () => {
    const withdrawAmount = parseFloat(amount);
    if (!isNaN(withdrawAmount) && withdrawAmount > 0 && withdrawAmount <= currentFunds) {
      handleOpenDialog("withdraw");
    }
  };

  const confirmAction = () => {
    if (dialogAction === "add") {
      setCurrentFunds(currentFunds + parseFloat(amount));
    } else if (dialogAction === "withdraw") {
      setCurrentFunds(currentFunds - parseFloat(amount));
    }
    setAmount("");
    handleCloseDialog();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Current Funds: ${currentFunds.toFixed(2)}
      </Typography>
      <TextField
        label="Enter Amount"
        variant="outlined"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddFunds} sx={{ mr: 2 }}>
        Add Funds
      </Button>
      <Button variant="contained" color="secondary" onClick={handleWithdrawFunds}>
        Withdraw Funds
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm {dialogAction === "add" ? "Add Funds" : "Withdraw Funds"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {dialogAction === "add" ? "add" : "withdraw"} ${amount}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmAction} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
