import React, { useState } from 'react';
import { animalsData } from '../data/Data';

const FeedingGrowth = () => {
  const [feedingRecords] = useState([
    {
      id: 1,
      animalId: 1,
      date: '2024-07-20',
      feedType: 'Hay',
      quantity: 25,
      unit: 'kg',
      cost: 12.50,
      notes: 'Morning feeding'
    }
  ]);

  const [growthRecords] = useState([
    {
      id: 1,
      animalId: 1,
      date: '2024-07-20',
      weight: 655,
      height: 140,
      condition: 'Excellent',
      notes: 'Regular growth check'
    }
  ]);

  const [activeTab, setActiveTab] = useState('feeding');

  const calculateGrowthRate = (animalId) => {
    const animalRecords = growthRecords
      .filter(record => record.animalId === animalId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (animalRecords.length < 2) return 0;
    
    const firstWeight = animalRecords[0].weight;
    const lastWeight = animalRecords[animalRecords.length - 1].weight;
    const daysDiff = (new Date(animalRecords[animalRecords.length - 1].date) - new Date(animalRecords[0].date)) / (1000 * 60 * 60 * 24);
    
    return ((lastWeight - firstWeight) / daysDiff).toFixed(2);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Feeding & Growth Tracking</h1>
        <div className="tab-buttons">
          <button 
            className={`tab-button ${activeTab === 'feeding' ? 'active' : ''}`}
            onClick={() => setActiveTab('feeding')}
          >
            🍽️ Feeding
          </button>
          <button 
            className={`tab-button ${activeTab === 'growth' ? 'active' : ''}`}
            onClick={() => setActiveTab('growth')}
          >
            📈 Growth
          </button>
        </div>
      </div>

      {/* Feeding Records */}
      {activeTab === 'feeding' && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🍽️</div>
              <div className="stat-info">
                <h3>{feedingRecords.reduce((sum, record) => sum + record.quantity, 0)}</h3>
                <p>Total Feed This Week</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <h3>${feedingRecords.reduce((sum, record) => sum + record.cost, 0).toFixed(2)}</h3>
                <p>Feed Cost This Week</p>
              </div>
            </div>
          </div>

          <div className="table-card">
            <h3>Feeding Records</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Animal</th>
                  <th>Date</th>
                  <th>Feed Type</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {feedingRecords.map(record => {
                  const animal = animalsData.find(a => a.id === record.animalId);
                  return (
                    <tr key={record.id}>
                      <td>{animal?.name}</td>
                      <td>{record.date}</td>
                      <td>{record.feedType}</td>
                      <td>{record.quantity} {record.unit}</td>
                      <td>${record.cost.toFixed(2)}</td>
                      <td>{record.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Growth Records */}
      {activeTab === 'growth' && (
        <>
          <div className="stats-grid">
            {animalsData.map(animal => {
              const growthRate = calculateGrowthRate(animal.id);
              return (
                <div key={animal.id} className="stat-card">
                  <div className="stat-icon">⚖️</div>
                  <div className="stat-info">
                    <h3>{growthRate} kg/day</h3>
                    <p>{animal.name} Growth Rate</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="table-card">
            <h3>Growth Records</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Animal</th>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  <th>Height (cm)</th>
                  <th>Condition</th>
                  <th>Growth Rate</th>
                </tr>
              </thead>
              <tbody>
                {growthRecords.map(record => {
                  const animal = animalsData.find(a => a.id === record.animalId);
                  const growthRate = calculateGrowthRate(record.animalId);
                  return (
                    <tr key={record.id}>
                      <td>{animal?.name}</td>
                      <td>{record.date}</td>
                      <td>{record.weight} kg</td>
                      <td>{record.height} cm</td>
                      <td>
                        <span className={`condition condition-${record.condition.toLowerCase()}`}>
                          {record.condition}
                        </span>
                      </td>
                      <td>{growthRate} kg/day</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedingGrowth;