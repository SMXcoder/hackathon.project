import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Signup from './signup';
import MarketPulse from './analysis'; // Analysis page
import Live from './live'; // Live Stocks page

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  return (
    <Router>
      <Routes>
        {/* Redirect "/" based on login status */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />

        {/* Public routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
        />
        <Route
          path="/analysis"
          element={isLoggedIn ? <MarketPulse /> : <Navigate to="/login" />}
        />
        <Route
          path="/live"
          element={isLoggedIn ? <Live /> : <Navigate to="/login" />}
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
