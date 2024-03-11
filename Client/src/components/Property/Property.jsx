import React from "react";
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
import { color } from "@mui/system";

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
  
function BasicTable() {
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" >
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

export default function Property(){
  // Default values for properties if not provided
  const property  = {
    title : "Property Title",
    description : "Property Description",
    price : "$0",
    features : ["Feature 1", "Feature 2"],
    image : "path/to/default-image.jpg",
  } ;

  return (
    <Container className="property-container" sx={{ mt: 4 }}>
      <div className="property-content">
        <CardMedia
          component="img"
          image={propertyimg}
          alt="property image"
          sx={{ width: 650, objectFit: "cover" }}
          className="property-image"
        />
            <div className="property-buttons">
                <Button variant="contained" color="primary" className="buy-button">
                Market Order Buy
                </Button>
                <BidButton/>
                <Button variant="outlined" color="primary" className="wishlist-button">
                Add to Wishlist
                </Button>
                <BasicTable/>
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
          <Typography variant="subtitle2" gutterBottom>
            Features:
          </Typography>
          <List>
            <ListItem>
                <ListItemText primary="Feature 1" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Feature 2" />
            </ListItem>
          </List>
        </div>
        
      
    </Container>
  );
}
