export async function getWatchlist(userId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/watchlist/${userId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get watchlist");
    }
    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error getting watchlist:", error);
    return null;
  }
}
export async function getPortlist(userId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/portfolio/${userId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get portfolio");
    }
    const data = await response.json();
    return data.portfolio;
  } catch (error) {
    console.error("Error getting portfolio:", error);
    return null;
  }
}
export async function getPropertyById(propertyId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/properties/${propertyId}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get property");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Error fetching property details for ID",
      propertyId,
      ":",
      error
    );
    return null;
  }
}
export async function fetchPropertyDetails(propertyId) {
  try {
    if (!propertyId) {
      throw new Error("Property ID is undefined or null");
    } else {
      const property = await getPropertyById(propertyId);
      if (property) {
        // const { name, category, location, ltp } = property;
        // const selectedFields = { name, category, location, ltp };
        return property;
      } else {
        console.log("Nothing was fetched");
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function removeFromWatchlist(userId, propertyId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/watchlist/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "remove",
          property_id: propertyId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to remove from watchlist");
    }
    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    return null;
  }
}

export async function addToWatchlist(userId, propertyId) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/watchlist/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "add",
          property_id: propertyId,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add to watchlist");
    }
    const data = await response.json();
    return data.watchlist;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    return null;
  }
}
