import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import NNav from './newnav.jsx';

import Foot from './footer.jsx';// adjust the path as necessary
import "./analysis.css"; 

// Helper to convert priceHistory with OHLC to ApexCharts candlestick format
function priceHistoryToCandlestickData(priceHistory) {
  return priceHistory.map(p => ({
    x: new Date(p.date),
    y: [p.open, p.high, p.low, p.close]
  }));
}

// Base chart options for ApexCharts candlestick
const chartOptionsBase = {
  chart: {
    type: "candlestick",
    height: 350,
    background: "transparent",
    toolbar: { show: true },
  },
  title: {
    text: "Candlestick Price Chart",
    style: { color: "#f8f2ea", fontWeight: "800", fontSize: 20 }
  },
  xaxis: {
    type: "datetime",
    labels: { style: { colors: "#b5bcdc", fontWeight: 600 } },
    axisBorder: { color: "#ffe883" },
    axisTicks: { color: "#ffe883" }
  },
  yaxis: {
    labels: { style: { colors: "#ffe883", fontWeight: 700 } }
  },
  grid: { borderColor: "#2fe8c030" },
  plotOptions: {
    candlestick: {
      colors: { upward: "#ffe883", downward: "#ff7d74" },
      wick: { useFillColor: true }
    }
  },
  tooltip: {
    enabled: true,
    theme: 'dark',
    style: {
      fontSize: '13px',
      fontWeight: 600,
      fontFamily: 'Segoe UI, sans-serif',
      colors: ['#ffffff'] // Force light text
    },
    fillSeriesColor: false,
    onDatasetHover: {
      highlightDataSeries: true
    },
    marker: {
      show: false
    },
    fixed: {
      enabled: false
    },
    background: '#1f2d3d', // Solid dark background
  },
  theme: { mode: "dark" }
};


// Color helper for percentages
const percentColor = (val) => (val >= 0 ? "#30e9b7" : "#f45a6a");

// Table component for displaying financial data
function Table({ title, headers, rows, isPercentage }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2 className="table-heading">{title}</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      color: isPercentage && j > 0
                        ? percentColor(parseFloat(String(cell).replace("%", "")))
                        : undefined,
                      fontWeight: j === 0 ? 700 : 500,
                      textAlign: j === 0 ? "left" : "right",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}


