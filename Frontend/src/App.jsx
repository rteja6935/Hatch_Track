import { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Components/HomePage';
import UserLogin from './Components/UserLogin';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';

import UserDetails from './Components/UserDetails';
import AdminLogIn from './Components/LogIn';
import './App.css';

function App() {
  const [count, setCount] = useState(0); // optional state, remove if not needed

  return (
    <>
      <Routes>
        {/* Redirect root path to login */}
        {/* <Route path="/" element={<Navigate to="/user-login" />} /> */}

        {/* Main Routes */}
         <Route path="/" element={< HomePage/>} />
        <Route path="/admin-login" element={<AdminLogIn />} />
       
        {/* <Route path="/Admin-Login" element={<AdminLogin />} /> */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/user-details" element={<UserDetails />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/user-login" />} />
      </Routes>
    </>
  );
}

export default App;
