import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TopBidsTable = ({ topBids }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Top Bids Table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Bid Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topBids.map((bid, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="right">${bid}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopBidsTable;