export default function MarketPulse() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch stock data");
        return res.json();
      })
      .then(data => {
        setStocks(data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to load stock data.");
        setLoading(false);
        console.error(err);
      });
  }, []);

  const handleInput = (e) => {
    const val = e.target.value.toUpperCase();
    setSearch(val);
    setSuggestions(
      val.length < 1 ? [] :
      stocks.filter(s =>
        s.symbol.includes(val) || s.name.toUpperCase().includes(val)
      ).slice(0, 5)
    );
  };

  const selectStock = (sym) => {
    const stock = stocks.find(s => s.symbol === sym);
    if (stock) {
      setSelectedStock(stock);
      setSearch(stock.symbol);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundStock = stocks.find(s =>
      s.symbol === search.trim() || s.name.toUpperCase() === search.trim()) || null;
    setSelectedStock(foundStock);
    setSuggestions([]);
  };

  if (loading) {
    return <p>Loading stocks data...</p>;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  const candlestickSeries = selectedStock && selectedStock.priceHistory
    ? [{ data: priceHistoryToCandlestickData(selectedStock.priceHistory) }]
    : [{ data: [] }];

  return (
    <>
      {/* Navbar at the top */}
      <NNav />

      <div className="market-pulse-wrapper">
        {/* REMOVE the old nav you had here */}

        <div className="background-overlay" />

        <form className="search-bar" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="Search stocks e.g. TCS, INFY"
            value={search}
            onChange={handleInput}
            aria-autocomplete="list"
            aria-controls="stock-list"
            spellCheck="false"
          />
          <button type="submit" aria-label="Search" style={{ display: "none" }} />
          {suggestions.length > 0 && (
            <div className="suggestions" id="stock-list" role="listbox">
              {suggestions.map((s) => (
                <div
                  key={s.symbol}
                  role="option"
                  tabIndex={0}
                  className="suggestion"
                  onClick={() => selectStock(s.symbol)}
                  onKeyDown={(e) => {
                    if (["Enter", " "].includes(e.key)) {
                      e.preventDefault();
                      selectStock(s.symbol);
                    }
                  }}
                >
                  {s.symbol} - {s.name}
                </div>
              ))}
            </div>
          )}
        </form>

        <main className="container" role="main" tabIndex={-1}>
          <h1>Market Pulse - Stock Analysis</h1>

          {selectedStock ? (
            <>
              <article className="card overview-card" aria-label="Stock Overview and Details">
                <h2>{selectedStock.name}</h2>
                <p className="markets">{selectedStock.markets}</p>

                <div className="overview-grid" aria-label="Key stock overview metrics">
                  {selectedStock.overview.map(({ label, value }, i) => (
                    <div key={i} className="overview-metric">
                      <span className="overview-label">{label}</span>
                      <span className="overview-value">{value}</span>
                    </div>
                  ))}
                </div>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={() => alert("Ratio editor coming soon!")}
                  className="add-ratio"
                >
                  + Add ratio to table
                </span>

                <section className="pros-cons-row" aria-label="Pros and Cons">
                  <div className="pros-list">
                    <h3>Pros</h3>
                    <ul>
                      {selectedStock.pros.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="cons-list">
                    <h3>Cons</h3>
                    <ul>
                      {selectedStock.cons.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </section>

                <div className="alert-badge" aria-live="polite" aria-atomic="true">
                  ⚡ {selectedStock.alerts.join(" | ")}
                </div>

                <div className="period-btns" aria-label="Selectable periods (not functional)">
                  {selectedStock.periods.map((period) => (
                    <button key={period} className="period-btn" disabled>{period}</button>
                  ))}
                </div>
              </article>

              <section className="chart-section" aria-label={`Price candlestick chart of ${selectedStock.symbol}`}>
                <Chart
                  options={{
                    ...chartOptionsBase,
                    title: {
                      ...chartOptionsBase.title,
                      text: `${selectedStock.name} Candlestick Price Chart`
                    }
                  }}
                  series={candlestickSeries}
                  type="candlestick"
                  height={370}
                />
              </section>

              <Table
                title="Quarterly Consolidated Financials (₹ Crores)"
                headers={["Metric"].concat(selectedStock.quarterly.headers)}
                rows={[
                  ["Sales (₹ Cr)"].concat(selectedStock.quarterly.sales),
                  ["Expenses (₹ Cr)"].concat(selectedStock.quarterly.expenses),
                  ["Net Profit (₹ Cr)"].concat(selectedStock.quarterly.netProfit),
                  ["EPS (₹)"].concat(selectedStock.quarterly.EPS),
                  ["OPM %"].concat(selectedStock.quarterly.OPMPercent.map(v => v + "%"))
                ]}
                isPercentage
              />

              <Table
                title="Yearly Profit & Loss Summary"
                headers={["Metric"].concat(selectedStock.yearlyPL.years)}
                rows={[
                  ["Sales (₹ Cr)"].concat(selectedStock.yearlyPL.sales),
                  ["Expenses (₹ Cr)"].concat(selectedStock.yearlyPL.expenses),
                  ["Net Profit (₹ Cr)"].concat(selectedStock.yearlyPL.netProfit),
                  ["OPM %"].concat(selectedStock.yearlyPL.OPMPercent.map(v => v + "%"))
                ]}
                isPercentage
              />

              <section aria-label="Shareholding Pattern">
                <h3 className="shareholding-heading">Shareholding Pattern (Latest)</h3>
                <div className="shareholding-table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>% Holding</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStock.shareholding.categories.map((cat, i) => (
                        <tr key={i}>
                          <td>{cat}</td>
                          <td style={{ textAlign: "right" }}>
                            {selectedStock.shareholding.percentages[i]}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          ) : (
            <p className="empty-message" aria-live="polite">
              Search a stock (e.g., TCS) to view detailed financial analysis.
            </p>
          )}
        </main>
      </div>

      {/* Footer at the bottom */}
      <Foot />
    </>
  );
}
