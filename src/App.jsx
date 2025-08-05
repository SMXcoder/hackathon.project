import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Signup from './signup';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        {/* Optional fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
