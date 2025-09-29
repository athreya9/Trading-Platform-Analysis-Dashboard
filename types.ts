
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

export interface Signal {
  instrument: string;
  trend: string;
  signal: string;
  confidence: number;
  reasoning: string;
  technical_score: number;
  specific_instructions: string[];
  profit_targets: { description: string; targets: number[] };
  time_horizon: string;
  exit_conditions: string;
  trail_stop_level: string;
}
