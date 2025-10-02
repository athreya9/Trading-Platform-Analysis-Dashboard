export type StatusType = 'connected' | 'disconnected' | 'warning';

export interface Status {
  name: string;
  status: StatusType;
}

export interface Trade {
  ticker: string;
  type: 'Buy' | 'Sell';
  price: string;
  pnl: string;
  status: 'profit' | 'loss';
}

export interface AiSignalData {
  marketOutlook: string;
  outlookReason: string;
  recommendations: {
    title: string;
    action: string;
  }[];
}

// Existing Signal renamed to StockSignal
export interface StockSignal {
  instrument: string;
  trend: string;
  signal: string; // e.g., BUY, AVOID, HOLD
  confidence: number;
  reasoning: string;
  technical_score: number;
  specific_instructions: string[];
  profit_targets: { description: string; targets: number[] };
  time_horizon: string;
  exit_conditions: string;
  trail_stop_level: string;
  // Added status and generated_at from backend changes
  status?: "live" | "dry_run";
  generated_at?: string;
}

// New interface for Option Signals, matching GenZSignalCardProps
export interface OptionSignal {
  symbol: string; // e.g., BANKNIFTY24SEP48000CE
  type: string; // e.g., Call Option, Put Option
  entry: number;
  stoploss: number;
  targets: number[];
  expiry: string; // Date string
  confidence: number;
  hold_till: string; // Date string
  reasoning: string;
  action: string; // This is the action (e.g., "Buy")
  status?: "live" | "dry_run"; // This is the live/inactive status
  generated_at?: string;
}

// Union type for all possible signals
export type Signal = StockSignal | OptionSignal;