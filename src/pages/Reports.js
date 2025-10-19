import React, { useState, useEffect } from 'react';
import { animalsData, financesData } from '../data/Data';
import html2canvas from "html2canvas";

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDate, setSelectedDate] = useState('2024-07');
  const [reportType, setReportType] = useState('financial');
  const [reportData, setReportData] = useState(null);

  // Generate comprehensive report data
  useEffect(() => {
    const generateReport = () => {
      // Filter data based on selected period
      let filteredFinances = [];
      let filteredAnimals = [];

      switch (selectedPeriod) {
        case 'week':
          // Last 7 days logic (simplified)
          filteredFinances = financesData.filter(f => 
            new Date(f.date) >= new Date('2024-07-15') && new Date(f.date) <= new Date('2024-07-21')
          );
          filteredAnimals = animalsData.filter(a => 
            new Date(a.dateAdded) >= new Date('2024-07-15') && new Date(a.dateAdded) <= new Date('2024-07-21')
          );
          break;
        case 'month':
          filteredFinances = financesData.filter(f => f.date.startsWith(selectedDate));
          filteredAnimals = animalsData.filter(a => a.dateAdded.startsWith(selectedDate));
          break;
        case 'quarter':
          // Q3 2024 (July-Sept)
          filteredFinances = financesData.filter(f => {
            const month = new Date(f.date).getMonth() + 1;
            return month >= 7 && month <= 9;
          });
          filteredAnimals = animalsData.filter(a => {
            const month = new Date(a.dateAdded).getMonth() + 1;
            return month >= 7 && month <= 9;
          });
          break;
        case 'year':
          filteredFinances = financesData.filter(f => f.date.startsWith('2024'));
          filteredAnimals = animalsData.filter(a => a.dateAdded.startsWith('2024'));
          break;
        default:
          filteredFinances = financesData;
          filteredAnimals = animalsData;
      }

      // Financial calculations
      const totalExpenses = filteredFinances.reduce((sum, finance) => sum + finance.amount, 0);
      const expensesByCategory = filteredFinances.reduce((acc, finance) => {
        acc[finance.category] = (acc[finance.category] || 0) + finance.amount;
        return acc;
      }, {});

      // Animal calculations
      const newAnimals = filteredAnimals.length;
      const animalTypes = filteredAnimals.reduce((acc, animal) => {
        acc[animal.type] = (acc[animal.type] || 0) + 1;
        return acc;
      }, {});
      
      const healthStats = {
        healthy: filteredAnimals.filter(a => a.healthStatus === 'Healthy').length,
        sick: filteredAnimals.filter(a => a.healthStatus === 'Sick').length,
        injured: filteredAnimals.filter(a => a.healthStatus === 'Injured').length,
        total: filteredAnimals.length
      };

      // Productivity metrics (mock data)
      const milkProduction = 1250.5; // liters
      const averageWeightGain = 1.2; // kg/day
      const feedConsumption = 2450; // kg

      // Sales data (mock)
      const salesData = [
        { product: 'Milk', quantity: 500, revenue: 1250, cost: 600, profit: 650 },
        { product: 'Beef', quantity: 200, revenue: 1600, cost: 800, profit: 800 },
        { product: 'Wool', quantity: 50, revenue: 250, cost: 50, profit: 200 }
      ];

      const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0);
      const totalCost = salesData.reduce((sum, sale) => sum + sale.cost, 0);
      const netProfit = totalRevenue - totalExpenses;

      return {
        period: selectedPeriod,
        dateRange: selectedDate,
        financial: {
          totalExpenses,
          expensesByCategory,
          transactionCount: filteredFinances.length,
          averageExpense: totalExpenses / filteredFinances.length || 0,
          largestExpense: Math.max(...filteredFinances.map(f => f.amount), 0),
          totalRevenue,
          totalCost,
          netProfit,
          profitMargin: ((netProfit / totalRevenue) * 100) || 0
        },
        animal: {
          totalAnimals: animalsData.length,
          newAnimals,
          healthStats,
          animalTypes,
          mortalityRate: ((filteredAnimals.filter(a => a.healthStatus === 'Deceased').length / filteredAnimals.length) * 100) || 0
        },
        productivity: {
          milkProduction,
          averageWeightGain,
          feedConsumption,
          feedEfficiency: (averageWeightGain / (feedConsumption / filteredAnimals.length)) || 0
        },
        sales: {
          salesData,
          totalRevenue,
          totalCost,
          netProfit: totalRevenue - totalCost,
          bestPerforming: salesData.reduce((best, current) => 
            current.profit > best.profit ? current : best
          , salesData[0])
        },
        trends: {
          expenseTrend: 'increasing', // Mock trend
          healthTrend: 'improving',
          productivityTrend: 'stable'
        }
      };
    };

    setReportData(generateReport());
  }, [selectedPeriod, selectedDate, reportType]);

  // Export functions
