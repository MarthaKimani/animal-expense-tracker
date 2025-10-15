import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animalTypes, healthStatuses } from '../data/Data';

const AddAnimal = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    breed: '',
    age: '',
    weight: '',
    healthStatus: 'Healthy',
    dateAdded: new Date().toISOString().split('T')[0],
    lastVaccination: ''
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
    const newAnimal = {
      id: Date.now(), // Temporary ID
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight)
    };
    
    console.log('New animal added:', newAnimal);
    alert('Animal added successfully!');
    navigate('/animals');
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Add New Animal</h1>
        <button 
          onClick={() => navigate('/animals')}
          className="btn btn-warning"
        >
          Back to Animals
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Animal Name *</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Animal Type *</label>
            <select
              name="type"
              className="form-control"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              {animalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Breed *</label>
            <input
              type="text"
              name="breed"
              className="form-control"
              value={formData.breed}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age (years) *</label>
            <input
              type="number"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Weight (kg) *</label>
            <input
              type="number"
              name="weight"
              className="form-control"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </div>

          <div className="form-group">
            <label>Health Status *</label>
            <select
              name="healthStatus"
              className="form-control"
              value={formData.healthStatus}
              onChange={handleChange}
              required
            >
              {healthStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date Added *</label>
            <input
              type="date"
              name="dateAdded"
              className="form-control"
              value={formData.dateAdded}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Last Vaccination Date</label>
            <input
              type="date"
              name="lastVaccination"
              className="form-control"
              value={formData.lastVaccination}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Add Animal
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/animals')}
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

export default AddAnimal;
