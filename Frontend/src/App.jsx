import { useState, useRef, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './Components/HomePage';
import UserLogin from './Components/UserLogin';
import UserDashboard from './Components/UserDashboard';
import UserProfile from './Components/UserProfile';
import UserNotifications from './Components/UserNotifications';
import UserHatcheries from './Components/UserHatcheries';
import UserUpload from './Components/UserUpload';
import UserSettings from './Components/UserSettings';
import UserHelp from './Components/UserHelp';
import UserDetails from './Components/UserDetails';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogIn from './Components/LogIn';
import Profilecard from './Components/ProfileCard';
import AdminProfile from './Components/AdminProfile';
import AdminAddUser from './Components/AdminAddUser';
import AdminReports from './Components/AdminReports';
import AdminPlaceholder from './Components/AdminPlaceholder';
import { FiUsers, FiClock, FiCheckCircle, FiXCircle, FiMessageSquare, FiSettings, FiFileText, FiHelpCircle } from 'react-icons/fi';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.005;
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgba(0, 40, 80, ${0.9 + Math.sin(time) * 0.1})`);
      gradient.addColorStop(0.3, `rgba(20, 60, 100, ${0.7 + Math.cos(time * 0.8) * 0.1})`);
      gradient.addColorStop(0.6, `rgba(80, 40, 100, ${0.6 + Math.sin(time * 1.2) * 0.1})`);
      gradient.addColorStop(1, `rgba(0, 60, 80, ${0.8 + Math.cos(time * 0.7) * 0.1})`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawOrb = (x, y, radius, color, opacity) => {
        const orbGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        orbGradient.addColorStop(0, `${color}, ${opacity})`);
        orbGradient.addColorStop(0.5, `${color}, ${opacity * 0.4})`);
        orbGradient.addColorStop(1, `${color}, 0)`);
        
        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawOrb(
        canvas.width * 0.15 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.8) * 80,
        250,
        'rgba(0, 150, 255',
        0.6
      );

      drawOrb(
        canvas.width * 0.85 + Math.cos(time * 0.9) * 120,
        canvas.height * 0.7 + Math.sin(time * 1.1) * 90,
        300,
        'rgba(150, 50, 255',
        0.5
      );

      drawOrb(
        canvas.width * 0.5 + Math.sin(time * 1.3) * 60,
        canvas.height * 0.5 + Math.cos(time * 0.6) * 60,
        200,
        'rgba(255, 100, 150',
        0.4
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogIn />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/notifications" element={<UserNotifications />} />
        <Route path="/user/hatcheries" element={<UserHatcheries />} />
        <Route path="/user/upload" element={<UserUpload />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/help" element={<UserHelp />} />
        <Route path="/user/:name" element={<UserDetails />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/user/hatchery/:id" element={<UserHatcheries />} />

        {/* Admin Routes */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/Profile-card" element={<Profilecard />} />

        {/* Admin Management Routes */}
        <Route path="/admin/add-user" element={<AdminAddUser />} />
        <Route path="/admin/user/:id" element={<AdminPlaceholder title="User Details" description="View and manage detailed user information and activity history" icon={FiUsers} />} />
        <Route path="/admin/sellers" element={<AdminPlaceholder title="Sellers Management" description="View and manage all registered sellers in the system" icon={FiUsers} />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminPlaceholder title="System Settings" description="Configure system settings and preferences" icon={FiSettings} />} />
        <Route path="/admin/audit" element={<AdminPlaceholder title="Audit Log" description="View system activity and audit trail" icon={FiFileText} />} />
        <Route path="/admin/help" element={<AdminPlaceholder title="Admin Help Center" description="Get help and documentation for admin panel features" icon={FiHelpCircle} />} />

        {/* Admin Review Routes */}
        <Route path="/admin/pending" element={<AdminDashboard />} />
        <Route path="/admin/approved" element={<AdminPlaceholder title="Approved Submissions" description="View all approved image submissions" icon={FiCheckCircle} />} />
        <Route path="/admin/declined" element={<AdminPlaceholder title="Declined Submissions" description="View all declined image submissions" icon={FiXCircle} />} />
        <Route path="/admin/notifications" element={<AdminPlaceholder title="Admin Notifications" description="View and manage system notifications" icon={FiMessageSquare} />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;