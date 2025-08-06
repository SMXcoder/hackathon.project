import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const matched = users.find(
      (user) => user.username === username && user.password === password
    );

    if (matched) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/home');
      localStorage.setItem('username', username);
      
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <div className="login-body">
      <div className="container">
        <h2>User Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;