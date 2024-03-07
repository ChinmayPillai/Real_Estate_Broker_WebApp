import React from "react";
import {
  Button,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import "./Portfolio.css";
import propertyimg from "./prop.webp";

const HomeBuySection = ({ scrollToBuyingContainer }) => {
  return (
    <Container className="intro" sx={{ mt: 4, display: "flex" }}>
      <div class="about-us">
        <Typography variant="h4" sx={{ fontWeight: "700" }} gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Welcome to Real Estate Broker – your one-stop destination for all your
          real estate needs. Whether you're buying your dream home or selling a
          property, we're here to make the process simple and stress-free. With
          our user-friendly platform and expert guidance, finding the perfect
          property or attracting the right buyer has never been easier. At Real
          Estate Broker, we pride ourselves on providing personalized service
          tailored to your unique needs. With a dedicated team of professionals
          and cutting-edge technology, we're committed to delivering exceptional
          results every step of the way. Join us today and experience the
          difference with Real Estate Broker.
        </Typography>
        <img src="/prop.webp" alt="" srcset="" style={{ height: "200px" }} />
      </div>

      <div class="find">
        <div class="e1">BUY/SELL A PROPERTY</div>
        <Card>
          <CardMedia
            component="img"
            height="200"
            image={propertyimg} // Replace with the actual image path
            alt="Image description"
          />
        </Card>
        <div class="e2">Find, Buy, Sell & Own Your Dream Property</div>
        <div class="e3">
          Explore from Apartments, land, builder floors, villas and more
        </div>
        <Button
          className="button"
          variant="contained"
          onClick={scrollToBuyingContainer}
        >
          Explore Buying
        </Button>
      </div>
    </Container>
  );
};

export default HomeBuySection;
