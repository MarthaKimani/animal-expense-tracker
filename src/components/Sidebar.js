import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ logout }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/animals', label: 'Animals', icon: '🐄' },
    { path: '/finances', label: 'Finances', icon: '💰' },
  { path: '/breeding', label: 'Breeding', icon: '❤️' },
  { path: '/health', label: 'Health Tracking', icon: '🏥' },
  { path: '/feeding', label: 'Feeding & Growth', icon: '🍽️' },
  { path: '/milk-production', label: 'Milk Production', icon: '🥛' },
  { path: '/tasks', label: 'Tasks & Reminders', icon: '📋' },
  { path: '/inventory', label: 'Inventory', icon: '📦' },
  { path: '/analytics', label: 'Analytics', icon: '📈' },
  { path: '/reports', label: 'Reports', icon: '📊' },
  { path: '/farm-map', label: 'Farm Map', icon: '🗺️' }
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <div className="sidebar">
      <h2>🐾 Farm Management</h2>
      <ul>
        {menuItems.map(item => (
          <li 
            key={item.path} 
            className={location.pathname.startsWith(item.path) ? 'active' : ''}
          >
            <Link to={item.path}>
              <span style={{ marginRight: '10px' }}>{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <button 
            onClick={handleLogout}
            className="logout-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              width: '100%',
              textAlign: 'left',
              padding: '15px 25px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            <span style={{ marginRight: '10px' }}>🚪</span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
