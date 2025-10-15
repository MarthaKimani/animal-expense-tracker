import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { animalsData, animalTypes, healthStatuses } from '../data/Data';

const EditAnimal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const animal = animalsData.find(a => a.id === parseInt(id));
    if (animal) {
      setFormData({
        ...animal,
        age: animal.age.toString(),
        weight: animal.weight.toString()
      });
    } else {
      alert('Animal not found!');
      navigate('/animals');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would make an API call here
    const updatedAnimal = {
      ...formData,
      age: parseInt(formData.age),
      weight: parseFloat(formData.weight)
    };
    
    console.log('Animal updated:', updatedAnimal);
    alert('Animal updated successfully!');
    navigate('/animals');
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Edit Animal</h1>
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
            Update Animal
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

export default EditAnimal;
