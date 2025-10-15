import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { animalsData } from '../data/Data';

const AnimalList = () => {
  const [animals, setAnimals] = useState(animalsData);
  const [filter, setFilter] = useState('');

  const deleteAnimal = (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      setAnimals(animals.filter(animal => animal.id !== id));
    }
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(filter.toLowerCase()) ||
    animal.type.toLowerCase().includes(filter.toLowerCase()) ||
    animal.breed.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1>Animal Management</h1>
        <Link to="/animals/add" className="btn btn-primary">
          Add New Animal
        </Link>
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search animals by name, type, or breed..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Weight (kg)</th>
            <th>Health Status</th>
            <th>Last Vaccination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnimals.map(animal => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.type}</td>
              <td>{animal.breed}</td>
              <td>{animal.age} years</td>
              <td>{animal.weight} kg</td>
              <td>
                <span className={`status ${animal.healthStatus.toLowerCase()}`}>
                  {animal.healthStatus}
                </span>
              </td>
              <td>{animal.lastVaccination}</td>
              <td>
                <Link 
                  to={`/animals/edit/${animal.id}`} 
                  className="btn btn-warning"
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Link>
                <button 
                  onClick={() => deleteAnimal(animal.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredAnimals.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No animals found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default AnimalList;
