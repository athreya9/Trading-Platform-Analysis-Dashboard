import React from "react";
import { OptionSignal } from "../types";

export interface OptionSignalProps {
  symbol: string;
  type: string;
  entry: number;
  stoploss: number;
  targets: number[];
  expiry: string;
  confidence: number;
  hold_till: string;
  reasoning: string;
}

const GenZSignalCard: React.FC<{ signal: OptionSignal }> = ({ signal }) => {
  return (
    <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white rounded-xl shadow-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{signal.symbol}</h2>
        <span className="bg-black bg-opacity-30 px-3 py-1 rounded-full text-sm">{signal.type}</span>
      </div>

      <div className="text-sm mb-4">
        <p><span className="font-semibold">Entry:</span> ₹{signal.entry}</p>
        <p><span className="font-semibold">Stoploss:</span> ₹{signal.stoploss}</p>
        <p><span className="font-semibold">Targets:</span> {signal.targets.map(t => `₹${t}`).join(", ")}</p>
        <p><span className="font-semibold">Expiry:</span> {signal.expiry}</p>
        <p><span className="font-semibold">Hold till:</span> {signal.hold_till}</p>
      </div>

      <div className="mb-4">
        <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-green-400 h-2 rounded-full"
            style={{ width: `${signal.confidence}%` }}
          ></div>
        </div>
        <p className="text-xs mt-1 text-green-300">Confidence: {signal.confidence}%</p>
      </div>

      <p className="text-sm italic text-gray-200">{signal.reasoning}</p>
    </div>
  );
};

export default GenZSignalCard;