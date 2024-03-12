import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import propertyimg from "./prop.webp";
import "./Property.css"; // Import the CSS file for styling
import BidButton from "./BidButton";


function createData(buybid, sellbid) {
    return { buybid, sellbid };
  }
  

  const rows = [
    createData(24, 4.0),
    createData(37, 4.3),
    createData(24, 6.0),
    createData(67, 4.3),
    createData(49, 3.9),
  ];

function BasicTable({ rows }) {
  // Sort rows by buybid in ascending order and sellbid in descending order
  const sortedRows = rows.sort((a, b) => {
    if (a.buybid !== b.buybid) {
      return a.buybid - b.buybid; // Ascending order for buybid
    }
    return b.sellbid - a.sellbid; // Descending order for sellbid if buybid is equal
  });

  return (
    <TableContainer component={Paper} className="Table">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="Table-cell">Top buy bids</TableCell>
            <TableCell className="Table-cell">Top sell bids</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.buybid}
              </TableCell>
              <TableCell>{row.sellbid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function Property({ propertyId }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Fetch property data from the server based on propertyId
    const fetchData = async () => {
      try {
        const response = await fetch(`localhost:3000/api/properties/${propertyId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
        // Use default property values if fetch fails
        const defaultProperty = {
          title: "Property Title",
          description: "Welcome to your dream home! Nestled in the heart of a vibrant community, this charming 3-bedroom, 2-bathroom haven boasts modern comforts and classic appeal. Step inside to discover an open-concept layout, perfect for entertaining guests or enjoying quiet evenings by the fireplace. The spacious kitchen features sleek countertops and stainless steel appliances. Retreat to the luxurious master suite with a spa-like ensuite bath and ample closet space. Outside, a serene backyard oasis awaits, ideal for summer BBQs. With top-rated schools and amenities just moments away, this is more than a home – it's a lifestyle. Don't miss your chance to make it yours!",
          price: "$0",
          image: propertyimg,
        };
        setProperty(defaultProperty);
      }
    };

    if (propertyId) {
      fetchData();
    } else {
      // Default property object if no propertyId is passed
      const defaultProperty = {
        title: "Property Title",
        description: "Welcome to your dream home! Nestled in the heart of a vibrant community, this charming 3-bedroom, 2-bathroom haven boasts modern comforts and classic appeal. Step inside to discover an open-concept layout, perfect for entertaining guests or enjoying quiet evenings by the fireplace. The spacious kitchen features sleek countertops and stainless steel appliances. Retreat to the luxurious master suite with a spa-like ensuite bath and ample closet space. Outside, a serene backyard oasis awaits, ideal for summer BBQs. With top-rated schools and amenities just moments away, this is more than a home – it's a lifestyle. Don't miss your chance to make it yours!",
        price: "$0",
        image: propertyimg,
      };
      setProperty(defaultProperty);
    }
  }, [propertyId]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="property-container" sx={{ mt: 4 }}>
      <div className="property-content">
        <CardMedia
          component="img"
          image={property.image}
          alt="property image"
          sx={{ width: 650, objectFit: "cover" }}
          className="property-image"
        />
        <div className="property-buttons">
          <Button variant="contained" color="primary" className="buy-button">
            Market Order Buy
          </Button>
          <BidButton />
          <Button variant="outlined" color="primary" className="wishlist-button">
            Add to Wishlist
          </Button>
          <BasicTable rows={rows} />
        </div>
      </div>
      <div className="property-details">
        <Typography variant="h4" className="property-title" gutterBottom>
          {property.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Market Order Price: {property.price}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {property.description}
        </Typography>
      </div>
    </Container>
  );
}
