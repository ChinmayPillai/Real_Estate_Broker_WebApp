import React, { useRef, useState, useEffect } from "react";
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
import { Link } from "react-router-dom";

export default function Home() {
  // const [count, setCount] = useState(0);

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/properties");
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();

    return () => {
      // Cleanup code
    };
  }, []);

  const buyingContainerRef = useRef(null);

  // Function to handle the button click event
  const handleExploreBuyingClick = () => {
    // Scroll to the buying container
    window.scrollTo({
      top: buyingContainerRef.current.offsetTop - 65,
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
                    alt={property.category}
                    sx={{
                      padding: "10px",
                      boxSizing: "border-box",
                      borderRadius: "10%",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {property.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Category: {property.category}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {property.location}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: {property.ltp}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  size="small"
                  component={Link}
                  to={`/property/${property.id}`}
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
