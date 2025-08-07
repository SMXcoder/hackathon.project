import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const LiveStock = () => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace this with your real stock symbol and API
  const stockSymbol = 'AAPL'; // Example: Apple Inc.
  const API_KEY = 'YOUR_API_KEY';
  const API_URL = `https://api.example.com/quote?symbol=${stockSymbol}&apikey=${API_KEY}`;

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Replace with real API
        const response = await axios.get(API_URL);

        // Simulated Data for testing
        const data = {
          symbol: stockSymbol,
          price: 195.20,
          changePercent: -0.56,
          volume: 13230000,
          lastUpdate: new Date().toLocaleTimeString(),
        };

        setStockData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg font-medium">Loading live stock data...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl border-2 border-gray-100 rounded-2xl bg-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">📈 Live Stock Data</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Symbol</span>
              <span className="font-semibold text-black">{stockData.symbol}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Price</span>
              <span className="font-semibold text-green-600 text-base">${stockData.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Change %</span>
              <span className={`flex items-center font-semibold ${stockData.changePercent >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {stockData.changePercent >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                {stockData.changePercent}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Volume</span>
              <span className="font-semibold text-black">{stockData.volume.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Last Updated</span>
              <span className="font-medium text-gray-700">{stockData.lastUpdate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveStock;

