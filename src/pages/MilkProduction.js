import React, { useState } from 'react';
import { animalsData } from '../data/Data';

const MilkProduction = () => {
  const [milkRecords, setMilkRecords] = useState([
    {
      id: 1,
      animalId: 1,
      date: '2024-07-20',
      morning: 15.5,
      evening: 12.3,
      total: 27.8,
      quality: 'Good'
    },
    {
      id: 2,
      animalId: 2,
      date: '2024-07-20',
      morning: 12.8,
      evening: 10.5,
      total: 23.3,
      quality: 'Good'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    date: new Date().toISOString().split('T')[0],
    morning: '',
    evening: '',
    quality: 'Good'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseFloat(formData.morning) + parseFloat(formData.evening);
    const newRecord = {
      id: Date.now(),
      ...formData,
      morning: parseFloat(formData.morning),
      evening: parseFloat(formData.evening),
      total: total
    };
    setMilkRecords([...milkRecords, newRecord]);
    setShowForm(false);
    setFormData({
      animalId: '',
      date: new Date().toISOString().split('T')[0],
      morning: '',
      evening: '',
      quality: 'Good'
    });
    alert('Milk record added successfully!');
  };

  const dairyAnimals = animalsData.filter(animal => animal.type === 'Cow');

  const getAnimalName = (id) => {
    const animal = animalsData.find(a => a.id === parseInt(id));
    return animal ? animal.name : 'Unknown';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>🥛 Milk Production</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Milk Record'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add Milk Production Record</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Animal *</label>
                <select
                  name="animalId"
                  value={formData.animalId}
                  onChange={(e) => setFormData({...formData, animalId: e.target.value})}
                  required
                >
                  <option value="">Select Animal</option>
                  {dairyAnimals.map(animal => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} ({animal.breed})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Morning (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  name="morning"
                  value={formData.morning}
                  onChange={(e) => setFormData({...formData, morning: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Evening (Liters)</label>
                <input
                  type="number"
                  step="0.1"
                  name="evening"
                  value={formData.evening}
                  onChange={(e) => setFormData({...formData, evening: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Quality</label>
              <select
                name="quality"
                value={formData.quality}
                onChange={(e) => setFormData({...formData, quality: e.target.value})}
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success">Add Record</button>
          </form>
        </div>
      )}

      {/* Milk Production Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🥛</div>
          <div className="stat-info">
            <h3>{milkRecords.reduce((sum, record) => sum + record.total, 0).toFixed(1)}</h3>
            <p>Total Milk (Liters)</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{(milkRecords.reduce((sum, record) => sum + record.total, 0) / milkRecords.length || 0).toFixed(1)}</h3>
            <p>Average per Day</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🐄</div>
          <div className="stat-info">
            <h3>{dairyAnimals.length}</h3>
            <p>Dairy Animals</p>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h3>Milk Production Records</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Morning (L)</th>
              <th>Evening (L)</th>
              <th>Total (L)</th>
              <th>Quality</th>
            </tr>
          </thead>
          <tbody>
            {milkRecords.map(record => (
              <tr key={record.id}>
                <td>{getAnimalName(record.animalId)}</td>
                <td>{record.date}</td>
                <td>{record.morning}</td>
                <td>{record.evening}</td>
                <td><strong>{record.total}</strong></td>
                <td>
                  <span className={`quality-${record.quality.toLowerCase()}`}>
                    {record.quality}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilkProduction;