
import React from 'react';

const ArchItem: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <div className={`bg-gradient-to-br from-primary to-accent p-4 rounded-lg text-center shadow-md w-full sm:w-auto sm:flex-1 ${className}`}>
    {text}
  </div>
);

const ArchConnector: React.FC = () => (
    <div className="text-2xl text-profit font-bold hidden sm:flex items-center justify-center transform my-2 sm:my-0 sm:rotate-0">
        ⇄
    </div>
);

const ArchConnectorVertical: React.FC = () => (
    <div className="text-2xl text-profit font-bold flex items-center justify-center transform rotate-90 sm:rotate-0 my-2 sm:my-0">
        →
    </div>
);

const ArchitectureDiagram: React.FC = () => {
  return (
    <div className="bg-black/20 p-6 rounded-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch gap-4">
            <ArchItem text="Frontend (Firebase Hosting)" />
            <ArchConnector />
            <ArchItem text="Backend (Cloud Run)" />
            <ArchConnector />
            <ArchItem text="Database (Firestore)" />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch gap-4">
            <ArchItem text="Trading Bot (GitHub)" className="sm:flex-[2]" />
            <ArchConnectorVertical />
            <ArchItem text="KITE API (Zerodha)" className="sm:flex-1" />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-stretch gap-4">
            <ArchItem text="Market Data" />
            <div className="text-2xl text-profit font-bold flex items-center justify-center transform rotate-90 sm:rotate-0">↓</div>
            <ArchItem text="Trade Execution" />
        </div>
    </div>
  );
};

export default ArchitectureDiagram;
