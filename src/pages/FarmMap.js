import React, { useState } from 'react';

const FarmMap = () => {
  const [farmLayout] = useState([
    {
      id: 1,
      name: 'Main Barn',
      type: 'Barn',
      animals: ['Bessie', 'Daisy'],
      capacity: 20,
      current: 2
    },
    {
      id: 2,
      name: 'Pig Pen',
      type: 'Pen',
      animals: ['Porky'],
      capacity: 10,
      current: 1
    },
    {
      id: 3,
      name: 'Sheep Field',
      type: 'Field',
      animals: ['Wooly'],
      capacity: 50,
      current: 1
    },
    {
      id: 4,
      name: 'Feed Storage',
      type: 'Storage',
      capacity: '1000kg',
      current: '500kg'
    }
  ]);

  const getSectionIcon = (type) => {
    const icons = {
      'Barn': '🏠',
      'Pen': '🐷',
      'Field': '🌾',
      'Storage': '📦',
      'Medical': '🏥'
    };
    return icons[type] || '📍';
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>Farm Layout & Map</h1>
        <button className="btn btn-primary">Edit Layout</button>
      </div>

      <div className="farm-map">
        <div className="map-grid">
          {farmLayout.map(section => (
            <div key={section.id} className="farm-section">
              <div className="section-header">
                <span className="section-icon">{getSectionIcon(section.type)}</span>
                <h3>{section.name}</h3>
                <span className="section-type">{section.type}</span>
              </div>
              
              <div className="section-details">
                {section.animals && (
                  <div className="animal-list">
                    <strong>Animals:</strong>
                    {section.animals.map((animal, index) => (
                      <span key={index} className="animal-tag">{animal}</span>
                    ))}
                  </div>
                )}
                
                {section.capacity && (
                  <div className="capacity-info">
                    <div className="capacity-bar">
                      <div 
                        className="capacity-fill"
                        style={{
                          width: `${((section.current / (typeof section.capacity === 'number' ? section.capacity : 100)) * 100)}%`
                        }}
                      ></div>
                    </div>
                    <span>
                      {section.current} / {section.capacity} 
                      {typeof section.capacity === 'string' ? '' : ' animals'}
                    </span>
                  </div>
                )}
              </div>

              <div className="section-actions">
                <button className="btn btn-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="map-legend">
        <h4>Map Legend</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-icon">🏠</span>
            <span>Barn - Large animal housing</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🐷</span>
            <span>Pen - Specific animal enclosures</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">🌾</span>
            <span>Field - Grazing areas</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon">📦</span>
            <span>Storage - Feed and supplies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmMap;