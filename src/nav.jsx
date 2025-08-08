import React, { useState } from 'react';
function Nav() {
  const [showDashboard, setShowDashboard] = useState(false);

  const toggleDashboard = () => {
    setShowDashboard(!showDashboard);
  };

  return (
 
  <header>
    <nav className="navbar">
      <div className="logo">Market Pulse</div>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">Live Stocks</a>
        <a href="#">Analytics</a>
      </div>
      <div className="profile-icon" onClick={toggleDashboard}>S</div>
    </nav>

    {/* New search bar just below navbar */}
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search Stock Symbol (e.g., AAPL)"
        className="search-bar-input"
      />
    </div>

    {showDashboard && (
      <>
        <div className="dashboard-overlay" onClick={toggleDashboard}></div>
        <div className="dashboard-panel">
          <h2>Dashboard</h2>
          <ul>
            <li>📊 Profile Overview</li>
            <li>🧾 Watchlist</li>
            <li>⚙️ Settings</li>
            <li>🚪 Logout</li>
          </ul>
        </div>
      </>
    )}
  </header>


  );
}

export default Nav;