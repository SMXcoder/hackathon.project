import React, { useState, useEffect, useMemo } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import NNav from "./newnav.jsx";
import Foot from "./footer.jsx";
import "./Home.css";

// ------- Dummy data (replace with API calls later) -------
const liveIndices = [
  { name: "Nifty 50", value: 17684.25, change: 0.53 },
  { name: "Sensex", value: 59730.12, change: -0.23 },
  { name: "Nasdaq", value: 15213.67, change: 0.73 },
];

const trendingStocksData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.54,
    changePercent: 1.45,
    volume: 35000000,
    dayHigh: 183.0,
    dayLow: 179.5,
    sparkline: [178, 179, 180, 181, 182, 182.5, 182.54],
  },
  {
    symbol: "SHAK",
    name: "Shakti Pumps India Ltd.",
    price: 871.5,
    changePercent: 10.72,
    volume: 3807138,
    dayHigh: 906.45,
    dayLow: 776.0,
    sparkline: [563, 632, 657, 656, 776, 871, 906.45],
  },
  {
    symbol: "MSFT",
    name: "Microsoft",
    price: 312.5,
    changePercent: 0.62,
    volume: 26000000,
    dayHigh: 315.0,
    dayLow: 310.5,
    sparkline: [310, 309, 311, 312, 312.3, 312.7, 312.5],
  },
];

const watchlistData = [
  {
    symbol: "INFY",
    name: "Infosys",
    price: 1350.33,
    changePercent: 0.85,
    volume: 22000000,
    dayHigh: 1365.0,
    dayLow: 1345.0,
    sparkline: [1340, 1345, 1348, 1352, 1351, 1353, 1350.33],
  },
];

// ---------------------------------------------------------

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState(watchlistData);
  const loggedIn = true;
  const marketStatus = { open: true, timing: "9:15 AM - 3:30 PM IST" };

  const stockSuggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const searchL = searchTerm.toLowerCase();
    return [...trendingStocksData, ...watchlist]
      .filter(
        (s) =>
          s.name.toLowerCase().includes(searchL) ||
          s.symbol.toLowerCase().includes(searchL)
      )
      .slice(0, 5);
  }, [searchTerm, watchlist]);

  function addToWatchlist(stock) {
    if (watchlist.find((s) => s.symbol === stock.symbol)) return;
    setWatchlist((prev) => [...prev, stock]);
  }

  function removeFromWatchlist(symbol) {
    setWatchlist((prev) => prev.filter((s) => s.symbol !== symbol));
  }

  function handleSearchSubmit() {
    if (!searchTerm.trim()) {
      alert("Please enter a stock name, ticker, or sector.");
      return;
    }
    alert(`Searching for "${searchTerm.trim()}" (mock search)`);
    setSearchTerm("");
  }

  // ---------------- RENDER ----------------
  return (
    <>
      <NNav />

      <div className="home-page-wrapper">
        {/* Hero / Indices Section */}
        <section className="hero-section">
          <div className="indices-box">
            <h2>Live Indices</h2>
            <ul>
              {liveIndices.map(({ name, value, change }) => (
                <li key={name}>
                  <span>{name}</span>
                  <strong>{value.toFixed(2)}</strong>
                  <span className={change >= 0 ? "green" : "red"}>
                    {change >= 0 ? "+" : ""}
                    {change.toFixed(2)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="status-box">
            <h4>Market Status</h4>
            <p className={marketStatus.open ? "green" : "red"}>
              {marketStatus.open ? "Open" : "Closed"} — {marketStatus.timing}
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search stocks by name, ticker or sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            />
            <button onClick={handleSearchSubmit}>Search</button>
          </div>
          {stockSuggestions.length > 0 && (
            <ul className="suggestions">
              {stockSuggestions.map((s) => (
                <li key={s.symbol}>
                  {s.symbol} - {s.name}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Trending Stocks */}
        <section className="trending-section">
          <h2>Trending Stocks</h2>
          <div className="trending-grid">
            {trendingStocksData.map((stock) => (
              <div className="stock-card" key={stock.symbol}>
                <div className="card-header">
                  <strong>
                    {stock.name} <em>({stock.symbol})</em>
                  </strong>
                  <button
                    onClick={() => addToWatchlist(stock)}
                    disabled={watchlist.some((ws) => ws.symbol === stock.symbol)}
                  >
                    {watchlist.some((ws) => ws.symbol === stock.symbol)
                      ? "Added"
                      : "Add"}
                  </button>
                </div>
                <div className="price-line">
                  <strong>${stock.price.toFixed(2)}</strong>
                  <span className={stock.changePercent >= 0 ? "green" : "red"}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="metrics">
                  <div>Vol: {stock.volume.toLocaleString()}</div>
                  <div>H: ${stock.dayHigh}</div>
                  <div>L: ${stock.dayLow}</div>
                </div>
                <Sparklines data={stock.sparkline} svgWidth={100} svgHeight={35}>
                  <SparklinesLine
                    style={{
                      strokeWidth: 2,
                      stroke:
                        stock.changePercent >= 0 ? "#2ea043" : "#f85149",
                      fill: "none",
                    }}
                  />
                </Sparklines>
              </div>
            ))}
          </div>
        </section>

        {/* Watchlist */}
        {loggedIn && (
          <section className="watchlist-section">
            <h2>Your Watchlist</h2>
            {watchlist.length === 0 ? (
              <p>No stocks in your watchlist.</p>
            ) : (
              <ul>
                {watchlist.map((stock) => (
                  <li key={stock.symbol}>
                    <span>
                      {stock.symbol} ({stock.name})
                    </span>
                    <span className={stock.changePercent >= 0 ? "green" : "red"}>
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                    <button onClick={() => removeFromWatchlist(stock.symbol)}>
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>

      <Foot />
    </>
  );
}
