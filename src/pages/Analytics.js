import React, { useState } from 'react';
import { financesData, animalsData } from '../data/Data';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock sales data
  const salesData = [
    { id: 1, date: '2024-07-15', product: 'Milk', quantity: 50, price: 2.5, total: 125 },
    { id: 2, date: '2024-07-18', product: 'Beef', quantity: 200, price: 8, total: 1600 }
  ];

  const calculateProfitLoss = () => {
    const totalExpenses = financesData.reduce((sum, finance) => sum + finance.amount, 0);
    const totalSales = salesData.reduce((sum, sale) => sum + sale.total, 0);
    return {
      totalExpenses,
      totalSales,
      netProfit: totalSales - totalExpenses,
      profitMargin: ((totalSales - totalExpenses) / totalSales * 100) || 0
    };
  };

  const profitData = calculateProfitLoss();

  return (
    <div className="page">
      <div className="page-header">
        <h1>Business Analytics</h1>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-selector"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${profitData.totalSales.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💸</div>
          <div className="stat-info">
            <h3>${profitData.totalExpenses.toFixed(2)}</h3>
            <p>Total Expenses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>${profitData.netProfit.toFixed(2)}</h3>
            <p>Net Profit</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{profitData.profitMargin.toFixed(1)}%</h3>
            <p>Profit Margin</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-column">
          {/* Expense Breakdown */}
          <div className="dashboard-card">
            <h3>Expense Analysis</h3>
            <div className="card-body">
              <div className="chart-container">
                {/* Pie chart would go here */}
                <div className="chart-placeholder">
                  <p>🥧 Expense Distribution Pie Chart</p>
                  <ul>
                    {Object.entries(
                      financesData.reduce((acc, finance) => {
                        acc[finance.category] = (acc[finance.category] || 0) + finance.amount;
                        return acc;
                      }, {})
                    ).map(([category, amount]) => (
                      <li key={category}>
                        {category}: ${amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Performance */}
          <div className="dashboard-card">
            <h3>Sales Performance</h3>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map(sale => (
                    <tr key={sale.id}>
                      <td>{sale.product}</td>
                      <td>{sale.quantity}</td>
                      <td>${sale.price}</td>
                      <td>${sale.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          {/* Profit Trends */}
          <div className="dashboard-card">
            <h3>Profit & Loss Trends</h3>
            <div className="card-body">
              <div className="chart-placeholder">
                <p>📈 Monthly P&L Trend Chart</p>
                <div className="profit-metrics">
                  <div className="metric">
                    <span>Best Month:</span>
                    <strong>July 2024</strong>
                  </div>
                  <div className="metric">
                    <span>ROI:</span>
                    <strong>{(profitData.netProfit / profitData.totalExpenses * 100).toFixed(1)}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animal Productivity */}
          <div className="dashboard-card">
            <h3>Animal Productivity</h3>
            <div className="card-body">
              <div className="productivity-list">
                {animalsData.map(animal => (
                  <div key={animal.id} className="productivity-item">
                    <span>{animal.name}</span>
                    <div className="productivity-bar">
                      <div 
                        className="productivity-fill"
                        style={{width: `${(animal.weight / 800) * 100}%`}}
                      ></div>
                    </div>
                    <span>{animal.weight}kg</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Insights */}
      <div className="dashboard-card">
        <h3>💡 Business Insights</h3>
        <div className="card-body">
          <div className="insights-grid">
            <div className="insight-item">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <h4>Top Performing Area</h4>
                <p>Beef sales show highest profit margin at 35%</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">⚠️</div>
              <div className="insight-content">
                <h4>Attention Needed</h4>
                <p>Medical expenses increased by 15% this month</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Optimization Tip</h4>
                <p>Consider bulk feed purchase to reduce costs by 10%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;