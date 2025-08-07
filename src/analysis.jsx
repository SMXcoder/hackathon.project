import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./analysis.css";
const STOCKS = [
  {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd.",
    markets: "Part of: BSE Sensex, Nifty 50, BSE 500, BSE IT, BSE 100",
    overview: [
      { label: "Market Cap", value: "₹ 10,97,740 Cr." },
      { label: "Current Price", value: "₹ 3,032" },
      { label: "High / Low", value: "₹ 4,592 / 2,992" },
      { label: "Stock P/E", value: "22.3" },
      { label: "Book Value", value: "₹ 262" },
      { label: "Dividend Yield", value: "1.98 %" },
      { label: "ROCE", value: "64.6 %" },
      { label: "ROE", value: "52.4 %" },
      { label: "Face Value", value: "₹ 1.00" }
    ],
    pros: [
      "Good return on equity (ROE) track record: 3 Years ROE 50.3%",
      "Healthy dividend payout of 83.8%"
    ],
    cons: [
      "Stock is trading at 11.6 times its book value",
      "Poor sales growth of 10.2% over past five years."
    ],
    alerts: ["3 Years ROE: 50.3% | Dividend Payout: 83.8%"],
    periods: ["1M", "6M", "1Yr", "3Yr", "5Yr", "10Yr", "Max"],
    priceHistory: [
      { date: "2023-01-01", price: 2800 },
      { date: "2023-02-01", price: 2900 },
      { date: "2023-03-01", price: 2950 },
      { date: "2023-04-01", price: 3100 },
      { date: "2023-05-01", price: 3050 },
      { date: "2023-06-01", price: 3150 },
      { date: "2023-07-01", price: 3000 },
      { date: "2023-08-01", price: 3032 }
    ],
    quarterly: {
      headers: [
        "Jun 2022", "Sep 2022", "Dec 2022", "Mar 2023", "Jun 2023",
        "Sep 2023", "Dec 2023", "Mar 2024", "Jun 2024", "Sep 2024",
        "Dec 2024", "Mar 2025", "Jun 2025"
      ],
      sales: [52758, 55309, 58229, 59162, 59381, 59692, 60583, 61237, 62613, 64259, 63973, 64479, 63437],
      expenses: [39342, 40793, 42676, 43388, 44383, 43946, 44195, 44073, 45951, 47528, 46939, 47499, 46562],
      netProfit: [9519, 10465, 10883, 11436, 11120, 11380, 11097, 12502, 12105, 11955, 12444, 12293, 12819],
      EPS: [25.90, 28.51, 29.64, 31.13, 30.26, 31.00, 30.56, 34.37, 33.28, 32.92, 34.22, 33.79, 35.27],
      OPMPercent: [25, 26, 27, 27, 25, 26, 27, 28, 27, 26, 27, 26, 27]
    },
    yearlyPL: {
      years: ["Mar 2014", "Mar 2015", "Mar 2016", "Mar 2017", "Mar 2018","Mar 2019","Mar 2020","Mar 2021","Mar 2022","Mar 2023","Mar 2024","Mar 2025"],
      sales: [81809, 94648, 108646, 117966, 123104, 146463, 156949,164177,191754,225458,240893,255324],
      expenses: [56657, 70167, 77969, 85655, 90588,106957,114840,117631,138697,166199,176597,187917],
      netProfit: [19332, 20060, 24338, 26357, 25880, 31562, 32447, 32562, 38449, 42303, 46099, 48797],
      OPMPercent: [31, 26, 28, 27, 26, 27, 27, 28, 28, 26, 27, 26]
    },
    shareholding: {
      categories: ["Promoters", "FIIs", "DIIs", "Government", "Public"],
      percentages: [72.30, 13.05, 8.53, 0.05, 6.06]
    }
  }
  // You can add more stock objects here
];

// Positive/negative color helper
const percentColor = val => (val >= 0 ? "#00ff80" : "#ff527c");

