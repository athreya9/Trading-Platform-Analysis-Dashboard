
import { API_BASE_URL } from '../config'; // Changed from GITHUB_RAW_URL
import type { Status, Trade, Signal } from '../types';

interface DashboardDataResponse {
  statuses: Status[];
  trades: Trade[];
  signals: Signal[];
}

export const fetchDashboardData = async (): Promise<DashboardDataResponse> => {
  console.log('Fetching data from backend API...'); // Updated log message

  try {
    const [tradesResponse, botStatusResponse, signalsResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/trades?t=${Date.now()}`), // Changed endpoint
      fetch(`${API_BASE_URL}/api/status?t=${Date.now()}`), // Changed endpoint
      fetch(`${API_BASE_URL}/api/trading-signals?t=${Date.now()}`), // Changed endpoint
    ]);

    if (!tradesResponse.ok) {
      console.warn('Could not fetch trades from backend API.');
    }
    if (!botStatusResponse.ok) {
      console.warn('Could not fetch bot status from backend API.');
    }
    if (!signalsResponse.ok) {
      console.warn('Could not fetch signals from backend API.');
    }

    const rawTrades = tradesResponse.ok ? await tradesResponse.json() : [];
    const rawBotStatus = botStatusResponse.ok ? await botStatusResponse.json() : []; // This will be an array of statuses
    const signals = signalsResponse.ok ? await signalsResponse.json() : [];

    // Map trades data from backend API response
    const trades: Trade[] = (rawTrades || []).map((trade: any) => ({
      ticker: trade.instrument || 'N/A',
      type: trade.position_size > 0 ? 'Buy' : 'Sell',
      price: trade.underlying_price ? parseFloat(trade.underlying_price).toFixed(2) : '0.00',
      pnl: trade['P/L'] || '0.00',
      status: parseFloat(trade['P/L']) >= 0 ? 'profit' : 'loss',
    })).reverse();

    // Extract Trading Bot status from the array of statuses
    const tradingBotStatus = rawBotStatus.find((s: Status) => s.name === 'Trading Bot');
    const isBotRunning = tradingBotStatus ? tradingBotStatus.status === 'connected' : false;

    const statuses: Status[] = [
      { name: 'Trading Bot', status: isBotRunning ? 'connected' : 'disconnected' },
      { name: 'Data Source', status: 'connected' }, // Assuming data source is always connected if API is up
    ];

    return { statuses, trades, signals };

  } catch (error: any) {
    console.error('Error fetching dashboard data from backend API:', error);
    const statuses: Status[] = [
        { name: 'Trading Bot', status: 'disconnected' },
        { name: 'Data Source', status: 'disconnected' },
    ];
    return { statuses, trades: [], signals: [] };
  }
};
