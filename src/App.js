import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import AnimalList from './pages/AnimalList';
import AddAnimal from './pages/AddAnimal';
import EditAnimal from './pages/EditAnimal';
import FinanceList from './pages/FinanceList';
import AddFinance from './pages/AddFinance';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/animals" replace />} />
            <Route path="/animals" element={<AnimalList />} />
            <Route path="/animals/add" element={<AddAnimal />} />
            <Route path="/animals/edit/:id" element={<EditAnimal />} />
            <Route path="/finances" element={<FinanceList />} />
            <Route path="/finances/add" element={<AddFinance />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;