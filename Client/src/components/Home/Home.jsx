import React, { useRef, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import "./Home.css";
import Intro from "./Intro";
import propertyimg from "./prop.webp";

export default function Home() {
  const [count, setCount] = useState(0);
  const properties = [
    {
      id: 1,
      image: "property1.jpg",
      type: "Apartment",
      location: "New York",
      price: "$500,000",
    },
    {
      id: 2,
      image: "property2.jpg",
      type: "House",
      location: "Los Angeles",
      price: "$750,000",
    },
    {
      id: 3,
      image: "property3.jpg",
      type: "Condo",
      location: "Chicago",
      price: "$400,000",
    },
    {
      id: 4,
      image: "property1.jpg",
      type: "Apartment",
      location: "New York",
      price: "$500,000",
    },
    {
      id: 5,
      image: "property2.jpg",
      type: "House",
      location: "Los Angeles",
      price: "$750,000",
    },
    {
      id: 6,
      image: "property3.jpg",
      type: "Condo",
      location: "Chicago",
      price: "$400,000",
    },
  ];

  const buyingContainerRef = useRef(null);

  // Function to handle the button click event
  const handleExploreBuyingClick = () => {
    // Scroll to the buying container
    window.scrollTo({
      top: buyingContainerRef.current.offsetTop,
      behavior: "smooth",
    });
    // buyingContainerRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Intro scrollToBuyingContainer={handleExploreBuyingClick} />
      <Container sx={{ mt: 4 }} ref={buyingContainerRef}>
        <Grid container spacing={4}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card className="list-item" sx={{ borderRadius: "10%" }}>
                <CardActionArea className="list-item-action">
                  <CardMedia
                    component="img"
                    height="200"
                    image={propertyimg}
                    alt={property.type}
                    sx={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "10%",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {property.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {property.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  size="small"
                  color="primary"
                  className="list-item-button"
                >
                  View Details
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
