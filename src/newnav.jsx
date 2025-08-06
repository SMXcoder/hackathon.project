import React from 'react';
import { useNavigate } from 'react-router-dom';

function NNav() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">StockTracker</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Live Stocks</a>
          <a href="#">Analytics</a>
        </div>

        {/* Right-side auth section */}
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
