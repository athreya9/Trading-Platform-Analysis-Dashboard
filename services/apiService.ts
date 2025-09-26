
import { API_BASE_URL, GITHUB_RAW_URL } from '../config';
import type { Status, Trade } from '../types';

interface DashboardDataResponse {
  statuses: Status[];
  trades: Trade[];
}

const apiFetch = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}/${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(errorData.message || `An unknown server error occurred.`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`API call to ${url} failed:`, error);
    throw new Error(error.message || 'Network request failed. Please check your connection or the API server.');
  }
};

export const fetchDashboardData = async (): Promise<DashboardDataResponse> => {
  try {
    // Fetch trades and bot status in parallel
    const [tradesResponse, botStatusResponse] = await Promise.all([
      fetch(`${GITHUB_RAW_URL}/trade_log.json`),
      fetch(`${GITHUB_RAW_URL}/bot_control.json`)
    ]);

    if (!tradesResponse.ok || !botStatusResponse.ok) {
      // If a file is not found, we don't want to crash the whole app
      console.warn('Could not fetch one or more data files from GitHub. This may be expected if the bot has not run yet.');
    }

    const rawTrades = tradesResponse.ok ? await tradesResponse.json() : [];
    const rawBotStatus = botStatusResponse.ok ? await botStatusResponse.json() : [];

    // Map raw trade data to the frontend Trade type
    const trades: Trade[] = (rawTrades || []).map((trade: any) => ({
      ticker: trade.instrument || 'N/A',
      type: trade.position_size > 0 ? 'Buy' : 'Sell', // Assuming position_size indicates buy/sell
      price: trade.underlying_price ? parseFloat(trade.underlying_price).toFixed(2) : '0.00',
      pnl: trade['P/L'] || '0.00',
      status: parseFloat(trade['P/L']) >= 0 ? 'profit' : 'loss',
    })).reverse(); // Show most recent trades first

    // Create status from bot control data
    const latestBotStatus = rawBotStatus.length > 0 ? rawBotStatus[rawBotStatus.length - 1] : null;
    const isBotRunning = latestBotStatus && latestBotStatus.status === 'running';
    const statuses: Status[] = [
      { name: 'Trading Bot', status: isBotRunning ? 'connected' : 'disconnected' },
      { name: 'KITE API', status: 'disconnected' }, // Placeholder, as we don't have this info from JSON files
      { name: 'Market Data', status: 'connected' }, // Placeholder
    ];

    return { statuses, trades };

  } catch (error: any) {
    console.error('Failed to fetch or process dashboard data from GitHub:', error);
    // Return empty data on error to avoid crashing the UI
    const statuses: Status[] = [
        { name: 'Trading Bot', status: 'disconnected' },
        { name: 'KITE API', status: 'disconnected' },
        { name: 'Market Data', status: 'disconnected' },
    ];
    return { statuses, trades: [] };
  }
};

export const postControlAction = async (action: string): Promise<{ message: string }> => {
  return await apiFetch<{ message: string }>('control', {
    method: 'POST',
    body: JSON.stringify({ action }),
  });
};

export const initiateKiteLogin = async (): Promise<void> => {
  window.location.href = `${API_BASE_URL}/kite-login`;
};

export const checkApiHealth = async (): Promise<{ status: 'ok' | string }> => {
    return await apiFetch<{ status: 'ok' | string }>('health');
};

export const handleKiteAuthCallback = async (requestToken: string): Promise<{ message: string }> => {
    return await apiFetch<{ message: string }>('kite-callback', {
        method: 'POST',
        body: JSON.stringify({ request_token: requestToken }),
    });
};
