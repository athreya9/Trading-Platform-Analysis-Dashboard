
import React, { useState } from 'react';
import { fetchTradingSignals } from '../services/geminiService';
import type { AiSignalData } from '../types';

const AiSignals: React.FC = () => {
  const [signals, setSignals] = useState<AiSignalData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSignals = async () => {
    setIsLoading(true);
    setError(null);
    setSignals(null);
    try {
      const data = await fetchTradingSignals();
      setSignals(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const AiSuggestion: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
      <div className="bg-profit/10 border-l-4 border-profit p-4 rounded-md my-3">
        <h4 className="font-semibold text-profit/90">{title}</h4>
        <p className="text-sm text-text-main/90">{children}</p>
      </div>
  );

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-profit"></div>
          <span className="ml-3">Generating Signals...</span>
        </div>
      )}

      {error && (
        <div className="bg-loss/10 border-l-4 border-loss p-4 rounded-md my-3 text-sm text-loss/90">
          <strong>Error:</strong> {error}
        </div>
      )}

      {!isLoading && !signals && !error && (
        <div className="text-center text-gray-400 my-4">
            Click the button to generate the latest AI-powered trading signals.
        </div>
      )}
      
      {signals && (
        <div>
          <AiSuggestion title={`Current Market Outlook: ${signals.marketOutlook}`}>
            {signals.outlookReason}
          </AiSuggestion>
          {signals.recommendations.map((rec, index) => (
             <AiSuggestion key={index} title={rec.title}>
              {rec.action}
            </AiSuggestion>
          ))}
        </div>
      )}

      <div className="mt-5">
        <button
          onClick={handleGenerateSignals}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-profit to-teal-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? 'Processing...' : 'Generate New Signals'}
        </button>
      </div>
    </div>
  );
};

export default AiSignals;
