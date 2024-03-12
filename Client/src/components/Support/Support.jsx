import React from "react";
import { Container, Typography, Grid, TextField, Button } from "@mui/material";

const Support = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // You can handle form submission here, like sending data to a server
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Support Page
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Message"
              name="message"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Support;
