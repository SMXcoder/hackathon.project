import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NNav() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    const interval = setInterval(() => {
      const storedStatus = localStorage.getItem('loggedIn') === 'true';
      const storedUsername = localStorage.getItem('username') || '';
      setIsLoggedIn(storedStatus);
      setUsername(storedUsername);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleAnalysisClick = () => {
    navigate('/analysis');
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLiveStocksClick = () => {
    navigate('/live');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div
          className="logo"
          style={{ cursor: 'pointer' }}
          onClick={handleHomeClick}
        >
          Market Pulse
        </div>

        <div className="nav-links">
          <span onClick={handleHomeClick} style={{ cursor: 'pointer', marginRight: '1rem' }}>
            Home
          </span>
          <span onClick={handleLiveStocksClick} style={{ cursor: 'pointer', marginRight: '1rem' }}>
            Live Stocks
          </span>
          <span onClick={handleAnalysisClick} style={{ cursor: 'pointer' }}>
            Analytics
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn ? (
            <>
              <div className="profile-circle">
                {username ? username.charAt(0).toUpperCase() : '?'}
              </div>
              <span>{username}</span>
              <button className="auth-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="auth-button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NNav;
