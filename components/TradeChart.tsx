import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TradeChartProps {
  symbol: string;
}

const TradeChart: React.FC<TradeChartProps> = ({ symbol }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/chartData?symbol=${symbol}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setChartData(data);
      } catch (err: any) {
        console.error("Failed to fetch chart data:", err);
        setError(err.message || "Failed to fetch chart data");
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchChartData();
    }
  }, [symbol]);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!chartData || !chartData.datasets || chartData.datasets[0].data.length === 0) return <p>No chart data available.</p>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${symbol} Price - Last 7 Days`,
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10 // Adjust as needed
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default TradeChart;