const exportToPDF = async () => {
  const reportContent = document.getElementById('report-content');
  await html2canvas(reportContent);
};


  const exportToExcel = () => {
    alert('Excel export would create a spreadsheet with all report data');
    // In production: Use libraries like exceljs or sheetjs
  };

  const printReport = () => {
    window.print();
  };

  if (!reportData) {
    return <div className="page">Loading report data...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>📊 Comprehensive Reports</h1>
        <div className="report-actions">
          <button className="btn btn-primary" onClick={exportToPDF}>
            📄 Export PDF
          </button>
          <button className="btn btn-success" onClick={exportToExcel}>
            📊 Export Excel
          </button>
          <button className="btn btn-info" onClick={printReport}>
            🖨️ Print Report
          </button>
        </div>
      </div>

      {/* Report Controls */}
      <div className="form-card">
        <div className="form-row">
          <div className="form-group">
            <label>Report Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="week">Last Week</option>
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          {selectedPeriod === 'month' && (
            <div className="form-group">
              <label>Select Month</label>
              <input
                type="month"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label>Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="financial">Financial Report</option>
              <option value="animal">Animal Report</option>
              <option value="productivity">Productivity Report</option>
              <option value="sales">Sales Report</option>
              <option value="comprehensive">Comprehensive Report</option>
            </select>
          </div>
        </div>
      </div>

      <div id="report-content">
        {/* Report Header */}
        <div className="report-header">
          <h2>Farm Management Report</h2>
          <div className="report-meta">
            <p><strong>Period:</strong> {selectedPeriod.toUpperCase()} - {selectedDate}</p>
            <p><strong>Generated:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Report Type:</strong> {reportType.toUpperCase()}</p>
          </div>
        </div>

        {/* Executive Summary */}
        {(reportType === 'comprehensive' || reportType === 'financial') && (
          <div className="dashboard-card">
            <h3>💰 Executive Summary</h3>
            <div className="stats-grid">
              <div className="stat-card summary-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>${reportData.financial.netProfit.toFixed(2)}</h3>
                  <p>Net Profit</p>
                  <small className={reportData.financial.netProfit >= 0 ? 'positive' : 'negative'}>
                    {reportData.financial.netProfit >= 0 ? '📈 Profit' : '📉 Loss'}
                  </small>
                </div>
              </div>
              <div className="stat-card summary-card">
                <div className="stat-icon">🐄</div>
                <div className="stat-info">
                  <h3>{reportData.animal.totalAnimals}</h3>
                  <p>Total Animals</p>
                  <small>+{reportData.animal.newAnimals} new</small>
                </div>
              </div>
              <div className="stat-card summary-card">
                <div className="stat-icon">🥛</div>
                <div className="stat-info">
                  <h3>{reportData.productivity.milkProduction}L</h3>
                  <p>Milk Production</p>
                  <small>{reportData.trends.productivityTrend}</small>
                </div>
              </div>
              <div className="stat-card summary-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <h3>{reportData.financial.profitMargin.toFixed(1)}%</h3>
                  <p>Profit Margin</p>
                  <small>Industry avg: 15%</small>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Report Section */}
        {(reportType === 'financial' || reportType === 'comprehensive') && (
          <div className="dashboard-card">
            <h3>💵 Financial Performance</h3>
            <div className="report-section">
              <div className="financial-overview">
                <div className="financial-metrics">
                  <div className="metric">
                    <span className="metric-label">Total Revenue</span>
                    <span className="metric-value positive">${reportData.financial.totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Total Expenses</span>
                    <span className="metric-value negative">${reportData.financial.totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Net Profit/Loss</span>
                    <span className={`metric-value ${reportData.financial.netProfit >= 0 ? 'positive' : 'negative'}`}>
                      ${reportData.financial.netProfit.toFixed(2)}
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Profit Margin</span>
                    <span className="metric-value">{reportData.financial.profitMargin.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="expense-breakdown">
                  <h4>Expenses by Category</h4>
                  {Object.entries(reportData.financial.expensesByCategory).map(([category, amount]) => (
                    <div key={category} className="expense-item-detailed">
                      <div className="expense-category-info">
                        <span className="category-name">{getCategoryLabel(category)}</span>
                        <span className="category-percentage">
                          {((amount / reportData.financial.totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="expense-bar-container">
                        <div 
                          className="expense-bar"
                          style={{
                            width: `${(amount / reportData.financial.totalExpenses) * 100}%`,
                            backgroundColor: getCategoryColor(category)
                          }}
                        ></div>
                      </div>
                      <span className="expense-amount">${amount.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Animal Report Section */}
        {(reportType === 'animal' || reportType === 'comprehensive') && (
          <div className="dashboard-card">
            <h3>🐄 Animal Management</h3>
            <div className="report-section">
              <div className="animal-stats-grid">
                <div className="animal-stat">
                  <h4>Health Status</h4>
                  <div className="health-metrics">
                    <div className="health-metric">
                      <span className="health-label">Healthy</span>
                      <div className="health-bar">
                        <div 
                          className="health-fill healthy"
                          style={{width: `${(reportData.animal.healthStats.healthy / reportData.animal.healthStats.total) * 100}%`}}
                        ></div>
                      </div>
                      <span className="health-count">{reportData.animal.healthStats.healthy}</span>
                    </div>
                    <div className="health-metric">
                      <span className="health-label">Sick</span>
                      <div className="health-bar">
                        <div 
                          className="health-fill sick"
                          style={{width: `${(reportData.animal.healthStats.sick / reportData.animal.healthStats.total) * 100}%`}}
                        ></div>
                      </div>
                      <span className="health-count">{reportData.animal.healthStats.sick}</span>
                    </div>
                  </div>
                </div>

                <div className="animal-stat">
                  <h4>Animal Distribution</h4>
                  <div className="distribution-chart">
                    {Object.entries(reportData.animal.animalTypes).map(([type, count]) => (
                      <div key={type} className="distribution-item-detailed">
                        <span className="animal-type">{type}</span>
                        <div className="distribution-bar-detailed">
                          <div 
                            className="distribution-fill-detailed"
                            style={{
                              width: `${(count / reportData.animal.totalAnimals) * 100}%`,
                              backgroundColor: getAnimalTypeColor(type)
                            }}
                          ></div>
                        </div>
                        <span className="animal-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="animal-insights">
                <h4>Key Insights</h4>
                <div className="insights-list">
                  <div className="insight positive">
                    <span className="insight-icon">✅</span>
                    <span>Animal health is {reportData.animal.healthStats.healthy >= (reportData.animal.healthStats.total * 0.8) ? 'excellent' : 'good'}</span>
                  </div>
                  <div className="insight info">
                    <span className="insight-icon">📈</span>
                    <span>{reportData.animal.newAnimals} new animals added this period</span>
                  </div>
                  <div className="insight warning">
                    <span className="insight-icon">⚠️</span>
                    <span>Mortality rate: {reportData.animal.mortalityRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productivity Report Section */}
        {(reportType === 'productivity' || reportType === 'comprehensive') && (
          <div className="dashboard-card">
            <h3>🏭 Productivity Metrics</h3>
            <div className="report-section">
              <div className="productivity-metrics">
                <div className="productivity-metric">
                  <div className="metric-header">
                    <span className="metric-icon">🥛</span>
                    <span className="metric-title">Milk Production</span>
                  </div>
                  <div className="metric-value-large">{reportData.productivity.milkProduction}L</div>
                  <div className="metric-trend positive">+5% vs last period</div>
                </div>

                <div className="productivity-metric">
                  <div className="metric-header">
                    <span className="metric-icon">⚖️</span>
                    <span className="metric-title">Avg Weight Gain</span>
                  </div>
                  <div className="metric-value-large">{reportData.productivity.averageWeightGain} kg/day</div>
                  <div className="metric-trend stable">Stable</div>
                </div>

                <div className="productivity-metric">
                  <div className="metric-header">
                    <span className="metric-icon">🌾</span>
                    <span className="metric-title">Feed Efficiency</span>
                  </div>
                  <div className="metric-value-large">{reportData.productivity.feedEfficiency.toFixed(3)}</div>
                  <div className="metric-trend positive">Improving</div>
                </div>
              </div>

              <div className="efficiency-analysis">
                <h4>Efficiency Analysis</h4>
                <table className="efficiency-table">
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Current</th>
                      <th>Target</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Feed Conversion Ratio</td>
                      <td>{reportData.productivity.feedEfficiency.toFixed(3)}</td>
                      <td>0.005</td>
                      <td>
                        <span className={`status-badge ${reportData.productivity.feedEfficiency >= 0.005 ? 'positive' : 'warning'}`}>
                          {reportData.productivity.feedEfficiency >= 0.005 ? 'On Target' : 'Needs Improvement'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>Milk Yield per Animal</td>
                      <td>{(reportData.productivity.milkProduction / reportData.animal.totalAnimals).toFixed(1)}L</td>
                      <td>8.0L</td>
                      <td>
                        <span className="status-badge positive">Excellent</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Sales Report Section */}
        {(reportType === 'sales' || reportType === 'comprehensive') && (
          <div className="dashboard-card">
            <h3>🛒 Sales Performance</h3>
            <div className="report-section">
              <div className="sales-overview">
                <div className="sales-metrics">
                  <div className="sales-metric">
                    <span className="sales-label">Total Revenue</span>
                    <span className="sales-value">${reportData.sales.totalRevenue.toFixed(2)}</span>
                  </div>
                  <div className="sales-metric">
                    <span className="sales-label">Total Cost</span>
                    <span className="sales-value">${reportData.sales.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="sales-metric">
                    <span className="sales-label">Gross Profit</span>
                    <span className="sales-value positive">${reportData.sales.netProfit.toFixed(2)}</span>
                  </div>
                </div>

                <div className="top-performer">
                  <h4>🏆 Top Performing Product</h4>
                  <div className="top-product">
                    <span className="product-name">{reportData.sales.bestPerforming.product}</span>
                    <span className="product-profit">${reportData.sales.bestPerforming.profit} profit</span>
                  </div>
                </div>
              </div>

              <table className="sales-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Revenue</th>
                    <th>Cost</th>
                    <th>Profit</th>
                    <th>Margin</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.sales.salesData.map((sale, index) => (
                    <tr key={index}>
                      <td>{sale.product}</td>
                      <td>{sale.quantity}</td>
                      <td>${sale.revenue.toFixed(2)}</td>
                      <td>${sale.cost.toFixed(2)}</td>
                      <td className={sale.profit >= 0 ? 'positive' : 'negative'}>
                        ${sale.profit.toFixed(2)}
                      </td>
                      <td>{((sale.profit / sale.revenue) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        <div className="dashboard-card recommendations">
          <h3>💡 Recommendations & Action Items</h3>
          <div className="recommendations-list">
            {reportData.financial.netProfit < 0 && (
              <div className="recommendation urgent">
                <span className="rec-icon">🚨</span>
                <div className="rec-content">
                  <strong>Address Financial Loss</strong>
                  <p>Current operations are running at a loss. Review expenses and consider increasing prices or reducing costs.</p>
                </div>
              </div>
            )}

            {reportData.animal.healthStats.sick > (reportData.animal.healthStats.total * 0.1) && (
              <div className="recommendation important">
                <span className="rec-icon">🏥</span>
                <div className="rec-content">
                  <strong>Improve Animal Health</strong>
                  <p>{reportData.animal.healthStats.sick} animals are sick. Review veterinary protocols and living conditions.</p>
                </div>
              </div>
            )}

            {reportData.productivity.feedEfficiency < 0.005 && (
              <div className="recommendation suggestion">
                <span className="rec-icon">🌾</span>
                <div className="rec-content">
                  <strong>Optimize Feed Efficiency</strong>
                  <p>Current feed conversion ratio can be improved. Consider feed quality and feeding schedules.</p>
                </div>
              </div>
            )}

            <div className="recommendation positive">
              <span className="rec-icon">✅</span>
              <div className="rec-content">
                <strong>Continue Best Practices</strong>
                <p>Milk production and animal health metrics are performing well. Maintain current operations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Footer */}
      <div className="report-footer">
        <p><strong>Confidential Report</strong> - Generated by Farm Management System</p>
        <p>For internal use only. Contact farm management for questions.</p>
      </div>
    </div>
  );
};

// Helper functions
const getCategoryLabel = (category) => {
  const categories = {
    'FOOD': 'Food & Feed',
    'MEDICAL': 'Medical & Vaccines',
    'PURCHASE': 'Animal Purchase',
    'EQUIPMENT': 'Equipment',
    'MAINTENANCE': 'Maintenance',
    'OTHER': 'Other Expenses'
  };
  return categories[category] || category;
};

const getCategoryColor = (category) => {
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

const getAnimalTypeColor = (type) => {
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

export default Reports;