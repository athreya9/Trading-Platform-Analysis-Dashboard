
import React from 'react';

// Using a static mock data for simplicity and consistency
const mockData = [
    { value: 100 }, { value: 102 }, { value: 105 }, { value: 98 }, { value: 110 }, 
    { value: 115 }, { value: 112 }, { value: 120 }, { value: 122 }, { value: 118 },
    { value: 125 }, { value: 130 }, { value: 128 }, { value: 135 }, { value: 140 },
    { value: 138 }, { value: 145 }, { value: 150 }, { value: 148 }, { value: 142 },
    { value: 144 }, { value: 155 }, { value: 160 }, { value: 158 }, { value: 155 },
    { value: 162 }, { value: 165 }, { value: 163 }, { value: 170 }, { value: 175 },
];

const PerformanceChart: React.FC = () => {
  const data = mockData;
  const width = 500;
  const height = 200;
  const padding = 20;

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));

  const getX = (index: number) => padding + (index / (data.length - 1)) * (width - 2 * padding);
  const getY = (value: number) => height - padding - ((value - minValue) / (maxValue - minValue)) * (height - 2 * padding);

  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`).join(' ');
  const areaPath = `${linePath} L ${getX(data.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

  return (
    <div className="bg-gradient-to-br from-primary to-accent rounded-xl p-5 shadow-lg overflow-hidden">
        <h3 className="text-xl mb-4 text-profit border-b border-white/10 pb-3 font-semibold">
            Portfolio Performance (30d)
        </h3>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-labelledby="chart-title">
            <title id="chart-title">Portfolio Performance Chart</title>
            <defs>
                <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#area-gradient)" />
            <path d={linePath} fill="none" stroke="#10b981" strokeWidth="2" />
        </svg>
    </div>
  );
};

export default PerformanceChart;
