import React, { useState } from "react";
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

  return (
    <>
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
          fringilla est. Vivamus ut aliquet justo. Nullam quis lacus eu metus
          suscipit rutrum. Sed lacinia magna nec diam vehicula, id ultrices diam
          sollicitudin. Aliquam consectetur luctus ligula, sit amet mattis nulla
          luctus vel.
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe fuga possimus distinctio minus debitis, quod facere cumque cupiditate quidem repudiandae nemo, maiores accusantium enim ex magni, ea expedita hic eaque!
        </Typography>
      </Container>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={property.image}
                    alt={property.type}
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
                <Button size="small" color="primary">
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
