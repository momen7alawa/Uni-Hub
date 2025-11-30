// src/Registeration-Components/Login.jsx
import React, { useState } from 'react';
import '../css/Login.css';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectTo = location.state?.from?.pathname || location.state?.redirectTo || '/product';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }

    setLoading(true);

    try {
      // 1. First, search ONLY by email to see if the user exists
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/accounts?email=${encodeURIComponent(email)}`
      );
      const users = await res.json();

      // 2. Check if user exists
      if (users.length === 0) {
        setError('No account found with this email. Please register first.');
        setLoading(false);
        return;
      }

      const user = users[0];

      // 3. Check if password matches
      // Note: In a real app, passwords would be hashed. Here we compare strings.
      if (user.password !== password) {
        setError('Incorrect password. Please try again.');
        setLoading(false);
        return;
      }

      // 4. If we get here, Login is successful
      login({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role || 'student'
      });

      navigate(redirectTo, {
        replace: true,
        state: location.state?.from?.state,
      });

    } catch (err) {
      console.error("Login Error:", err);
      setError('Server connection failed. Is json-server running?');
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          {/* Error Message Display */}
          {error && (
            <div 
              style={{ 
                backgroundColor: 'rgba(255, 0, 0, 0.1)', 
                color: '#ff4d4d', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '15px',
                textAlign: 'center',
                fontSize: '0.9rem',
                border: '1px solid #ff4d4d'
              }}
            >
              {error}
            </div>
          )}

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-icon">
              <FaUser />
            </span>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon">
              <FaLock />
            </span>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>

          <div className="register-link">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;