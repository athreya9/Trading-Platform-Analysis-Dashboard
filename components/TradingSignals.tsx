import React, { useState } from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import type { Signal, StockSignal, OptionSignal } from '../types';
import GenZSignalCard from './GenZSignalCard';

interface TradingSignalsProps {
  signals: Signal[];
}

const TradingSignals: React.FC<TradingSignalsProps> = ({ signals }) => {
  const [activeTab, setActiveTab] = useState("Equity");

  const tabs = ["Equity", "Options", "Sentiment"];

  // Filter signals based on the active tab
  const filteredSignals = signals.filter(signal => {
    if (activeTab === "Equity") {
      return (signal as StockSignal).category === "Equity";
    } else if (activeTab === "Options") {
      return (signal as OptionSignal).category === "Options";
    } else if (activeTab === "Sentiment") {
      // Sentiment signals are not explicitly defined yet, so this tab will be empty for now
      return false;
    }
    return false;
  });

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
      {/* Tab buttons */}
      <div className="flex space-x-4 mb-4">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full ${
              activeTab === tab ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Render filtered signals */}
      <Grid container spacing={3}>
        {filteredSignals.length > 0 ? (
          filteredSignals.map((signal, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <GenZSignalCard signal={signal} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1">No {activeTab} Signals available.</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TradingSignals;