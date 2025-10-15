import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call - in real app, this would be your backend
      setTimeout(() => {
        // Mock authentication - in real app, verify credentials with backend
        if (formData.email === 'demo@farm.com' && formData.password === 'password') {
          const mockToken = 'mock-jwt-token-' + Date.now();
          login(mockToken);
          navigate('/dashboard');
          // In the handleSubmit function, change this line:
        } else {
          setError('Invalid email or password');
        }
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🐾 Farm Management</h1>
          <h2>Welcome Back</h2>
          <p>Please sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Create one here
            </Link>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="demo-credentials">
          <h4>Demo Credentials:</h4>
          <p>Email: demo@farm.com</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;