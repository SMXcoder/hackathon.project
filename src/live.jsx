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
import NNav from './newnav.jsx';
import Foot from './footer.jsx';
import './live.css';
import './styles.css';

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

      // Chart gradient colors
      const tempCanvas = document.createElement('canvas');
      const ctx = tempCanvas.getContext('2d');

      const gradientStroke = ctx.createLinearGradient(0, 0, 0, 400);
      gradientStroke.addColorStop(0, 'rgba(0, 200, 255, 1)');
      gradientStroke.addColorStop(1, 'rgba(0, 100, 180, 0.3)');

      const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
      gradientFill.addColorStop(0, 'rgba(0, 200, 255, 0.25)');
      gradientFill.addColorStop(1, 'rgba(0, 20, 40, 0)');

      setChartData({
        labels,
        datasets: [
          {
            label: `${symbol} Stock Price`,
            data: prices,
            borderColor: gradientStroke,
            backgroundColor: gradientFill,
            borderWidth: 2,
            fill: true,
            pointRadius: 3,
            pointHoverRadius: 6,
            pointBackgroundColor: '#00c8ff',
            pointBorderColor: '#000',
            tension: 0.4,
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
    <>
      <NNav />
      <div className="live-page-wrapper">
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
                  <p><strong>📈 Current Price:</strong> ${stockData.latestPrice}</p>
                  <p><strong>📉 Change:</strong> {stockData.change} ({stockData.changePercent}%)</p>
                  <p><strong>🔺 Day High:</strong> {stockData.high}</p>
                  <p><strong>🔻 Day Low:</strong> {stockData.low}</p>
                  <p><strong>📊 Volume:</strong> {stockData.volume}</p>
                </div>
              </div>
            )}
            {chartData && (
              <div className="fullWidthChart">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        labels: { color: '#e0f7ff', font: { size: 13 } },
                      },
                      tooltip: {
                        enabled: true,
                        mode: 'nearest',
                        intersect: false,
                        backgroundColor: 'rgba(0,30,40,0.95)',
                        titleColor: '#00c8ff',
                        bodyColor: '#e0f7ff',
                        borderColor: '#024b5fff',
                        borderWidth: 1,
                        callbacks: {
                          title: (context) => `Date: ${context[0].label}`,
                          label: (context) => `Price: $${context.parsed.y}`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: '#046a8bff' }, // bright readable date color
                        grid: { color: 'rgba(0, 200, 255, 0.1)' },
                      },
                      y: {
                        ticks: { color: '#046a8bff' },
                        grid: { color: 'rgba(0, 200, 255, 0.1)' },
                      },
                    },
                    animation: { duration: 800, easing: 'easeOutQuart' },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Foot />
    </>
  );
}

export default Live;
