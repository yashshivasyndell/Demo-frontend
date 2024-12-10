import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { handleUserData } from "../redux/store/action";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Usertable() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.getData);
  
  // Pagination State
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10); 

  useEffect(() => {
    dispatch(handleUserData());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const paginatedData = user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxWidth: "80%",
        margin: "0 auto",
        height: "600px", 
        overflowY: "auto", 
        position: "relative",
      }}
    >
      <div
        style={{
          overflowX: "auto",
          width: "100%",
        }}
      >
        <Table
          sx={{
            width: "100%",
            margin: 0,
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          aria-label="user table"
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "8px 10px" }}>Email</TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Phone Number
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Username
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Date of Birth
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Gender
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Education
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Country
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ padding: "8px 10px" }}>
                Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData &&
              paginatedData.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={{ padding: "8px 10px" }}>{row.email}</TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.username}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.dateofbirth}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.gender}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.education}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.country}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {row.role}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: "8px 10px" }}>
                    {new Date(row.created).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {/* Move Pagination Below Table */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <Pagination
          count={Math.ceil(user.length / rowsPerPage)}
          page={page + 1} 
          onChange={handleChangePage} 
          color="primary"
        />
      </div>
    </TableContainer>
  );
}
