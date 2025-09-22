
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-gradient-to-br from-primary to-secondary rounded-xl p-5 shadow-lg ${className}`}>
      <h3 className="text-xl mb-4 text-profit border-b border-white/10 pb-3 font-semibold">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default Card;
