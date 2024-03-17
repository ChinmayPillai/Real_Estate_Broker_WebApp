import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Link as LinkRoute,
  redirect,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useAuth } from "../Authorisation/Auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const defaultTheme = createTheme();

export default function SignIn() {
  const { isLoggedIn, userId, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirectTo");

  useEffect(() => {
    if (isLoggedIn) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Logout!",
      }).then((result) => {
        if (result.value) {
          logout();
          navigate("/");
          Swal.fire(
            "Logged Out!",
            "You have been successfully Logged out",
            "success"
          );
        } else {
          navigate(redirectTo || "/"); // Navigate back to the previous location
        }
      });
    }
  }, [isLoggedIn, location]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget);
    var object = {};
    formData.forEach((value, key) => (object[key] = value));

    try {
      // Send form data to the API endpoint using fetch or any other HTTP client library
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(object),
      });
      const userData = await response.json();

      if (response.ok) {
        // Handle successful response
        login(userData.user);
        console.log("Login successful");
        Swal.fire("Success!", "Login successful", "success");

        navigate("/funds");
      } else {
        // Handle error response
        console.error(userData.message);
        event.target.reset();
        Swal.fire("Error!", userData.message, "error");
      }
    } catch (error) {
      // Handle network errors
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              type="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container sx={{ flexDirection: "column" }}>
              <Grid item>
                <Link component={LinkRoute} to="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
