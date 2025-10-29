import { useState } from 'react';
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
  const [count, setCount] = useState(0); // optional state, remove if not needed

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