// Table Component for financial data
function Table({ title, headers, rows, isPercentage }) {
  return (
    <section style={{ marginBottom: 40 }}>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      <h2 style={{
        color: "#00ff80",
        fontWeight: "bold",
        fontSize: "1.8rem",
        marginBottom: 16,
        userSelect: "none",
        textShadow: "0 0 12px #00ff80cc"
      }}>{title}</h2>
      <div style={{ overflowX: "auto", borderRadius: 14, boxShadow: "0 0 24px #00ff8045" }}>
        <table style={{
          borderCollapse: "collapse",
          width: "100%",
          minWidth: 700,
          backgroundColor: "rgba(10,20,10,0.9)",
          color: "#ccffdd",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          borderRadius: 14
        }}>
          <thead>
            <tr style={{ backgroundColor: "#003300" }}>
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "14px 20px",
                    borderBottom: "3px solid #00ff80",
                    fontWeight: "700",
                    color: "#b3ffcc",
                    textAlign: "center",
                    userSelect: "none",
                    whiteSpace: "nowrap"
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #004400" }}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "12px 18px",
                      fontWeight: j === 0 ? "700" : "500",
                      textAlign: j === 0 ? "left" : "right",
                      color: isPercentage && j > 0
                        ? percentColor(parseFloat(String(cell).replace("%","")))
                        : "#ccffdd",
                      userSelect: "text",
                      whiteSpace: "nowrap"
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

// Candlestick chart data
const candlestickSeries = [
  {
    data: [
      { x: new Date(2023, 0, 1), y: [3100, 3200, 3050, 3150] },
      { x: new Date(2023, 1, 1), y: [3150, 3220, 3090, 3120] },
      { x: new Date(2023, 2, 1), y: [3120, 3170, 3080, 3160] },
      { x: new Date(2023, 3, 1), y: [3160, 3250, 3120, 3230] },
      { x: new Date(2023, 4, 1), y: [3230, 3290, 3180, 3260] },
      { x: new Date(2023, 5, 1), y: [3260, 3350, 3210, 3330] },
      { x: new Date(2023, 6, 1), y: [3330, 3400, 3290, 3370] },
      { x: new Date(2023, 7, 1), y: [3370, 3420, 3310, 3385] }
    ]
  }
];

// ApexCharts options for candlestick chart
const chartOptions = {
  chart: {
    type: 'candlestick',
    height: 350,
    background: "transparent",
    toolbar: { show: true },
    animations: { enabled: true }
  },
  title: {
    text: "TCS Candlestick Price Chart",
    style: { color: "#00ff80", fontWeight: "bold" }
  },
  xaxis: {
    type: 'datetime',
    labels: { style: { colors: "#b3ffcc", fontWeight: 700 } },
    axisBorder: { color: '#00ff80' },
    axisTicks: { color: '#00ff80' }
  },
  yaxis: {
    tooltip: { enabled: true },
    labels: { style: { colors: "#ccffdd", fontWeight: 700 } }
  },
  grid: { borderColor: "#002200" },
  tooltip: { enabled: true },
  plotOptions: {
    candlestick: {
      colors: {
        upward: "#00ff80",
        downward: "#ff5075"
      },
      wick: { useFillColor: true }
    }
  },
  theme: { mode: 'dark' }
};

export default function MarketPulse() {
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleInput = (e) => {
    const val = e.target.value.toUpperCase();
    setSearch(val);
    if (val.length < 1) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      STOCKS.filter(s => s.symbol.includes(val) || s.name.toUpperCase().includes(val)).slice(0, 5)
    );
  };

  const selectStock = (sym) => {
    const stock = STOCKS.find(s => s.symbol === sym);
    if (stock) {
      setSelectedStock(stock);
      setSearch(stock.symbol);
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundStock =
      STOCKS.find(s => s.symbol === search.trim() || s.name.toUpperCase() === search.trim()) ||
      null;
    setSelectedStock(foundStock);
    setSuggestions([]);
  };

  // Prepare rows for tables
  const quarterlyRows = selectedStock ? [
    ["Sales (₹ Cr)"].concat(selectedStock.quarterly.sales),
    ["Expenses (₹ Cr)"].concat(selectedStock.quarterly.expenses),
    ["Net Profit (₹ Cr)"].concat(selectedStock.quarterly.netProfit),
    ["EPS (₹)"].concat(selectedStock.quarterly.EPS),
    ["OPM %"].concat(selectedStock.quarterly.OPMPercent.map(v => v + "%")),
  ] : [];

  const yearlyRows = selectedStock ? [
    ["Sales (₹ Cr)"].concat(selectedStock.yearlyPL.sales),
    ["Expenses (₹ Cr)"].concat(selectedStock.yearlyPL.expenses),
    ["Net Profit (₹ Cr)"].concat(selectedStock.yearlyPL.netProfit),
    ["OPM %"].concat(selectedStock.yearlyPL.OPMPercent.map(v => v + "%"))
  ] : [];

  const shareholdingRows = selectedStock ? selectedStock.shareholding.categories.map((cat, i) => [
    cat,
    selectedStock.shareholding.percentages[i] + "%"
  ]) : [];

  return (
    <>


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
        <button type="submit" aria-label="Search" style={{ display:"none" }} />
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
                  if (e.key === "Enter" || e.key === " ") {
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
            {/* Overview Card */}
            <article
  className="card"
  style={{
    backgroundColor: "#1e2b24",
    borderRadius: 16,
    padding: 24,
    marginBottom: 48,
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  }}
>
  <h2 style={{ color: "#e6f2ed", marginBottom: 8 }}>{selectedStock.name}</h2>
  <p style={{ color: "#a2b9b1", fontStyle: "italic", marginBottom: 16 }}>{selectedStock.markets}</p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 16,
      marginBottom: 10
    }}
  >
    {selectedStock.overview.map(({ label, value }, i) => (
      <div
        key={i}
        style={{
          backgroundColor: "#2e3d35",
          borderRadius: 10,
          padding: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      >
        <div style={{ fontSize: 14, color: "#c7d8cf", marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 17, fontWeight: 600, color: "#f4fdf8" }}>{value}</div>
      </div>
    ))}
  </div>

  <span
    role="button"
    tabIndex={0}
    onClick={() => alert("Ratio editor coming soon!")}
    style={{
      color: "#6fd1a3",
      cursor: "pointer",
      textDecoration: "underline",
      fontWeight: 500
    }}
  >
    + Add ratio to table
  </span>

  <section
    style={{
      display: "flex",
      gap: 32,
      maxWidth: "100%",
      marginTop: 30,
      flexWrap: "wrap"
    }}
    aria-label="Pros and Cons"
  >
    <div
      style={{
        flex: "1",
        minWidth: 280,
        backgroundColor: "#25342d",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        color: "#cce6db"
      }}
    >
      <h3 style={{ marginBottom: 14, color: "#9debbf" }}>Pros</h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
        {selectedStock.pros.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
    </div>
    <div
      style={{
        flex: "1",
        minWidth: 280,
        backgroundColor: "#352b2b",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        color: "#f0b7b7"
      }}
    >
      <h3 style={{ marginBottom: 14, color: "#f48c8c" }}>Cons</h3>
      <ul style={{ paddingLeft: 20, lineHeight: 1.6 }}>
        {selectedStock.cons.map((c, idx) => (
          <li key={idx}>{c}</li>
        ))}
      </ul>
    </div>
  </section>

  <div
    style={{
      backgroundColor: "#2a3c34",
      color: "#9debbf",
      fontWeight: 600,
      fontSize: 16,
      padding: "12px 20px",
      borderRadius: 12,
      marginTop: 36,
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }}
  >
    ⚡ {selectedStock.alerts.join(" | ")}
  </div>

  <div
    style={{
      marginTop: 32,
      marginBottom: 24,
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }}
    aria-label="Selectable periods (not functional)"
  >
    {selectedStock.periods.map((period) => (
      <button
        key={period}
        disabled
        style={{
          padding: "8px 22px",
          borderRadius: 20,
          border: "1.5px solid #6fd1a3",
          color: "#6fd1a3",
          background: "transparent",
          fontWeight: 600,
          cursor: "default"
        }}
      >
        {period}
      </button>
    ))}
  </div>
</article>


            {/* Candlestick Chart */}
            <section aria-label="Price candlestick chart of TCS" style={{
              marginBottom: 44,
              borderRadius: 16,
              boxShadow: "0 0 36px #00ff8022",
              background: "rgba(0,16,0,0.6)",
              padding: 24
            }}>
              <Chart
                options={chartOptions}
                series={candlestickSeries}
                type="candlestick"
                height={370}
              />
            </section>

            {/* Quarterly Financials Table */}
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
              isPercentage={true}
            />

            {/* Yearly Profit & Loss Table */}
            <Table
              title="Yearly Profit & Loss Summary"
              headers={["Metric"].concat(selectedStock.yearlyPL.years)}
              rows={[
                ["Sales (₹ Cr)"].concat(selectedStock.yearlyPL.sales),
                ["Expenses (₹ Cr)"].concat(selectedStock.yearlyPL.expenses),
                ["Net Profit (₹ Cr)"].concat(selectedStock.yearlyPL.netProfit),
                ["OPM %"].concat(selectedStock.yearlyPL.OPMPercent.map(v => v + "%"))
              ]}
              isPercentage={true}
            />

            {/* Shareholding Pattern */}
            <section>
              <h3 style={{
                color: "#00ff80",
                marginBottom: 16,
                fontWeight: 700,
                fontSize: "1.2rem",
                userSelect: "none"
              }}>
                Shareholding Pattern (Latest)
              </h3>
              <div style={{
                overflowX: "auto",
                borderRadius: 18,
                boxShadow: "0 0 28px #00ff8044",
                backgroundColor: "rgba(0,36,0,0.6)",
                padding: 14,
                maxWidth: 440
              }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  color: "#bbffcd",
                  fontWeight: 600,
                  fontSize: 15,
                }}>
                  <thead>
                    <tr style={{
                      borderBottom: "2px solid #00ff80cc",
                      userSelect: "none"
                    }}>
                      <th style={{ textAlign: "left", padding: "10px 18px" }}>Category</th>
                      <th style={{ textAlign: "right", padding: "10px 18px" }}>% Holding</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedStock.shareholding.categories.map((cat, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #00ff8044" }}>
                        <td style={{ padding: "8px 18px" }}>{cat}</td>
                        <td style={{ padding: "8px 18px", textAlign: "right" }}>
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
          <p style={{
            marginTop: 150,
            textAlign: "center",
            color: "#338844aa",
            fontStyle: "italic",
            fontWeight: 600,
            userSelect: "none",
            fontSize: "1.2rem"
          }}>
            Search a stock (e.g., TCS) to view detailed financial analysis.
          </p>
        )}
      </main>
    </>
  );
}