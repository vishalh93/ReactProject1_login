//import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import React, { useState } from 'react'
import RefreshHandler from './pages/RefreshHandler';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to ='/login' />
  }
  return (
    <Router>
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated}></RefreshHandler>
        <Routes>    
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path='/home' element={<PrivateRoute element={<Home/>} />}  />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
