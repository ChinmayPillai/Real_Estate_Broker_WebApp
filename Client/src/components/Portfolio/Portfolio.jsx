import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import propertyimg from "./prop.webp"; // Placeholder image
import "./Dashboard.css"; // Import the CSS file for styling

// Placeholder data for properties
const propertiesListedForSale = [
  {
    id: 1,
    title: "Luxury Villa in Beverly Hills",
    image: propertyimg,
    status: "Listed for Sale",
  },
  {
    id: 2,
    title: "Modern Loft in Downtown",
    image: propertyimg,
    status: "Listed for Sale",
  },
];

const propertiesCurrentlyBid = [
  {
    id: 3,
    title: "Oceanfront Condo in Miami",
    image: propertyimg,
    status: "Currently Bidding",
  },
];

const propertiesBought = [
  {
    id: 4,
    title: "Historic Mansion in New York",
    image: propertyimg,
    status: "Bought",
  },
];

const propertiesSold = [
  {
    id: 5,
    title: "Luxury Estate in Malibu",
    image: propertyimg,
    status: "Sold",
  },
  {
    id: 6,
    title: "Beachfront Property in Hawaii",
    image: propertyimg,
    status: "Sold",
  },
];

export default function Portfolio() {
  // Placeholder data for user
  const user = {
    name: "John Doe",
    funds: "$10,000",
    propertiesSold: propertiesSold.length,
    propertiesBought: propertiesBought.length,
  };

  const handleLogout = () => {
    // Placeholder function for logout
    alert("Logging out...");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* User Information */}
        <Grid item xs={12} md={12} className="user-grid">
          <Card className="user-card">
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Welcome, {user.name}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Current Funds: {user.funds}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Properties Sold: {user.propertiesSold}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Properties Bought: {user.propertiesBought}
              </Typography>
              <Button variant="contained" color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Properties Listed for Sale */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" gutterBottom>
            Listed for Sale
          </Typography>
          <Paper variant="outlined" className="scrollable-list">
            {propertiesListedForSale.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Paper>
        </Grid>

        {/* Properties Currently Bidding */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" gutterBottom>
            Currently Bidding
          </Typography>
          <Paper variant="outlined" className="scrollable-list">
            {propertiesCurrentlyBid.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Paper>
        </Grid>

        {/* Properties Bought */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" gutterBottom>
            Properties Bought
          </Typography>
          <Paper variant="outlined" className="scrollable-list">
            {propertiesBought.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Paper>
        </Grid>

        {/* Properties Sold */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" gutterBottom>
            Properties Sold
          </Typography>
          <Paper variant="outlined" className="scrollable-list">
            {propertiesSold.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// Property Card component
function PropertyCard({ property }) {
  return (
    <Card className="property-card">
      <CardContent>
        <Avatar src={property.image} sx={{ width: 80, height: 80 }} />
        <Typography variant="h6" gutterBottom>
          {property.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Status: {property.status}
        </Typography>
      </CardContent>
    </Card>
  );
}
