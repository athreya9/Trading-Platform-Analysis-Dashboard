import React from 'react';
import { Trade } from '../types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material';

interface TradesTableProps {
  trades: Trade[];
}

const TradesTable: React.FC<TradesTableProps> = ({ trades }) => {
  if (!trades || trades.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, textAlign: 'center', flexGrow: 1 }}>
        <Typography variant="body1" color="text.secondary">
          No recent trades to display.
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3} sx={{ flexGrow: 1 }}>
      <Typography variant="h6" sx={{ p: 2, fontWeight: 'bold' }}>
        Recent Trades
      </Typography>
      <Table aria-label="recent trades table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Ticker</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Type</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>P/L</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trades.map((trade, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {trade.ticker}
              </TableCell>
              <TableCell align="right">{trade.type}</TableCell>
              <TableCell align="right">{trade.price}</TableCell>
              <TableCell align="right" sx={{ color: trade.status === 'profit' ? 'primary.main' : 'error.main' }}>
                {trade.pnl}
              </TableCell>
              <TableCell align="right">
                <Chip
                  label={trade.status}
                  color={trade.status === 'profit' ? 'success' : 'error'}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradesTable;