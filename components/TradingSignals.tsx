import React from 'react';
import { Paper, Typography, Box, Grid, Chip, Divider, Card, CardContent, CardHeader, Avatar } from '@mui/material';
import { TrendingUp, TrendingDown, TrackChanges, AccessTime, Flag, Block } from '@mui/icons-material';
import type { Signal } from '../types';

interface TradingSignalsProps {
  signals: Signal[];
}

const SignalCard: React.FC<{ signal: Signal }> = ({ signal }) => {
  const isBullish = signal.trend === 'UP';
  const isBearish = signal.trend === 'DOWN';
  const isBuy = signal.signal === 'BUY';
  const isAvoid = signal.signal === 'AVOID';

  const avatarBgColor = isBullish ? 'success.main' : isBearish ? 'error.main' : 'grey.700';
  const avatarIcon = isBullish ? <TrendingUp /> : <TrendingDown />;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: avatarBgColor }}>{avatarIcon}</Avatar>}
        title={signal.instrument}
        subheader={isBuy ? `Action: BUY` : isAvoid ? `Action: AVOID` : `Action: HOLD`}
        titleTypographyProps={{ fontWeight: 'bold' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>{signal.reasoning}</Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Confidence:</strong> {signal.confidence?.toFixed(2) ?? 'N/A'}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2"><strong>Tech Score:</strong> {signal.technical_score?.toFixed(2) ?? 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2"><strong>Time Horizon:</strong> {signal.time_horizon ?? 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrackChanges sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2"><strong>Profit Targets:</strong> {signal.profit_targets?.description ?? 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Block sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2"><strong>Exit Conditions:</strong> {signal.exit_conditions ?? 'N/A'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Flag sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body2"><strong>Trail Stop:</strong> {signal.trail_stop_level ?? 'N/A'}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const TradingSignals: React.FC<TradingSignalsProps> = ({ signals }) => {
  if (!signals || signals.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: 'center' }}>
        <Typography variant="h6">No active trading signals at the moment.</Typography>
        <Typography variant="body2" color="text.secondary">The AI engine is scanning the markets. New signals will appear here automatically.</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        AI Trading Signals
      </Typography>
      <Grid container spacing={3}>
        {signals.map((signal, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <SignalCard signal={signal} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TradingSignals;
