
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
