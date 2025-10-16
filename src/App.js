import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AnimalList from './pages/AnimalList';
import AddAnimal from './pages/AddAnimal';
import EditAnimal from './pages/EditAnimal';
import FinanceList from './pages/FinanceList';
import AddFinance from './pages/AddFinance';
import Login from './pages/Login';
import Register from './pages/Register';
import HealthTracking from './pages/HealthTracking';
import FeedingGrowth from './pages/FeedingGrowth';
import Tasks from './pages/Tasks';
import Inventory from './pages/Inventory';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import FarmMap from './pages/FarmMap';
import MilkProduction from './pages/MilkProduction';
import BreedingEnhanced from './pages/BreedingEnhanced';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar logout={logout} />}
        <div className={`main-content ${isAuthenticated ? 'authenticated' : ''}`}>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? 
                <Login login={login} /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? 
                <Register /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/animals" 
              element={
                isAuthenticated ? 
                <AnimalList /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/animals/add" 
              element={
                isAuthenticated ? 
                <AddAnimal /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/animals/edit/:id" 
              element={
                isAuthenticated ? 
                <EditAnimal /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/finances" 
              element={
                isAuthenticated ? 
                <FinanceList /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/finances/add" 
              element={
                isAuthenticated ? 
                <AddFinance /> : 
                <Navigate to="/login" replace />
              } 
            />
             {/* New Feature Routes */}
            <Route path="/health"
             element={isAuthenticated ?
              <HealthTracking /> :
               <Navigate to="/login" replace />}
                />
            <Route path="/feeding" 
            element={isAuthenticated ?
             <FeedingGrowth /> : 
             <Navigate to="/login" replace />}
              />
            <Route path="/milk-production"
             element={isAuthenticated ?
              <MilkProduction /> :
               <Navigate to="/login" replace />}
                />
            <Route path="/tasks"
             element={isAuthenticated ? 
             <Tasks /> :
             <Navigate to="/login" replace />}
             />
            <Route path="/inventory" 
            element={isAuthenticated ?
             <Inventory /> :
              <Navigate to="/login" replace />}
               />
            <Route path="/analytics"
             element={isAuthenticated ?
              <Analytics /> : 
              <Navigate to="/login" replace />} 
              />
            <Route path="/reports"
             element={isAuthenticated ? 
             <Reports /> :
              <Navigate to="/login" replace />}
               />
            <Route path="/farm-map"
             element={isAuthenticated ?
              <FarmMap /> : 
              <Navigate to="/login" replace />} 
              />
                <Route path="/breeding"
             element={isAuthenticated ?
              <BreedingEnhanced /> : 
              <Navigate to="/login" replace />} 
              />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import './App.css';
// import Sidebar from './components/Sidebar';
// import AnimalList from './pages/AnimalList';
// import AddAnimal from './pages/AddAnimal';
// import EditAnimal from './pages/EditAnimal';
// import FinanceList from './pages/FinanceList';
// import AddFinance from './pages/AddFinance';
// import Login from './pages/Login';
// import Register from './pages/Register';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in on app start
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//     setLoading(false);
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     setIsAuthenticated(true);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setIsAuthenticated(false);
//   };

//   if (loading) {
//     return <div className="loading">Loading...</div>;
//   }

//   return (
//     <Router>
//       <div className="app">
//         {isAuthenticated && <Sidebar logout={logout} />}
//         <div className={`main-content ${isAuthenticated ? 'authenticated' : ''}`}>
//           <Routes>
//             {/* Public Routes */}
//             <Route 
//               path="/login" 
//               element={
//                 !isAuthenticated ? 
//                 <Login login={login} /> : 
//                 <Navigate to="/animals" replace />
//               } 
//             />
//             <Route 
//               path="/register" 
//               element={
//                 !isAuthenticated ? 
//                 <Register /> : 
//                 <Navigate to="/animals" replace />
//               } 
//             />
            
//             {/* Protected Routes */}
//             <Route 
//               path="/animals" 
//               element={
//                 isAuthenticated ? 
//                 <AnimalList /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/animals/add" 
//               element={
//                 isAuthenticated ? 
//                 <AddAnimal /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/animals/edit/:id" 
//               element={
//                 isAuthenticated ? 
//                 <EditAnimal /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/finances" 
//               element={
//                 isAuthenticated ? 
//                 <FinanceList /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
//             <Route 
//               path="/finances/add" 
//               element={
//                 isAuthenticated ? 
//                 <AddFinance /> : 
//                 <Navigate to="/login" replace />
//               } 
//             />
            
//             {/* Default Route */}
//             <Route 
//               path="/" 
//               element={
//                 <Navigate to={isAuthenticated ? "/animals" : "/login"} replace />
//               } 
//             />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// } 
// export default App;