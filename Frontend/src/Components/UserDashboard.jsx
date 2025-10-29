import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiBell, FiUpload, FiMenu, FiX, FiSearch, FiFilter,
  FiGrid, FiHome, FiImage, FiUser, FiSettings, FiHelpCircle,
  FiCheckCircle, FiClock, FiXCircle, FiEye, FiCamera,
  FiMoon, FiSun, FiChevronDown, FiMessageSquare, FiAlertCircle,
  FiEdit, FiLogOut
} from "react-icons/fi";
import "../CSS/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem("user-dashboard-theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "+91 9876543210",
    displayImage: null
  });
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  // Upload slots state - 4 slots for day ranges
  const [uploadSlots, setUploadSlots] = useState([
    { id: 1, dayRange: "Day 1-10", file: null, preview: null, status: "idle", uploadedDate: null },
    { id: 2, dayRange: "Day 10-20", file: null, preview: null, status: "idle", uploadedDate: null },
    { id: 3, dayRange: "Day 20-30", file: null, preview: null, status: "idle", uploadedDate: null },
    { id: 4, dayRange: "Day 30-40", file: null, preview: null, status: "idle", uploadedDate: null }
  ]);

  // Notifications with admin feedback
  const [notifications] = useState([
    {
      id: 1,
      type: "accepted",
      message: "Your Day 1-10 upload has been approved",
      comment: "Excellent growth progress! Keep up the good work.",
      date: "2025-10-27",
      time: "10:30 AM",
      read: false
    },
    {
      id: 2,
      type: "rejected",
      message: "Your Day 10-20 upload was rejected",
      comment: "Image quality is too low. Please upload a clearer photo.",
      date: "2025-10-26",
      time: "02:15 PM",
      read: false
    },
    {
      id: 3,
      type: "comment",
      message: "Admin added a comment on Day 20-30",
      comment: "Good progress. Please ensure the water temperature is maintained between 28-30°C.",
      date: "2025-10-25",
      time: "09:45 AM",
      read: true
    }
  ]);

  // Mock hatchery data
  const [hatcheries] = useState([
    {
      id: 1,
      title: "Pond #1",
      currentDay: 15,
      totalDays: 40,
      status: "accepted",
      thumbnail: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=400&h=300&fit=crop",
      uploadedDays: 15,
      lastUpload: "2025-10-27"
    },
    {
      id: 2,
      title: "Pond #2",
      currentDay: 8,
      totalDays: 40,
      status: "pending",
      thumbnail: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=400&h=300&fit=crop",
      uploadedDays: 8,
      lastUpload: "2025-10-26"
    },
    {
      id: 3,
      title: "Pond #3",
      currentDay: 25,
      totalDays: 40,
      status: "declined",
      thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop",
      uploadedDays: 24,
      lastUpload: "2025-10-20"
    }
  ]);

  // Stats
  const totalHatcheries = hatcheries.length;
  const pendingCount = hatcheries.filter(h => h.status === "pending").length;
  const acceptedCount = hatcheries.filter(h => h.status === "accepted").length;
  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Theme handling
  useEffect(() => {
    document.documentElement.setAttribute("data-user-dashboard-theme", theme);
    localStorage.setItem("user-dashboard-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  // Filter hatcheries
  const filteredHatcheries = hatcheries.filter(h => {
    const matchesStatus = filterStatus === "all" || h.status === filterStatus;
    const matchesSearch = h.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    const badges = {
      accepted: { icon: <FiCheckCircle />, text: "Accepted", className: "status-accepted" },
      pending: { icon: <FiClock />, text: "Pending", className: "status-pending" },
      declined: { icon: <FiXCircle />, text: "Declined", className: "status-declined" }
    };
    return badges[status] || badges.pending;
  };

  // Handle profile image upload
  const handleProfileImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUserProfile({ ...userProfile, displayImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upload slot image selection
  const handleSlotImageUpload = (slotId, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadSlots(prevSlots =>
          prevSlots.map(slot =>
            slot.id === slotId
              ? { ...slot, file, preview: reader.result, status: "selected" }
              : slot
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Confirm upload
  const confirmSlotUpload = (slotId) => {
    setUploadSlots(prevSlots =>
      prevSlots.map(slot =>
        slot.id === slotId
          ? { ...slot, status: "uploaded", uploadedDate: new Date().toLocaleDateString() }
          : slot
      )
    );
  };

  // Delete slot image
  const deleteSlotImage = (slotId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      setUploadSlots(prevSlots =>
        prevSlots.map(slot =>
          slot.id === slotId
            ? { id: slot.id, dayRange: slot.dayRange, file: null, preview: null, status: "idle", uploadedDate: null }
            : slot
        )
      );
    }
  };

  // Navigation handlers
  const handleNavigation = (section, path) => {
    setActiveSection(section);

    // Handle scroll to sections for hatcheries and upload
    if (section === "hatcheries") {
      const hatcheriesSection = document.getElementById("hatcheries-section");
      if (hatcheriesSection) {
        hatcheriesSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setSidebarOpen(false);
      return;
    }

    if (section === "upload") {
      const uploadSection = document.getElementById("upload-section");
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setSidebarOpen(false);
      return;
    }

    if (path) {
      navigate(path);
    }
    setSidebarOpen(false);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "accepted":
        return <FiCheckCircle className="notif-icon accepted" />;
      case "rejected":
        return <FiXCircle className="notif-icon rejected" />;
      case "comment":
        return <FiMessageSquare className="notif-icon comment" />;
      default:
        return <FiBell className="notif-icon" />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/logo.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">Lords Aqua Hatcheries</h1>
        </div>

        <div className="header-right">
          {/* Notifications Dropdown */}
          <div className="notifications-dropdown-container">
            <button
              className="header-icon-btn"
              title="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <FiBell />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>

            {notificationsOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setNotificationsOpen(false)} />
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    <span className="notif-count">{unreadNotifications} new</span>
                  </div>
                  <div className="notifications-list">
                    {notifications.map(notif => (
                      <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                        {getNotificationIcon(notif.type)}
                        <div className="notif-content">
                          <div className="notif-message">{notif.message}</div>
                          <div className="notif-comment">{notif.comment}</div>
                          <div className="notif-meta">{notif.date} at {notif.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="view-all-notif"
                    onClick={() => handleNavigation("notifications", "/user/notifications")}
                  >
                    View All Notifications
                  </button>
                </div>
              </>
            )}
          </div>

          <button className="quick-upload-btn" onClick={() => handleNavigation("upload")}>
            <FiUpload /> Quick Upload
          </button>

          <button className="header-icon-btn theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <div className="profile-dropdown-container">
            <button
              className="profile-menu-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <FiMenu />
            </button>

            {profileDropdownOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setProfileDropdownOpen(false)} />
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {profileImagePreview ? (
                        <img src={profileImagePreview} alt="Profile" />
                      ) : (
                        "RK"
                      )}
                    </div>
                    <div className="dropdown-user-info">
                      <div className="dropdown-name">{userProfile.name}</div>
                      <div className="dropdown-email">{userProfile.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item" onClick={() => handleNavigation("profile", "/user/profile")}>
                    <FiUser /> Profile / Edit
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigation("settings", "/user/settings")}>
                    <FiSettings /> Settings
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigation("help", "/user/help")}>
                    <FiHelpCircle /> Help
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={() => navigate("/")}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Sidebar */}
        <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
          <nav className="sidebar-nav">
            <button
              className={`sidebar-item ${activeSection === "dashboard" ? "active" : ""}`}
              onClick={() => handleNavigation("dashboard", "/user/dashboard")}
            >
              <FiHome /> Dashboard
            </button>
            <button
              className={`sidebar-item ${activeSection === "hatcheries" ? "active" : ""}`}
              onClick={() => handleNavigation("hatcheries")}
            >
              <FiGrid /> My Hatcheries
            </button>
            <button
              className={`sidebar-item ${activeSection === "upload" ? "active" : ""}`}
              onClick={() => handleNavigation("upload")}
            >
              <FiUpload /> Upload New
            </button>
            <button
              className={`sidebar-item ${activeSection === "notifications" ? "active" : ""}`}
              onClick={() => handleNavigation("notifications", "/user/notifications")}
            >
              <FiBell /> Notifications
              {unreadNotifications > 0 && (
                <span className="sidebar-badge">{unreadNotifications}</span>
              )}
            </button>
            <button
              className={`sidebar-item ${activeSection === "profile" ? "active" : ""}`}
              onClick={() => handleNavigation("profile", "/user/profile")}
            >
              <FiUser /> Profile / Edit
            </button>
            <button
              className={`sidebar-item ${activeSection === "help" ? "active" : ""}`}
              onClick={() => handleNavigation("help", "/user/help")}
            >
              <FiHelpCircle /> Help
            </button>
            <button
              className={`sidebar-item ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => handleNavigation("settings", "/user/settings")}
            >
              <FiSettings /> Settings
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* User Profile Section */}
          <div className="user-profile-section">
            <div className="profile-card">
              <div className="profile-image-container">
                <div className="profile-display-image">
                  {profileImagePreview ? (
                    <img src={profileImagePreview} alt="Profile" />
                  ) : (
                    <div className="profile-placeholder">
                      <FiUser />
                    </div>
                  )}
                </div>
                <label htmlFor="profile-image-upload" className="profile-image-upload-btn">
                  <FiCamera />
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className="profile-info">
                <h2>{userProfile.name}</h2>
                <p className="profile-email">{userProfile.email}</p>
                <p className="profile-phone">{userProfile.phone}</p>
              </div>
              <button className="edit-profile-btn" onClick={() => handleNavigation("profile", "/user/profile")}>
                <FiEdit /> Edit Profile
              </button>
            </div>
          </div>

          {/* Upload Slots Section - 4 Day Ranges */}
          <div id="upload-section" className="upload-slots-section">
            <h2 className="section-heading">Upload Growth Images</h2>
            <p className="section-subheading">Upload images for each growth period (4 uploads required)</p>

            <div className="upload-slots-grid">
              {uploadSlots.map(slot => (
                <div key={slot.id} className="upload-slot-card">
                  <div className="slot-header">
                    <h3>{slot.dayRange}</h3>
                    <span className={`slot-status-badge ${slot.status}`}>
                      {slot.status === "uploaded" ? <FiCheckCircle /> : <FiClock />}
                      {slot.status === "uploaded" ? "Uploaded" : "Pending"}
                    </span>
                  </div>

                  <div className="slot-preview">
                    {slot.preview ? (
                      <img src={slot.preview} alt={slot.dayRange} />
                    ) : (
                      <div className="slot-placeholder">
                        <FiImage />
                        <span>No image uploaded</span>
                      </div>
                    )}
                  </div>

                  <div className="slot-actions">
                    {slot.status === "idle" && (
                      <label className="slot-upload-btn">
                        <FiUpload /> Select Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleSlotImageUpload(slot.id, e)}
                          style={{ display: "none" }}
                        />
                      </label>
                    )}

                    {slot.status === "selected" && (
                      <>
                        <button className="slot-confirm-btn" onClick={() => confirmSlotUpload(slot.id)}>
                          <FiCheckCircle /> Confirm Upload
                        </button>
                        <label className="slot-retake-btn">
                          <FiCamera /> Retake
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleSlotImageUpload(slot.id, e)}
                            style={{ display: "none" }}
                          />
                        </label>
                      </>
                    )}

                    {slot.status === "uploaded" && (
                      <>
                        <div className="upload-success">
                          <FiCheckCircle /> Uploaded on {slot.uploadedDate}
                        </div>
                        <button className="slot-delete-btn" onClick={() => deleteSlotImage(slot.id)}>
                          <FiXCircle /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search hatcheries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-buttons">
              <button
                className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
                onClick={() => setFilterStatus("all")}
              >
                All
              </button>
              <button
                className={`filter-btn ${filterStatus === "accepted" ? "active" : ""}`}
                onClick={() => setFilterStatus("accepted")}
              >
                Accepted
              </button>
              <button
                className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
                onClick={() => setFilterStatus("pending")}
              >
                Pending
              </button>
              <button
                className={`filter-btn ${filterStatus === "declined" ? "active" : ""}`}
                onClick={() => setFilterStatus("declined")}
              >
                Declined
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon total">
                <FiGrid />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalHatcheries}</div>
                <div className="stat-label">Total Hatcheries</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <FiClock />
              </div>
              <div className="stat-content">
                <div className="stat-value">{pendingCount}</div>
                <div className="stat-label">Pending Approval</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon accepted">
                <FiCheckCircle />
              </div>
              <div className="stat-content">
                <div className="stat-value">{acceptedCount}</div>
                <div className="stat-label">Accepted</div>
              </div>
            </div>
          </div>

          {/* Hatchery Cards Grid */}
          <div id="hatcheries-section" className="hatcheries-section">
            <h2 className="section-heading">My Hatcheries</h2>
            <div className="hatcheries-grid">
              {filteredHatcheries.map(hatchery => {
                const badge = getStatusBadge(hatchery.status);
                const progressPercent = (hatchery.uploadedDays / hatchery.totalDays) * 100;

                return (
                  <div key={hatchery.id} className="hatchery-card">
                    <div className="hatchery-thumbnail">
                      <img src={hatchery.thumbnail} alt={hatchery.title} />
                      <div className={`hatchery-status-badge ${badge.className}`}>
                        {badge.icon} {badge.text}
                      </div>
                    </div>

                    <div className="hatchery-content">
                      <div className="hatchery-header">
                        <h3 className="hatchery-title">{hatchery.title}</h3>
                        <span className="hatchery-days">
                          Day {hatchery.currentDay} / {hatchery.totalDays}
                        </span>
                      </div>

                      <div className="progress-container">
                        <div className="progress-label">
                          <span>Upload Progress</span>
                          <span>{hatchery.uploadedDays} / {hatchery.totalDays} days</span>
                        </div>
                        <div className="progress-bar-container">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="hatchery-meta">
                        Last upload: {hatchery.lastUpload}
                      </div>

                      <div className="hatchery-actions">
                        <button className="hatchery-btn btn-primary" onClick={() => navigate(`/user/hatchery/${hatchery.id}`)}>
                          <FiEye /> View Timeline
                        </button>
                        <button className="hatchery-btn btn-secondary" onClick={() => handleNavigation("upload")}>
                          <FiCamera /> Upload Photo
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredHatcheries.length === 0 && (
              <div className="empty-state">
                <FiGrid className="empty-icon" />
                <p>No hatcheries found</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <p>Download our app for a better experience!</p>
        <button className="footer-download-btn">
          Download on Play Store
        </button>
      </footer>
    </div>
  );
}
