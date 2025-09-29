import React from 'react';
import { Paper, Typography, Box, Grid, Chip, Divider } from '@mui/material';
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
          <Grid item xs={12} key={index}>
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
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>Signal:</strong> {signal.signal}</Typography>
                  <Typography variant="body1"><strong>Confidence:</strong> {signal.confidence?.toFixed(2) ?? 'N/A'}%</Typography>
                  <Typography variant="body1"><strong>Technical Score:</strong> {signal.technical_score?.toFixed(2) ?? 'N/A'}</Typography>
                  <Typography variant="body1"><strong>Time Horizon:</strong> {signal.time_horizon ?? 'N/A'}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1"><strong>Profit Targets:</strong> {signal.profit_targets?.description ?? 'N/A'}</Typography>
                  <Typography variant="body1"><strong>Exit Conditions:</strong> {signal.exit_conditions ?? 'N/A'}</Typography>
                  <Typography variant="body1"><strong>Trail Stop Level:</strong> {signal.trail_stop_level ?? 'N/A'}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Reasoning:</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>{signal.reasoning}</Typography>
              {signal.specific_instructions && signal.specific_instructions.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Instructions:</Typography>
                  <ul>
                    {signal.specific_instructions.map((instruction, i) => (
                      <li key={i}><Typography variant="body2">{instruction}</Typography></li>
                    ))}
                  </ul>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default TradingSignals;
