import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { financeCategories } from '../data/Data';

const AddFinance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'OTHER'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    const newFinance = {
      id: Date.now(), // Temporary ID
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    console.log('New finance record added:', newFinance);
    alert('Expense added successfully!');
    navigate('/finances');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add New Expense</h1>
        <button 
          onClick={() => navigate('/finances')}
          className="btn btn-warning"
        >
          Back to Finances
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Expense Type *</label>
            <input
              type="text"
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g., Food, Vaccine, Equipment"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              className="form-control"
              value={formData.category}
              onChange={handleChange}
              required
            >
              {financeCategories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the expense"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount ($) *</label>
            <input
              type="number"
              name="amount"
              className="form-control"
              value={formData.amount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Add Expense
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/finances')}
            className="btn btn-warning"
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFinance;
