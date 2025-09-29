
import { GITHUB_RAW_URL } from '../config';
import type { Status, Trade, Signal } from '../types';

interface DashboardDataResponse {
  statuses: Status[];
  trades: Trade[];
  signals: Signal[];
}

export const fetchDashboardData = async (): Promise<DashboardDataResponse> => {
  console.log('Fetching data from GitHub...');

  try {
    const [tradesResponse, botStatusResponse, signalsResponse] = await Promise.all([
      fetch(`${GITHUB_RAW_URL}/trade_log.json?t=${Date.now()}`),
      fetch(`${GITHUB_RAW_URL}/bot_control.json?t=${Date.now()}`),
      fetch(`${GITHUB_RAW_URL}/signals.json?t=${Date.now()}`),
    ]);

    if (!tradesResponse.ok) {
      console.warn('Could not fetch trade_log.json from GitHub.');
    }
    if (!botStatusResponse.ok) {
      console.warn('Could not fetch bot_control.json from GitHub.');
    }
    if (!signalsResponse.ok) {
      console.warn('Could not fetch signals.json from GitHub.');
    }

    const rawTrades = tradesResponse.ok ? await tradesResponse.json() : [];
    const rawBotStatus = botStatusResponse.ok ? await botStatusResponse.json() : [];
    const signals = signalsResponse.ok ? await signalsResponse.json() : [];

    const trades: Trade[] = (rawTrades || []).map((trade: any) => ({
      ticker: trade.instrument || 'N/A',
      type: trade.position_size > 0 ? 'Buy' : 'Sell',
      price: trade.underlying_price ? parseFloat(trade.underlying_price).toFixed(2) : '0.00',
      pnl: trade['P/L'] || '0.00',
      status: parseFloat(trade['P/L']) >= 0 ? 'profit' : 'loss',
    })).reverse();

    const latestBotStatus = rawBotStatus.length > 0 ? rawBotStatus[rawBotStatus.length - 1] : null;
    const isBotRunning = latestBotStatus && latestBotStatus.status === 'running';
    const statuses: Status[] = [
      { name: 'Trading Bot', status: isBotRunning ? 'connected' : 'disconnected' },
      { name: 'Data Source', status: 'connected' },
    ];

    return { statuses, trades, signals };

  } catch (error: any) {
    console.error('Error fetching dashboard data:', error);
    const statuses: Status[] = [
        { name: 'Trading Bot', status: 'disconnected' },
        { name: 'Data Source', status: 'disconnected' },
    ];
    return { statuses, trades: [], signals: [] };
  }
};
