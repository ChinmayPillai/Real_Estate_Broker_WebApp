// import React, { useState } from 'react';
// import { Typography, Grid, Button, TextField, Popover, Box } from '@mui/material';
// import bgPic from "./bg_pic.jpg"; // Import the image
// import { red } from '@mui/material/colors';

// const FundsPage = () => {
//   const [currentFunds, setCurrentFunds] = useState(1000); // Initial funds
//   const [addAmount, setAddAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [error, setError] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [action, setAction] = useState(null); // Tracks whether it's add or withdraw action

//   const handleClick = (event, actionType) => {
//     setAnchorEl(event.currentTarget);
//     setAction(actionType);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAction(null);
//   };

//   const handleAction = () => {
//     if (action === 'add') {
//       handleAddFunds();
//     } else if (action === 'withdraw') {
//       handleWithdrawFunds();
//     }
//     handleClose();
//   };

//   const handleAddFunds = () => {
//     if (isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0) {
//       setError('Please enter a valid amount.');
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds + parseFloat(addAmount));
//     setAddAmount('');
//     setError('');
//   };

//   const handleWithdrawFunds = () => {
//     if (isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
//       setError('Please enter a valid amount.');
//       return;
//     }
//     if (parseFloat(withdrawAmount) > currentFunds) {
//       setError('Insufficient funds.');
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds - parseFloat(withdrawAmount));
//     setWithdrawAmount('');
//     setError('');
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div style={{ minHeight: 'calc(100vh - 120px)', background: `url(${bgPic})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
//       <Grid container spacing={3} justify="center" alignItems="center">
//         <Grid item xs={12} align="center" style={{ marginTop: '100px' }}>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Username</Typography>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Current Balance: ${currentFunds.toFixed(2)}</Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//         <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} size="large" onClick={(e) => handleClick(e, 'add')}>
//           Add Funds
//         </Button>
//         <Button variant="contained" style={{ backgroundColor: '#FF5252', color: 'white', marginLeft: '150px', marginTop: '100px', marginBottom: '100px' }} size="large" onClick={(e) => handleClick(e, 'withdraw')}>
//           Withdraw Funds
//         </Button>
//       </Grid>


//         <Popover
//           id={id}
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//           PaperProps={{
//             sx: {
//               borderRadius: '20px',
//             },
//           }}
//         >
//           <Box p={2}>
//           <TextField
//             fullWidth
//             label="Enter Amount"
//             variant="outlined"
//             value={action === 'add' ? addAmount : withdrawAmount}
//             onChange={(e) => (action === 'add' ? setAddAmount(e.target.value) : setWithdrawAmount(e.target.value))}
//             margin="normal"
//           />
//           <Button
//             onClick={handleAction}
//             sx={{
//               width: '100%', // Extend button to full width of the box
//               mt: 2, // Adjust margin top as needed
//               bgcolor: action === 'add' ? '#4CAF50' : '#FF5252', // Green for 'Add' and red for 'Withdraw'
//               '&:hover': {
//                 bgcolor: action === 'add' ? '#388E3C' : '#D32F2F', // Darker shade of green for hover on 'Add' and red for hover on 'Withdraw'
//               },
//               color: 'white', // Text color
//             }}
//           >
//             {action === 'add' ? 'Add' : 'Withdraw'}
//           </Button>
//         </Box>

//         </Popover>
//       </Grid>
//     </div>
//   );
// };

// export default FundsPage;

// import React, { useState } from 'react';
// import { Typography, Grid, Button, TextField, Popover, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import bgPic from "./bg_pic.jpg"; // Import the image
// import { red } from '@mui/material/colors';

// const FundsPage = () => {
//   const [currentFunds, setCurrentFunds] = useState(1000); // Initial funds
//   const [addAmount, setAddAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [error, setError] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [action, setAction] = useState(null); // Tracks whether it's add or withdraw action
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleClick = (event, actionType) => {
//     setAnchorEl(event.currentTarget);
//     setAction(actionType);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAction(null);
//     setError('');
//   };

//   const handleAction = () => {
//     if (action === 'add') {
//       handleAddFunds();
//     } else if (action === 'withdraw') {
//       handleWithdrawFunds();
//     }
//     handleClose();
//   };

//   const handleAddFunds = () => {
//     if (isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0) {
//       setError('Please enter a valid amount.');
//       setOpenDialog(true);
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds + parseFloat(addAmount));
//     setAddAmount('');
//     setError('');
//   };

//   const handleWithdrawFunds = () => {
//     if (isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
//       setError('Please enter a valid amount.');
//       setOpenDialog(true);
//       return;
//     }
//     if (parseFloat(withdrawAmount) > currentFunds) {
//       setError('Insufficient funds.');
//       setOpenDialog(true);
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds - parseFloat(withdrawAmount));
//     setWithdrawAmount('');
//     setError('');
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div style={{ minHeight: 'calc(100vh - 120px)', background: `url(${bgPic})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
//       <Grid container spacing={3} justify="center" alignItems="center">
//         <Grid item xs={12} align="center" style={{ marginTop: '100px' }}>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Username</Typography>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Current Balance: ${currentFunds.toFixed(2)}</Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} size="large" onClick={(e) => handleClick(e, 'add')}>
//             Add Funds
//           </Button>
//           <Button variant="contained" style={{ backgroundColor: '#FF5252', color: 'white', marginLeft: '150px', marginTop: '100px', marginBottom: '100px' }} size="large" onClick={(e) => handleClick(e, 'withdraw')}>
//             Withdraw Funds
//           </Button>
//         </Grid>
//         <Popover
//           id={id}
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//           PaperProps={{
//             sx: {
//               borderRadius: '20px',
//             },
//           }}
//         >
//           <Box p={2}>
//             <TextField
//               fullWidth
//               label="Enter Amount"
//               variant="outlined"
//               value={action === 'add' ? addAmount : withdrawAmount}
//               onChange={(e) => (action === 'add' ? setAddAmount(e.target.value) : setWithdrawAmount(e.target.value))}
//               margin="normal"
//             />
//             <Button
//               onClick={handleAction}
//               sx={{
//                 width: '100%', // Extend button to full width of the box
//                 mt: 2, // Adjust margin top as needed
//                 bgcolor: action === 'add' ? '#4CAF50' : '#FF5252', // Green for 'Add' and red for 'Withdraw'
//                 '&:hover': {
//                   bgcolor: action === 'add' ? '#388E3C' : '#D32F2F', // Darker shade of green for hover on 'Add' and red for hover on 'Withdraw'
//                 },
//                 color: 'white', // Text color
//               }}
//             >
//               {action === 'add' ? 'Add' : 'Withdraw'}
//             </Button>
//           </Box>
//         </Popover>
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//           <DialogTitle>Error!</DialogTitle>
//           <DialogContent>
//             <Typography variant="body1" color="error">{error}</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>OK</Button>
//           </DialogActions>
//         </Dialog>
//       </Grid>
//     </div>
//   );
// };

// export default FundsPage;


// import React, { useState } from 'react';
// import { Typography, Grid, Button, TextField, Popover, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import bgPic from "./bg_pic.jpg"; // Import the image
// import { red } from '@mui/material/colors';

// const FundsPage = () => {
//   const [currentFunds, setCurrentFunds] = useState(1000); // Initial funds
//   const [addAmount, setAddAmount] = useState('');
//   const [withdrawAmount, setWithdrawAmount] = useState('');
//   const [error, setError] = useState('');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [action, setAction] = useState(null); // Tracks whether it's add or withdraw action
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleClick = (event, actionType) => {
//     setAnchorEl(event.currentTarget);
//     setAction(actionType);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setAction(null);
//     setError('');
//   };

//   const handleAction = () => {
//     if (action === 'add') {
//       handleAddFunds();
//     } else if (action === 'withdraw') {
//       handleWithdrawFunds();
//     }
//     handleClose();
//   };

//   const handleAddFunds = () => {
//     if (isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0) {
//       setError('Please enter a valid amount!');
//       setOpenDialog(true);
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds + parseFloat(addAmount));
//     setAddAmount('');
//     setError('');
//   };
  
//   const handleWithdrawFunds = () => {
//     if (isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
//       setError('Please enter a valid amount!');
//       setOpenDialog(true);
//       return;
//     }
//     if (parseFloat(withdrawAmount) > currentFunds) {
//       setError('Insufficient Funds!');
//       setOpenDialog(true);
//       return;
//     }
//     setCurrentFunds(prevFunds => prevFunds - parseFloat(withdrawAmount));
//     setWithdrawAmount('');
//     setError('');
//   };
  

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popover' : undefined;

//   return (
//     <div style={{ minHeight: 'calc(100vh - 120px)', background: `url(${bgPic})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
//       <Grid container spacing={3} justify="center" alignItems="center">
//         <Grid item xs={12} align="center" style={{ marginTop: '100px' }}>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Username</Typography>
//           <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Current Balance: ${currentFunds.toFixed(2)}</Typography>
//         </Grid>
//         <Grid item xs={12} align="center">
//           <Button variant="contained" style={{ backgroundColor: '#4CAF50', color: 'white' }} size="large" onClick={(e) => handleClick(e, 'add')}>
//             Add Funds
//           </Button>
//           <Button variant="contained" style={{ backgroundColor: '#FF5252', color: 'white', marginLeft: '150px', marginTop: '100px', marginBottom: '100px' }} size="large" onClick={(e) => handleClick(e, 'withdraw')}>
//             Withdraw Funds
//           </Button>
//         </Grid>
//         <Popover
//           id={id}
//           open={open}
//           anchorEl={anchorEl}
//           onClose={handleClose}
//           anchorOrigin={{
//             vertical: 'bottom',
//             horizontal: 'center',
//           }}
//           transformOrigin={{
//             vertical: 'top',
//             horizontal: 'center',
//           }}
//           PaperProps={{
//             sx: {
//               borderRadius: '20px',
//             },
//           }}
//         >
//           <Box p={2}>
//             <TextField
//               fullWidth
//               label="Enter Amount"
//               variant="outlined"
//               value={action === 'add' ? addAmount : withdrawAmount}
//               onChange={(e) => (action === 'add' ? setAddAmount(e.target.value) : setWithdrawAmount(e.target.value))}
//               margin="normal"
//             />
//             <Button
//               onClick={handleAction}
//               sx={{
//                 width: '100%', // Extend button to full width of the box
//                 mt: 2, // Adjust margin top as needed
//                 bgcolor: action === 'add' ? '#4CAF50' : '#FF5252', // Green for 'Add' and red for 'Withdraw'
//                 '&:hover': {
//                   bgcolor: action === 'add' ? '#388E3C' : '#D32F2F', // Darker shade of green for hover on 'Add' and red for hover on 'Withdraw'
//                 },
//                 color: 'white', // Text color
//               }}
//             >
//               {action === 'add' ? 'Add' : 'Withdraw'}
//             </Button>
//           </Box>
//         </Popover>
//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//           {/* <DialogTitle>Error!!</DialogTitle> */}
//           <DialogContent>
//             <Typography variant="body1" color="error">
//             {error === 'Please enter a valid amount!' ? 'Please enter a valid amount!!' : 'Insufficient Funds !!'}

//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>OK</Button>
//           </DialogActions>
//         </Dialog>
//       </Grid>
//     </div>
//   );
// };

// export default FundsPage;



import React, { useState } from 'react';
import { Typography, Grid, Button, TextField, Popover, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import bgPic from "./bg_pic.jpeg"; // Import the image
import { red } from '@mui/material/colors';
import Swal from "sweetalert2"; // Import swal

const FundsPage = () => {
  const [currentFunds, setCurrentFunds] = useState(1000); // Initial funds
  const [addAmount, setAddAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [error, setError] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [action, setAction] = useState(null); // Tracks whether it's add or withdraw action
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);

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

  const handleAddFunds = () => {
    if (isNaN(parseFloat(addAmount)) || parseFloat(addAmount) <= 0) {
      setError('Please enter a valid amount!');
      return;
    }
    setCurrentFunds(prevFunds => prevFunds + parseFloat(addAmount));
    setAddAmount('');
    setOpenAddDialog(false);
  };

  const handleWithdrawFunds = () => {
    if (isNaN(parseFloat(withdrawAmount)) || parseFloat(withdrawAmount) <= 0) {
      setError('Please enter a valid amount!');
      return;
    }
    if (parseFloat(withdrawAmount) > currentFunds) {
      setError('Insufficient Funds!');
      return;
    }
    setCurrentFunds(prevFunds => prevFunds - parseFloat(withdrawAmount));
    setWithdrawAmount('');
    setOpenWithdrawDialog(false);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 120px)', background: `url(${bgPic})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '20px' }}>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} align="center" style={{ marginTop: '100px' }}>
          <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Username</Typography>
          <Typography variant="h4" style={{ marginBottom: '20px', color: 'black', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Current Balance: ${currentFunds.toFixed(2)}</Typography>
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




