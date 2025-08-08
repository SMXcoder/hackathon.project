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

// Top Gainers and Top Losers data
const topGainers = [
  { symbol: "SHAK", name: "Shakti Pumps India Ltd.", changePercent: 10.72 },
  { symbol: "AAPL", name: "Apple Inc.", changePercent: 1.45 },
  { symbol: "MSFT", name: "Microsoft", changePercent: 0.62 },
];
const topLosers = [
  { symbol: "TSLA", name: "Tesla", changePercent: -0.78 },
  { symbol: "RELI", name: "Reliance", changePercent: -0.4 },
  { symbol: "INFY", name: "Infosys", changePercent: -0.3 },
];

// News categories for market news
const newsCategories = ["Global", "India", "Crypto"];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [watchlist, setWatchlist] = useState(watchlistData);
  const [newsCategory, setNewsCategory] = useState("Global");
  const [newsArticles, setNewsArticles] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const marketStatus = { open: true, timing: "9:15 AM - 3:30 PM IST" };

  const NEWS_API_KEY = "75167a8bbd5247869a56b04268b4e080"; // Use a secure way for production

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

  useEffect(() => {
    const fetchNews = async () => {
      setLoadingNews(true);
      const query = newsCategory === "Global" ? "stock market" : newsCategory.toLowerCase();
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&language=en&pageSize=6&apiKey=${NEWS_API_KEY}`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setNewsArticles(data.articles);
        } else {
          setNewsArticles([]);
        }
      } catch (error) {
        setNewsArticles([]);
      }
      setLoadingNews(false);
    };

    fetchNews();
  }, [newsCategory]);

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

  return (
    <>
      <NNav />

      {/* Hero Banner with header image */}
      <div className="analytics-hero">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ0hBMgYK4Xo-om3KR3Kx65xHqiQ_K7wKYCg&s"
          alt="Stock Analytics Dashboard"
          className="analytics-banner-img"
        />
        <div className="analytics-banner-text">
          <h1>Market Pulse</h1>
          <p>Real-Time Stock Updates & Financial Insights</p>
        </div>
      </div>

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
              list="stock-suggestions"
              autoComplete="off"
              spellCheck={false}
            />
            <datalist id="stock-suggestions">
              {stockSuggestions.map(({ symbol, name }) => (
                <option key={symbol} value={`${symbol} - ${name}`} />
              ))}
            </datalist>
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
                      stroke: stock.changePercent >= 0 ? "#2ea043" : "#f85149",
                      fill: "none",
                    }}
                  />
                </Sparklines>
              </div>
            ))}
          </div>
        </section>

        {/* Top Gainers and Top Losers Section */}
        <section className="top-performers-section">
          <h2>Top Gainers</h2>
          <ul>
            {topGainers.map(({ symbol, name, changePercent }) => (
              <li key={symbol}>
                <span>
                  {name} ({symbol})
                </span>
                <span className="green">+{changePercent.toFixed(2)}%</span>
              </li>
            ))}
          </ul>

          <h2>Top Losers</h2>
          <ul>
            {topLosers.map(({ symbol, name, changePercent }) => (
              <li key={symbol}>
                <span>
                  {name} ({symbol})
                </span>
                <span className="red">{changePercent.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Watchlist always visible */}
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
                  <button onClick={() => removeFromWatchlist(stock.symbol)}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Market News Section */}
        <section className="market-news-section">
          <h2>Market News Feed</h2>
          <div className="news-categories">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                className={newsCategory === cat ? "active" : ""}
                onClick={() => setNewsCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {loadingNews ? (
            <p>Loading news...</p>
          ) : newsArticles.length === 0 ? (
            <p>No news found for {newsCategory}</p>
          ) : (
            <ul className="news-list">
              {newsArticles.map(({ title, url, source }, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noreferrer">
                    {title}
                  </a>
                  <span>({source.name})</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <Foot />

      {/* Additional CSS for banner and new sections (move to Home.css if preferred) */}
      <style>{`
        .analytics-hero {
          position: relative;
          max-width: 100%;
          height: 250px;
          margin-bottom: 30px;
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 0 10px rgba(0,0,0,0.25);
        }
        .analytics-banner-img {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
        }
        .analytics-banner-text {
          position: absolute;
          top: 50%;
          left: 30px;
          transform: translateY(-50%);
          color: white;
          text-shadow: 0 0 10px rgba(0,0,0,0.7);
          user-select: none;
        }
        .analytics-banner-text h1 {
          font-size: 3rem;
          margin: 0 0 5px 0;
        }
        .analytics-banner-text p {
          font-size: 1.2rem;
          margin: 0;
        }
        .top-performers-section {
          margin-top: 30px;
        }
        .top-performers-section h2 {
          color: #2ea043;
          margin-bottom: 8px;
        }
        .top-performers-section ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 20px;
        }
        .top-performers-section li {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          font-weight: 600;
          font-size: 14px;
        }
        .market-news-section {
          margin-top: 40px;
          background: #161b22;
          border-radius: 12px;
          padding: 20px;
          max-height: 350px;
          overflow-y: auto;
        }
        .market-news-section h2 {
          color: #2ea043;
          margin-bottom: 12px;
        }
        .news-categories button {
          margin-right: 12px;
          padding: 6px 14px;
          border-radius: 14px;
          border: 2px solid #238636;
          background: transparent;
          color: #8b949e;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
        }
        .news-categories button.active {
          background-color: #238636;
          color: #c9d1d9;
        }
        .news-list {
          list-style: none;
          padding-left: 0;
          margin-top: 16px;
        }
        .news-list li {
          margin-bottom: 12px;
        }
        .news-list a {
          color: #2ea043;
          font-weight: 600;
          text-decoration: none;
        }
        .news-list a:hover {
          text-decoration: underline;
        }
        .news-list span {
          margin-left: 8px;
          font-size: 12px;
          color: #8b949e;
        }
      `}</style>
    </>
  );
}
