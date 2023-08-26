import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '../../components/Header/Header';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error state

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();      
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', data.username);
      navigate('/'); // Redirect to home page after successful login
    } else {
      // Handle errors  
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <Header isAuthenticated={false} />
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>} {/* Display error if it exists */}
        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
