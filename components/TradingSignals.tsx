import React from 'react';
import { Paper, Typography, Box, Grid, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import type { Signal } from '../types';

interface TradingSignalsProps {
  signals: Signal[];
}

const TradingSignals: React.FC<TradingSignalsProps> = ({ signals }) => {
  if (!signals || signals.length === 0) {
    return <Typography>No trading signals available at the moment.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        AI Trading Signals
      </Typography>
      <Grid container spacing={3}>
        {signals.map((signal, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {signal.instrument}
                </Typography>
                {signal.trend === 'UP' ? (
                  <Chip icon={<TrendingUpIcon />} label="Bullish" color="success" />
                ) : (
                  <Chip icon={<TrendingDownIcon />} label="Bearish" color="error" />
                )}
              </Box>
              <Typography variant="body1"><strong>Signal:</strong> {signal.signal}</Typography>
              <Typography variant="body1"><strong>Confidence:</strong> {signal.confidence}%</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default TradingSignals;
