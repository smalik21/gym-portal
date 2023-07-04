import './App.css';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Admin from './pages/Admin/Admin';
import Member from './pages/Member/Member';
import User from './pages/User/User';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accountType, setAccountType] = useState('');

  const handleLogin = (type) => {
    setIsAuthenticated(true);
    setAccountType(type);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccountType('');
  };

  return (
    <div className="App">
      {/* <BrowserRouter> */}
        <Routes>
          <Route
            path="login"
            // element={<Login onLogin={handleLogin} />}
            // Redirect to appropriate page if already authenticated
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                accountType === 'Admin' ? (
                  <Admin onLogout={handleLogout} />
                ) : accountType === 'Member' ? (
                  <Member onLogout={handleLogout} />
                ) : (
                  <User onLogout={handleLogout} />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
