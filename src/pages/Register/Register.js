import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error state for feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      // Handle registration success, e.g., redirecting to login page or showing a success message.
    } else {
      // Handle errors
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Header isAuthenticated={false} />
      <div className="register-container">
        <h2>Register</h2>
        {error && <p className="error-text">{error}</p>} {/* Display error if it exists */}
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
