import React, { useRef } from "react";
import {
  Button,
  Typography,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  ListItem,
  ListItemButton,
} from "@mui/material";
import "./Intro.css";
import propertyAbout from "./property-about.jpeg";

const HomeBuySection = ({ scrollToBuyingContainer }) => {
  const AboutUSContainerRef = useRef(null);
  // Function to handle the button click event
  const scrollToAboutUs = () => {
    window.scrollTo({
      top: AboutUSContainerRef.current.offsetTop - 65,
      behavior: "smooth",
    });
    // buyingContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Container className="intro" sx={{ mt: 4, display: "flex" }}>
      <div className="find">
        <div className="e1">BUY/SELL A PROPERTY</div>
        <Card sx={{ width: "100vw" }}>
          <CardMedia
            component="img"
            image={propertyAbout} // Replace with the actual image path
            alt="Image description"
            sx={{
              boxSizing: "border-box",
            }}
          />
        </Card>
        <div className="e2">Find, Buy, Sell & Own Your Dream Property</div>
        <div className="e3">
          Explore from Apartments, land, builder floors, villas and more
        </div>
        <ListItem sx={{ justifyContent: "center", gap: "10%" }}>
          <Button
            className="button"
            variant="contained"
            onClick={scrollToBuyingContainer}
          >
            Explore Buying
          </Button>
          <Button
            className="button"
            variant="contained"
            onClick={scrollToAboutUs}
          >
            About Us
          </Button>
        </ListItem>
      </div>
      <div className="about-us" ref={AboutUSContainerRef}>
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
      </div>
    </Container>
  );
};

export default HomeBuySection;
