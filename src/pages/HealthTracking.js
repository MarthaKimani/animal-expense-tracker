import React, { useState, useEffect } from 'react';
import { animalsData } from '../data/Data';

const HealthTracking = () => {
  const [healthRecords, setHealthRecords] = useState([
    {
      id: 1,
      animalId: 1,
      date: '2024-07-20',
      type: 'Vaccination',
      vaccine: 'Brucellosis',
      nextDue: '2025-01-20',
      notes: 'Annual vaccination',
      status: 'Completed'
    },
    {
      id: 2,
      animalId: 3,
      date: '2024-07-18',
      type: 'Treatment',
      condition: 'Respiratory Infection',
      medication: 'Penicillin',
      dosage: '10ml daily for 5 days',
      status: 'In Progress'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    animalId: '',
    date: new Date().toISOString().split('T')[0],
    type: 'Vaccination',
    vaccine: '',
    condition: '',
    medication: '',
    dosage: '',
    nextDue: '',
    notes: '',
    status: 'Scheduled'
  });

  const [upcomingTreatments, setUpcomingTreatments] = useState([]);

  useEffect(() => {
    // Calculate upcoming treatments
    const upcoming = healthRecords.filter(record => 
      record.nextDue && new Date(record.nextDue) >= new Date()
    ).sort((a, b) => new Date(a.nextDue) - new Date(b.nextDue));
    setUpcomingTreatments(upcoming);
  }, [healthRecords]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      id: Date.now(),
      ...formData
    };
    setHealthRecords([...healthRecords, newRecord]);
    setShowForm(false);
    alert('Health record added successfully!');
  };

  const getAnimalName = (id) => {
    const animal = animalsData.find(a => a.id === parseInt(id));
    return animal ? animal.name : 'Unknown';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Health Tracking</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? 'Cancel' : 'Add Health Record'}
        </button>
      </div>

      {/* Upcoming Treatments */}
      <div className="dashboard-card">
        <h3>🔔 Upcoming Treatments & Vaccinations</h3>
        <div className="card-body">
          {upcomingTreatments.length > 0 ? (
            upcomingTreatments.map(record => (
              <div key={record.id} className="reminder-item">
                <div className="reminder-info">
                  <strong>{getAnimalName(record.animalId)}</strong>
                  <span>{record.type}: {record.vaccine || record.condition}</span>
                  <small>Due: {record.nextDue}</small>
                </div>
                <div className={`reminder-status status-${record.status.toLowerCase()}`}>
                  {record.status}
                </div>
              </div>
            ))
          ) : (
            <p>No upcoming treatments scheduled.</p>
          )}
        </div>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add Health Record</h3>
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
                  {animalsData.map(animal => (
                    <option key={animal.id} value={animal.id}>
                      {animal.name} ({animal.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="Vaccination">Vaccination</option>
                  <option value="Treatment">Treatment</option>
                  <option value="Checkup">Regular Checkup</option>
                  <option value="Surgery">Surgery</option>
                </select>
              </div>
            </div>

            {formData.type === 'Vaccination' && (
              <div className="form-row">
                <div className="form-group">
                  <label>Vaccine Name *</label>
                  <input
                    type="text"
                    name="vaccine"
                    value={formData.vaccine}
                    onChange={(e) => setFormData({...formData, vaccine: e.target.value})}
                    placeholder="Vaccine name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Next Due Date</label>
                  <input
                    type="date"
                    name="nextDue"
                    value={formData.nextDue}
                    onChange={(e) => setFormData({...formData, nextDue: e.target.value})}
                  />
                </div>
              </div>
            )}

            {formData.type === 'Treatment' && (
              <div className="form-row">
                <div className="form-group">
                  <label>Condition *</label>
                  <input
                    type="text"
                    name="condition"
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    placeholder="Illness or condition"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Medication</label>
                  <input
                    type="text"
                    name="medication"
                    value={formData.medication}
                    onChange={(e) => setFormData({...formData, medication: e.target.value})}
                    placeholder="Medication name"
                  />
                </div>
              </div>
            )}

            <div className="form-row">
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
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows="3"
                placeholder="Additional notes..."
              />
            </div>

            <button type="submit" className="btn btn-success">Add Record</button>
          </form>
        </div>
      )}

      <div className="table-card">
        <h3>Health History</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Animal</th>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th>Status</th>
              <th>Next Due</th>
            </tr>
          </thead>
          <tbody>
            {healthRecords.map(record => (
              <tr key={record.id}>
                <td>{getAnimalName(record.animalId)}</td>
                <td>{record.date}</td>
                <td>
                  <span className={`health-type health-type-${record.type.toLowerCase()}`}>
                    {record.type}
                  </span>
                </td>
                <td>
                  {record.vaccine && `Vaccine: ${record.vaccine}`}
                  {record.condition && `Treatment: ${record.condition}`}
                  {!record.vaccine && !record.condition && record.notes}
                </td>
                <td>
                  <span className={`status status-${record.status.toLowerCase()}`}>
                    {record.status}
                  </span>
                </td>
                <td>{record.nextDue || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HealthTracking;