import React from "react";
import { Signal, StockSignal, OptionSignal } from '../types'; // Import types
import TradeChart from './TradeChart'; // Added import

interface GenZSignalCardProps {
  signal: Signal; // Now accepts the union type
}

const GenZSignalCard: React.FC<GenZSignalCardProps> = ({ signal }) => {
  // Type guard to check if it's a StockSignal
  const isStockSignal = (s: Signal): s is StockSignal => {
    return (s as StockSignal).instrument !== undefined;
  };

  // Type guard to check if it's an OptionSignal
  const isOptionSignal = (s: Signal): s is OptionSignal => {
    return (s as OptionSignal).symbol !== undefined;
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 to-indigo-900 text-white rounded-xl shadow-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">
          {isStockSignal(signal) ? signal.instrument : isOptionSignal(signal) ? signal.symbol : "Unknown"}
        </h2>
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-sm">
          {isStockSignal(signal) ? signal.signal : isOptionSignal(signal) ? signal.action : "N/A"}
        </span>
      </div>

      <div className="text-sm mb-4 space-y-1">
        <p><strong>Confidence:</strong> {signal.confidence}%</p>
        {isStockSignal(signal) && (
          <>
            <p><strong>Time Horizon:</strong> {signal.time_horizon}</p>
            <p><strong>Exit Conditions:</strong> {signal.exit_conditions}</p>
            <p><strong>Trail Stop:</strong> {signal.trail_stop_level}</p>
            <p><strong>Targets:</strong> {signal.profit_targets.description}</p>
          </>
        )}
        {isOptionSignal(signal) && (
          <>
            <p><strong>Type:</strong> {signal.type}</p>
            <p><strong>Entry:</strong> {signal.entry}</p>
            <p><strong>Stop Loss:</strong> {signal.stoploss}</p>
            <p><strong>Targets:</strong> {signal.targets.join(', ')}</p>
            <p><strong>Expiry:</strong> {signal.expiry}</p>
            <p><strong>Hold Till:</strong> {signal.hold_till}</p>
          </>
        )}
      </div>

      <div className="mb-4">
        <p className="italic text-gray-200">{signal.reasoning}</p>
        {isStockSignal(signal) && signal.specific_instructions && (
          <ul className="list-disc list-inside text-sm mt-2">
            {signal.specific_instructions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Conditionally render chart for live stock signals */}
      {isStockSignal(signal) && signal.status === "live" && (
        <div className="mt-4">
          <TradeChart symbol={signal.instrument} />
        </div>
      )}
    </div>
  );
};

export default GenZSignalCard;