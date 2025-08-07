import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  // Watch for login status change and update state
  useEffect(() => {
    const interval = setInterval(() => {
      const storedStatus = localStorage.getItem('loggedIn') === 'true';
      setIsLoggedIn(storedStatus);
    }, 500); // check every 500ms

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAnalysisClick = () => {
    navigate('/analysis');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">StockTracker</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Live Stocks</a>
          <a onClick={handleAnalysisClick} style={{ cursor: 'pointer' }}>Analytics</a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <div className="profile-circle">S</div>
              <button className="auth-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="auth-button" onClick={handleLogin}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NNav;
