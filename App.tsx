import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Grid, CircularProgress, Typography } from '@mui/material';
import Header from './components/Header';
import { SystemControls } from './components/SystemControls';
import TradesTable from './components/TradesTable';
import { fetchDashboardData } from './services/apiService';
import { checkIndianMarketHours } from './src/utils/marketHours';
import TradingSignals from './components/TradingSignals';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4ecca3',
    },
    secondary: {
      main: '#ff9a3d',
    },
    background: {
      default: '#0d0d1a',
      paper: '#1a1a2e',
    },
    text: {
      primary: '#eeeeee',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  },
});

const App: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [systemStatus, setSystemStatus] = useState<{
    botStatus: string;
    marketStatus: string | null;
    nextTraining: string;
    lastSignal: string;
  }>({
    botStatus: 'stopped',
    marketStatus: null, // Initial state: loading
    nextTraining: 'Next Monday',
    lastSignal: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
        setSystemStatus(determineSystemStatus());
        setLoading(false);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  const determineSystemStatus = () => {
    const isMarketOpen = checkIndianMarketHours(new Date());
    return {
      botStatus: isMarketOpen ? 'running' : 'stopped',
      marketStatus: isMarketOpen ? 'open' : 'closed',
      nextTraining: getNextTrainingDay(),
      lastSignal: getLastSignalTime()
    };
  };

  const getNextTrainingDay = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextMonday = days[(new Date().getDay() + 1) % 7];
    return `Next ${nextMonday}`;
  };

  const getLastSignalTime = () => {
    return 'BANKNIFTY CE - 2 hours ago';
  };

  if (loading) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Container>
      </ThemeProvider>
    );
  }

  if (error) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography color="error">{error}</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Header />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <SystemControls
              botStatus={systemStatus.botStatus}
              marketStatus={systemStatus.marketStatus}
              nextTraining={systemStatus.nextTraining}
              lastSignal={systemStatus.lastSignal}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            {dashboardData ? (
              <TradesTable trades={dashboardData.trades} />
            ) : (
              <Typography>No trade data available.</Typography>
            )}
          </Grid>
          {dashboardData && dashboardData.signals && (
            <Grid item xs={12}>
              <TradingSignals signals={dashboardData.signals} />
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;