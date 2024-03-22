import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LimitBidButton = ({ userId, propertyId, login }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const handleClick = (event) => {
    if (!login) navigate("/login");

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleBidChange = (event) => {
    setBidAmount(event.target.value);
  };

  const handleBidSubmit = async () => {
    // Check if bidAmount is numeric
    if (!/^\d+$/.test(bidAmount)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please enter a valid numeric value for the bid amount.",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/limitorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "buy",
          user_id: userId, // Replace with the actual user ID
          property_id: propertyId, // Replace with the actual property ID
          price: +bidAmount, // Send the bid amount to the API
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle JSON response
        Swal.fire({
          icon: "success",
          title: "Limit Order Buy Successful",
          text: `Bid of ${bidAmount} submitted successfully!`,
        });
      } else {
        // Handle non-JSON response (like HTML error page)
        const errorText = await response.json();
        Swal.fire({
          icon: "error",
          title: "Limit Order Buy Failed",
          text: `Failed to submit bid: ${errorText.error}`,
        });
      }
    } catch (error) {
      console.error("Error placing Limit Order:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred. Please try again later.",
      });
    } finally {
      // Close the dialog
      handleDialogClose();
    }
  };

  return (
    <div>
      <Button
        style={{ width: "100%" }}
        variant="contained"
        color="primary"
        className="buy-button"
        onClick={handleClick}
      >
        Limit Order Buy
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
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
            size="small"
            style={{ marginTop: "10px" }}
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

export default LimitBidButton;
