import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "./logo.jpg";
import { useAuth } from "../Authorisation/Auth";

const Navbar = () => {
  const location = useLocation();
  const prevLocation = location.pathname; // Get the previous location
  // console.log(prevLocation);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#007bff", color: "#ffffff" }}>
      <Toolbar
        sx={{
          display: { xs: "flex" },
          justifyContent: { xs: "space-between" },
        }}
      >
        <img
          src={logo}
          alt="logo"
          background-color="#98eff2"
          style={{ width: "80px", height: "80px" }}
        />
        <Typography
          variant="h6"
          component="div"
          sx={{
            display: { xs: "none", sm: "block" },
            flexGrow: 1,
            fontWeight: 600,
            textAlign: { xs: "center", sm: "center", md: "left" },
            padding: "20px",
            textTransform: "uppercase", // Uppercase letters
          }}
        >
          Real Estate Broker
        </Typography>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer}>
          <List sx={{ width: 250 }} onClick={toggleDrawer}>
            <ListItemButton component={Link} to="/" onClick={toggleDrawer}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="user/Portfolio"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Portfolio" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to={{ pathname: "/user/Wishlist" }}
              onClick={toggleDrawer}
            >
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton component={Link} to="/funds" onClick={toggleDrawer}>
              <ListItemText primary="Funds" />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to={`/login?redirectTo=${prevLocation}`}
              onClick={toggleDrawer}
            >
              <ListItemText
                primary={isLoggedIn ? "Logout" : "Register/Login"}
              />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/support"
              onClick={toggleDrawer}
            >
              <ListItemText primary="Support" />
            </ListItemButton>
          </List>
        </Drawer>
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to={{ pathname: "/user/Portfolio" }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Portfolio
        </Button>
        <Button
          color="inherit"
          component={Link}
          to={{ pathname: "/user/Wishlist" }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Wishlist
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/funds"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Funds
        </Button>
        <Button
          color="inherit"
          component={Link}
          to={`/login?redirectTo=${prevLocation}`}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          {isLoggedIn ? "Logout" : "Register/Login"}
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/support"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          Support
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
