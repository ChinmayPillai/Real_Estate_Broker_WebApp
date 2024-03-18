import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";
import { Select, MenuItem } from "@mui/material";
import "./UserList.css";
import { useAuth } from "../Authorisation/Auth";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import {
  getWatchlist,
  getPortlist,
  getPropertyById,
  fetchPropertyDetails,
  removeFromWatchlist,
  addToWatchlist,
} from "./APIcalls";

export default function UserList() {
  const { isLoggedIn, userId } = useAuth();
  const { list } = useParams();
  const defaultValue = list;
  const [newPropertyId, setNewPropertyId] = useState("");
  const [newPortPropertyId, setNewPortPropertyId] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [portlist, setPortlist] = useState([]);

  const [watchPropertyDetails, setWatchPropertyDetails] = useState([]);
  const [portPropertyDetails, setPortPropertyDetails] = useState([]);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]); // Use the sample products directly
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedOption(list);
  }, [list, location]);

  useEffect(() => {
    // Fetch watchlist data when component mounts
    if (isLoggedIn) {
      const fetchList = async () => {
        const data = await getWatchlist(userId); // Call API function to get watchlist
        if (data) {
          setWatchlist(data);
        }
        const port = await getPortlist(userId); // Call API function to get watchlist
        if (port) {
          setPortlist(port);
        }
      };
      fetchList();
    }
  }, [userId, isLoggedIn, location]);

  // Fetch property details for each property ID in the watchlist
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await Promise.all(watchlist.map(fetchPropertyDetails));
      setWatchPropertyDetails(details.filter(Boolean)); // Filter out null values (errors)
      const portdetails = await Promise.all(portlist.map(fetchPropertyDetails));
      setPortPropertyDetails(portdetails.filter(Boolean)); // Filter out null values (errors)
    };
    fetchDetails();
  }, [watchlist, portlist]); // Fetch property details whenever the watchlist changes

  useEffect(() => {
    // if (selectedOption == defaultValue)
    setRows(
      defaultValue === "Wishlist" ? watchPropertyDetails : portPropertyDetails
    );
  }, [watchPropertyDetails, portPropertyDetails, selectedOption]);

  const handleRemoveFromWatchlist = async (propertyId) => {
    if (isLoggedIn) {
      const updatedWatchlist = await removeFromWatchlist(userId, propertyId); // Call API function to remove from watchlist
      if (updatedWatchlist) {
        setWatchlist(updatedWatchlist);
        console.log("Item removed from watchlist");
      } else {
        // console.error("Failed to remove item from watchlist");
      }
    }
  };

  const handleAddToWatchlist = async () => {
    if (newPropertyId.trim() === "") {
      console.error("Property ID cannot be empty");
      return;
    }

    const updatedWatchlist = await addToWatchlist(userId, newPropertyId);
    if (updatedWatchlist) {
      setWatchlist(updatedWatchlist);
      console.log("Item added to watchlist");
      setNewPropertyId(""); // Clear the input field after adding
    } else {
      // console.error("Failed to add item to watchlist");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        handleRemoveFromWatchlist("" + id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <>
      {/* <h2>Wishlist</h2>
      <input
        type="text"
        value={newPropertyId}
        onChange={(e) => setNewPropertyId(e.target.value)}
        placeholder="Enter property ID"
      />
      <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
      <ul>
        {watchlist.map((propertyId) => (
          <li key={propertyId}>Property ID: {propertyId}</li>
        ))}
      </ul> */}

      <Paper sx={{ background:"#98eff2", width: "98%", overflow: "hidden", padding: "12px" }}>
        <Select
          value={selectedOption}
          onChange={(event) => {
            navigate("/user/" + event.target.value);
            // setSelectedOption();
            // setRows(
            //   event.target.value == "Wishlist"
            //     ? watchPropertyDetails
            //     : portPropertyDetails
            // );
          }}
          displayEmpty
          sx={{
            fontSize: "20px", // Increase font size
            fontWeight: "bold", // Use bold font weight
            margin: "20px", // Add margin to increase gap
            marginTop: "20px",
            "& .MuiSelect-select": {
              padding: "10px", // Add padding for better appearance
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove the border
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              border: "none", // Remove border on hover
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none", // Remove border on focus
              },
            "& .MuiInputBase-root": {
              "&:hover": {
                borderColor: "transparent", // Remove border color on hover
              },
            },
          }}
        >
          <MenuItem value={"Wishlist"}>Watchlist</MenuItem>
          <MenuItem value={"Portfolio"}>Portfolio</MenuItem>
        </Select>
        <Divider />

        {rows.length > 0 && (
          <TableContainer>
            <Table sx={{background:"#98eff2"}} stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ background:"#98eff2", minWidth: "100px", fontWeight: "bold" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{background:"#98eff2", minWidth: "100px", fontWeight: "bold" }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{background:"#98eff2", minWidth: "100px", fontWeight: "bold" }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{background:"#98eff2", minWidth: "100px", fontWeight: "bold" }}
                  >
                    Price
                  </TableCell>

                  {selectedOption != "Portfolio" && (
                    <TableCell
                      align="left"
                      style={{ background:"#98eff2", minWidth: "50px", fontWeight: "bold" }}
                    >
                      Action
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell align="left">
                          <Link to={`/property/${row.id}`}>{row.name}</Link>
                        </TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{row.location}</TableCell>
                        <TableCell align="left">{row.ltp}</TableCell>

                        {selectedOption != "Portfolio" && (
                          <TableCell align="left">
                            {/* <Stack spacing={1} direction="row"> */}
                            <DeleteIcon
                              style={{
                                fontSize: "20px",
                                color: "darkred",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                deleteUser(row.id);
                              }}
                            />
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
