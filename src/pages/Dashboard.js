import React from 'react';
import { Link } from 'react-router-dom';
import { animalsData, financesData } from '../data/Data';

const Dashboard = () => {
  // Calculate statistics
  const totalAnimals = animalsData.length;
  const totalExpenses = financesData.reduce((sum, finance) => sum + finance.amount, 0);
  
  const healthyAnimals = animalsData.filter(animal => animal.healthStatus === 'Healthy').length;
  const sickAnimals = animalsData.filter(animal => animal.healthStatus === 'Sick').length;
  
  const animalTypesCount = animalsData.reduce((acc, animal) => {
    acc[animal.type] = (acc[animal.type] || 0) + 1;
    return acc;
  }, {});

  const expenseByCategory = financesData.reduce((acc, finance) => {
    acc[finance.category] = (acc[finance.category] || 0) + finance.amount;
    return acc;
  }, {});

  // Recent activities
  const recentAnimals = [...animalsData]
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    .slice(0, 5);

  const recentExpenses = [...financesData]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const getCategoryLabel = (category) => {
    const categories = {
      'FOOD': 'Food & Feed',
      'MEDICAL': 'Medical & Vaccines',
      'PURCHASE': 'Animal Purchase',
      'EQUIPMENT': 'Equipment',
      'MAINTENANCE': 'Maintenance',
      'OTHER': 'Other'
    };
    return categories[category] || category;
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Farm Dashboard</h1>
        <p>Welcome to your farm management dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🐄</div>
          <div className="stat-info">
            <h3>{totalAnimals}</h3>
            <p>Total Animals</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${totalExpenses.toFixed(2)}</h3>
            <p>Total Expenses</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💚</div>
          <div className="stat-info">
            <h3>{healthyAnimals}</h3>
            <p>Healthy Animals</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🤒</div>
          <div className="stat-info">
            <h3>{sickAnimals}</h3>
            <p>Sick Animals</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Animal Distribution */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Animal Distribution</h3>
            </div>
            <div className="card-body">
              {Object.entries(animalTypesCount).map(([type, count]) => (
                <div key={type} className="distribution-item">
                  <span className="type-name">{type}</span>
                  <div className="distribution-bar">
                    <div 
                      className="distribution-fill"
                      style={{
                        width: `${(count / totalAnimals) * 100}%`,
                        backgroundColor: getColorForType(type)
                      }}
                    ></div>
                  </div>
                  <span className="type-count">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Expenses</h3>
              <Link to="/finances" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentExpenses.map(expense => (
                <div key={expense.id} className="activity-item">
                  <div className="activity-info">
                    <strong>{expense.type}</strong>
                    <span>{expense.description}</span>
                    <small>{expense.date}</small>
                  </div>
                  <div className="activity-amount">
                    ${expense.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          {/* Expense Breakdown */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Expense Breakdown</h3>
            </div>
            <div className="card-body">
              {Object.entries(expenseByCategory).map(([category, amount]) => (
                <div key={category} className="expense-item">
                  <div className="expense-category">
                    <span className="category-dot" style={{backgroundColor: getColorForCategory(category)}}></span>
                    {getCategoryLabel(category)}
                  </div>
                  <div className="expense-amount">
                    ${amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Animals */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Recent Animals Added</h3>
              <Link to="/animals" className="btn btn-sm btn-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentAnimals.map(animal => (
                <div key={animal.id} className="activity-item">
                  <div className="activity-info">
                    <strong>{animal.name}</strong>
                    <span>{animal.type} - {animal.breed}</span>
                    <small>Added: {animal.dateAdded}</small>
                  </div>
                  <div className={`activity-status ${animal.healthStatus.toLowerCase()}`}>
                    {animal.healthStatus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="card-body quick-actions">
              <Link to="/animals/add" className="quick-action-btn">
                <span className="action-icon">➕</span>
                Add Animal
              </Link>
              <Link to="/finances/add" className="quick-action-btn">
                <span className="action-icon">💸</span>
                Add Expense
              </Link>
              <Link to="/animals" className="quick-action-btn">
                <span className="action-icon">📋</span>
                View Animals
              </Link>
              <Link to="/finances" className="quick-action-btn">
                <span className="action-icon">📊</span>
                View Finances
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for colors
const getColorForType = (type) => {
  const colors = {
    'Cow': '#3498db',
    'Pig': '#e74c3c',
    'Sheep': '#9b59b6',
    'Goat': '#f39c12',
    'Chicken': '#2ecc71',
    'Horse': '#1abc9c'
  };
  return colors[type] || '#95a5a6';
};

const getColorForCategory = (category) => {
  const colors = {
    'FOOD': '#27ae60',
    'MEDICAL': '#e74c3c',
    'PURCHASE': '#3498db',
    'EQUIPMENT': '#f39c12',
    'MAINTENANCE': '#9b59b6',
    'OTHER': '#95a5a6'
  };
  return colors[category] || '#95a5a6';
};

export default Dashboard;