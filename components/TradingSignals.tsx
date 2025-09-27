
import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, Grid, CircularProgress, Alert, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface Signal {
  instrument: string;
  price: number;
  trend: string;
  signal: string;
  strikePrice: number;
  premium: number;
  expiry: string;
  lotSize: number;
  atm: number;
  otm: number;
  itm: number;
}

const TradingSignals: React.FC = () => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSignals = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/trading-signals');
        if (!response.ok) {
          throw new Error('Failed to fetch trading signals');
        }
        const data = await response.json();
        setSignals(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchSignals();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Real-Time Trading Signals
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
              <Typography variant="body1"><strong>Current Price:</strong> {signal.price.toFixed(2)}</Typography>
              <Typography variant="body1"><strong>Signal:</strong> {signal.signal}</Typography>
              <Typography variant="body1"><strong>Strike Price:</strong> {signal.strikePrice}</Typography>
              <Typography variant="body1"><strong>Premium:</strong> {signal.premium}</Typography>
              <Typography variant="body1"><strong>Expiry:</strong> {new Date(signal.expiry).toLocaleDateString()}</Typography>
              <Typography variant="body1"><strong>Lot Size:</strong> {signal.lotSize}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip label={`ITM: ${signal.itm}`} sx={{ mr: 1 }} />
                <Chip label={`ATM: ${signal.atm}`} sx={{ mr: 1 }} color="primary" />
                <Chip label={`OTM: ${signal.otm}`} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default TradingSignals;
