import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  Collapse,
  Divider,
  Snackbar,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Support = () => {
  const [showFAQ, setShowFAQ] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setConfirmationMessage("Message sent successfully");
        setOpenSnackbar(true);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setConfirmationMessage("Failed to send message");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setConfirmationMessage("An error occurred");
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const faqButtonStyle = {
    margin: "20px 0",
  };

  const faqContentStyle = {
    textAlign: "left",
    padding: "16px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  };

  const dividerStyle = {
    margin: "16px 0",
  };

  return (
    <Container>
      <Typography margin="30px" variant="h3" align="center" gutterBottom>
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
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              required
              value={formData.email}
              onChange={handleChange}
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
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <Card className="faq-card" style={{ background:"#98eff2" , padding: "20px", margin: "20px" }}>
        <Button
          style={faqButtonStyle}
          onClick={() => setShowFAQ(!showFAQ)}
          variant="contained"
          color="primary"
          endIcon={<ExpandMoreIcon />}
        >
          FAQs
        </Button>
        <Collapse in={showFAQ}>
          <div style={faqContentStyle}>
            <Typography variant="body1" gutterBottom>
              <strong>1) How do I list my property on your website?</strong>
              <br />
              To list your property, simply navigate to the "List Your Property"
              section on our homepage. Follow the prompts to provide details
              about your property, upload photos, and set your listing
              preferences. Once submitted, our team will review your listing and
              publish it accordingly.
            </Typography>
            <Divider style={dividerStyle} />
            <Typography variant="body1" gutterBottom>
              <strong>2) How can I search for properties on your website?</strong>
              <br />
              You can search for properties by using our search bar located on
              the homepage. Enter keywords such as location, property type,
              price range, etc., to refine your search results. You can also use
              our advanced search filters for more specific criteria.
            </Typography>
            <Divider style={dividerStyle} />
            <Typography variant="body1" gutterBottom>
              <strong>3) I'm experiencing technical issues with the website. What
              should I do?</strong>
              <br />
              If you encounter any technical issues while using our website,
              please try clearing your browser cache and cookies first. If the
              problem persists, feel free to contact our support team via email
              at support@yourrealestatewebsite.com or through the contact form
              below. Be sure to include details about the issue you're
              experiencing so that we can assist you promptly.
            </Typography>
          </div>
        </Collapse>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={confirmationMessage}
      />
    </Container>
  );
};

export default Support;
