import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/animals', label: 'Animals', icon: '🐄' },
    { path: '/finances', label: 'Finances', icon: '💰' }
  ];

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
      </ul>
    </div>
  );
};

export default Sidebar;
