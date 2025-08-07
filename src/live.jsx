import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './live.css';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const API_KEY = '19296a6428f14ad28245a85dcd3ee7c1';

function Live() {
  const [query, setQuery] = useState('');
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState('');
  const intervalRef = useRef(null);

  const fetchStockData = async (symbol) => {
    try {
      const response = await fetch(
        `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=5min&outputsize=30&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === 'error' || !data.values) {
        setChartData(null);
        setStockData(null);
        setError(data.message || 'Stock not found or API limit reached.');
        return;
      }

      const values = [...data.values].reverse();
      const labels = values.map((item) => item.datetime);
      const prices = values.map((item) => parseFloat(item.close));

      const latest = values[values.length - 1];
      const previous = values[values.length - 2];

      const change = (parseFloat(latest.close) - parseFloat(previous.close)).toFixed(2);
      const changePercent = ((change / parseFloat(previous.close)) * 100).toFixed(2);

      setStockData({
        symbol,
        latestPrice: parseFloat(latest.close).toFixed(2),
        volume: latest.volume,
        high: latest.high,
        low: latest.low,
        change,
        changePercent,
      });

      setChartData({
        labels,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: prices,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.1,
          },
        ],
      });

      setError('');
    } catch (err) {
      console.error(err);
      setError('Error fetching stock data.');
      setChartData(null);
      setStockData(null);
    }
  };

  const startAutoRefresh = (symbol) => {
    clearInterval(intervalRef.current);
    fetchStockData(symbol);
    intervalRef.current = setInterval(() => {
      fetchStockData(symbol);
    }, 5000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && query.trim() !== '') {
      startAutoRefresh(query.trim());
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="loginBody">
      <div className="container">
        <h2>Live Stock Tracker</h2>
        <input
          type="text"
          placeholder="🔍 Search Stock Symbol (e.g., AAPL)"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          className="inputText"
          aria-label="Stock symbol input"
        />
        {error && <p className="error">{error}</p>}

        {stockData && (
          <div className="stockMetrics">
            <h2>{stockData.symbol} - Live Stock Data</h2>
            <div className="metricsGrid">
              <p>
                <strong>📈 Current Price:</strong> ${stockData.latestPrice}
              </p>
              <p>
                <strong>📉 Change:</strong> {stockData.change} ({stockData.changePercent}%)
              </p>
              <p>
                <strong>🔺 Day High:</strong> {stockData.high}
              </p>
              <p>
                <strong>🔻 Day Low:</strong> {stockData.low}
              </p>
              <p>
                <strong>📊 Volume:</strong> {stockData.volume}
              </p>
            </div>
          </div>
        )}

        {chartData && (
          <div className="fullWidthChart">
            <Line data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Live;
