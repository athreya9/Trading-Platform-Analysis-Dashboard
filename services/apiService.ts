
import { API_BASE_URL } from '../config';
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
  return await apiFetch<DashboardDataResponse>('dashboard-data');
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
