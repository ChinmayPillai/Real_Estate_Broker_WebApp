import React from "react";
import {
  Container,
  Typography,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Facebook,
  LinkedIn,
  Instagram,
  Email,
  Phone,
} from "@mui/icons-material";
import "./Footer.css";
const Footer = () => {
  return (
    <Container
      className="footer"
      maxWidth={false}
      sx={{ mt: 4, width: " 100vw", display: "flex" }}
    >
      <div className="comp1">
        <Typography variant="h6" sx={{ fontWeight: "600" }} gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          For inquiries, please contact us:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <Phone />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: "body1" }}
              primary="+1 123-456-7890"
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{ variant: "body1" }}
              primary="example@email.com"
            />
          </ListItem>
        </List>
      </div>
      <div className="social-icon">
        <IconButton
          component={Link}
          href="https://www.facebook.com/"
          target="_blank"
        >
          <Facebook className="icon" />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/"
          target="_blank"
        >
          <LinkedIn className="icon" />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.instagram.com/"
          target="_blank"
        >
          <Instagram className="icon" />
        </IconButton>
      </div>
    </Container>
  );
};

export default Footer;
