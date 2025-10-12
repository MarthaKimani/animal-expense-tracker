import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { financesData } from '../data/DummyData';

const FinanceList = () => {
  const [finances, setFinances] = useState(financesData);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const deleteFinance = (id) => {
    if (window.confirm('Are you sure you want to delete this finance record?')) {
      setFinances(finances.filter(finance => finance.id !== id));
    }
  };

  const filteredFinances = finances.filter(finance => {
    const matchesSearch = finance.description.toLowerCase().includes(filter.toLowerCase()) ||
                         finance.type.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = !categoryFilter || finance.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredFinances.reduce((sum, finance) => sum + finance.amount, 0);

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
        <h1>Financial Management</h1>
        <Link to="/finances/add" className="btn btn-primary">
          Add New Expense
        </Link>
      </div>

      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search expenses..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="form-group">
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="FOOD">Food & Feed</option>
            <option value="MEDICAL">Medical & Vaccines</option>
            <option value="PURCHASE">Animal Purchase</option>
            <option value="EQUIPMENT">Equipment</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
      </div>

      <div style={{ 
        background: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '5px', 
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#27ae60', margin: 0 }}>
          Total Expenses: ${totalAmount.toFixed(2)}
        </h3>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFinances.map(finance => (
            <tr key={finance.id}>
              <td>{finance.date}</td>
              <td>{finance.type}</td>
              <td>{finance.description}</td>
              <td>
                <span className={`category ${finance.category.toLowerCase()}`}>
                  {getCategoryLabel(finance.category)}
                </span>
              </td>
              <td>${finance.amount.toFixed(2)}</td>
              <td>
                <button 
                  onClick={() => deleteFinance(finance.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredFinances.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No expenses found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default FinanceList;
