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

// Sample dictionary of products
const sampleProducts = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    location: "Location A",
    description: "Description for Product 1",
    price: 10,
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    location: "Location B",
    description: "Description for Product 2",
    price: 20,
  },
  {
    id: 3,
    name: "Product 3",
    category: "Category C",
    location: "Location C",
    description: "Description for Product 3",
    price: 30,
  },
  {
    id: 4,
    name: "Product 4",
    category: "Category D",
    location: "Location D",
    description: "Description for Product 4",
    price: 40,
  },
  {
    id: 5,
    name: "Product 5",
    category: "Category E",
    location: "Location E",
    description: "Description for Product 5",
    price: 50,
  },
];

export default function Wishlist() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState(sampleProducts); // Use the sample products directly

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
        // Delete the product with the given id
        setRows(rows.filter((product) => product.id !== id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const [selectedOption, setSelectedOption] = useState("Wishlist");

  return (
    <>
      {rows.length > 0 && (
        <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
          <Select
            value={selectedOption}
            onChange={(event) => {
              setSelectedOption(event.target.value);
            }}
            displayEmpty
            sx={{
              fontSize: "20px", // Increase font size
              fontWeight: "bold", // Use bold font weight
              marginBottom: "20px", // Add margin to increase gap
              "& .MuiSelect-select": {
                padding: "10px", // Add padding for better appearance
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none", // Remove the border
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
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
            <MenuItem value={"Wishlist"}>Wishlist</MenuItem>
            <MenuItem value={"Portfolio"}>Portfolio</MenuItem>
          </Select>
          <Divider />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "100px", fontWeight: "bold" }}
                  >
                    Price
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ minWidth: "50px", fontWeight: "bold" }}
                  >
                    Action
                  </TableCell>
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
                        <TableCell
                          align="left"
                          component={Link}
                          to={`/property/${row.id}`}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{row.location}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
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
                          {/* </Stack> */}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
      )}
    </>
  );
}
