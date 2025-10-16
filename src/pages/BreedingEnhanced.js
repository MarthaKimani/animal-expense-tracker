import React, { useState, useEffect } from 'react';
import { animalsData } from '../data/Data';

const BreedingEnhanced = () => {
  const [breedingRecords, setBreedingRecords] = useState([
    {
      id: 1,
      motherId: 1,
      fatherId: 2,
      breedingDate: '2024-05-15',
      expectedBirth: '2024-08-15',
      actualBirth: '',
      status: 'Pregnant',
      offspringCount: 0,
      notes: 'First breeding - confirmed pregnancy'
    }
  ]);

  const [pregnancyAlerts, setPregnancyAlerts] = useState([]);

  useEffect(() => {
    // Calculate pregnancy alerts
    const alerts = breedingRecords
      .filter(record => record.status === 'Pregnant' && record.expectedBirth)
      .map(record => {
        const daysUntilBirth = Math.ceil((new Date(record.expectedBirth) - new Date()) / (1000 * 60 * 60 * 24));
        return {
          ...record,
          daysUntilBirth,
          alertLevel: daysUntilBirth <= 7 ? 'high' : daysUntilBirth <= 30 ? 'medium' : 'low'
        };
      })
      .sort((a, b) => a.daysUntilBirth - b.daysUntilBirth);
    
    setPregnancyAlerts(alerts);
  }, [breedingRecords]);

  const recordBirth = (recordId, actualBirthDate, offspringCount) => {
    setBreedingRecords(records => 
      records.map(record => 
        record.id === recordId 
          ? { ...record, actualBirth: actualBirthDate, offspringCount, status: 'Delivered' }
          : record
      )
    );
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Breeding & Pregnancy Management</h1>
        <button className="btn btn-primary">Add Breeding Record</button>
      </div>

      {/* Pregnancy Alerts */}
      {pregnancyAlerts.length > 0 && (
        <div className="dashboard-card">
          <h3>🤰 Pregnancy Alerts</h3>
          <div className="card-body">
            {pregnancyAlerts.map(record => {
              const mother = animalsData.find(a => a.id === record.motherId);
              return (
                <div key={record.id} className={`pregnancy-alert alert-${record.alertLevel}`}>
                  <div className="alert-info">
                    <strong>{mother?.name}</strong>
                    <span>Expected: {record.expectedBirth}</span>
                    <small>{record.daysUntilBirth} days until birth</small>
                  </div>
                  <div className="alert-actions">
                    <button 
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        const actualBirth = prompt('Enter actual birth date (YYYY-MM-DD):');
                        const offspringCount = prompt('Enter number of offspring:');
                        if (actualBirth && offspringCount) {
                          recordBirth(record.id, actualBirth, parseInt(offspringCount));
                        }
                      }}
                    >
                      Record Birth
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Breeding Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🤰</div>
          <div className="stat-info">
            <h3>{breedingRecords.filter(r => r.status === 'Pregnant').length}</h3>
            <p>Currently Pregnant</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👶</div>
          <div className="stat-info">
            <h3>{breedingRecords.filter(r => r.status === 'Delivered').reduce((sum, r) => sum + r.offspringCount, 0)}</h3>
            <p>Total Offspring</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{pregnancyAlerts.filter(a => a.alertLevel === 'high').length}</h3>
            <p>Due This Week</p>
          </div>
        </div>
      </div>

      {/* Breeding Calendar View */}
      <div className="dashboard-card">
        <h3>Breeding Calendar</h3>
        <div className="card-body">
          <div className="calendar-view">
            {breedingRecords.map(record => {
              const mother = animalsData.find(a => a.id === record.motherId);
              const father = animalsData.find(a => a.id === record.fatherId);
              return (
                <div key={record.id} className="calendar-event">
                  <div className="event-date">{record.breedingDate}</div>
                  <div className="event-details">
                    <strong>{mother?.name} × {father?.name}</strong>
                    <span>Status: {record.status}</span>
                    {record.expectedBirth && <span>Due: {record.expectedBirth}</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedingEnhanced;