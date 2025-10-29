import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  FiSearch, FiUser, FiChevronDown, FiBell, FiPlus, FiHome, FiUsers,
  FiClock, FiCheckCircle, FiXCircle, FiMessageSquare, FiUserPlus,
  FiBarChart2, FiSettings, FiFileText, FiHelpCircle, FiFilter,
  FiDownload, FiCalendar, FiMapPin, FiPhone, FiImage, FiMoreVertical,
  FiMoon, FiSun, FiMenu, FiX, FiZoomIn, FiZoomOut, FiRotateCw, FiLock, FiEye
} from "react-icons/fi";
import '../CSS/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Theme state
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("lords-aqua-admin-theme") || "light";
    } catch {
      return "light";
    }
  });

  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("pending");

  // Profile dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Notifications state
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadNotifications] = useState(5);

  // Image modal state
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("approve");

  // Table state
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter states
  const [dateRange, setDateRange] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [seedTypeFilter, setSeedTypeFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  // Sample data
  const [sellers] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      phone: "+91 9876543210",
      dateTaken: "2025-10-25",
      seedsTaken: 5000,
      region: "Mumbai",
      seedType: "Prawn",
      status: "pending",
      currentDay: 25,
      images: [
        { id: 1, dayRange: "Day 1-10", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 2, dayRange: "Day 10-20", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 3, dayRange: "Day 20-30", url: null, uploaded: false },
        { id: 4, dayRange: "Day 30-40", url: null, uploaded: false }
      ]
    },
    {
      id: 2,
      name: "Suresh Patel",
      phone: "+91 9123456789",
      dateTaken: "2025-10-26",
      seedsTaken: 3000,
      region: "Chennai",
      seedType: "Fish",
      status: "pending",
      currentDay: 15,
      images: [
        { id: 1, dayRange: "Day 1-10", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 2, dayRange: "Day 10-20", url: null, uploaded: false },
        { id: 3, dayRange: "Day 20-30", url: null, uploaded: false },
        { id: 4, dayRange: "Day 30-40", url: null, uploaded: false }
      ]
    },
    {
      id: 3,
      name: "Vijay Singh",
      phone: "+91 9988776655",
      dateTaken: "2025-10-24",
      seedsTaken: 7500,
      region: "Kolkata",
      seedType: "Prawn",
      status: "approved",
      currentDay: 40,
      images: [
        { id: 1, dayRange: "Day 1-10", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 2, dayRange: "Day 10-20", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 3, dayRange: "Day 20-30", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 4, dayRange: "Day 30-40", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true }
      ]
    },
    {
      id: 4,
      name: "Anita Deshmukh",
      phone: "+91 9876501234",
      dateTaken: "2025-10-27",
      seedsTaken: 4200,
      region: "Hyderabad",
      seedType: "Crab",
      status: "pending",
      currentDay: 32,
      images: [
        { id: 1, dayRange: "Day 1-10", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 2, dayRange: "Day 10-20", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 3, dayRange: "Day 20-30", url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d", uploaded: true },
        { id: 4, dayRange: "Day 30-40", url: null, uploaded: false }
      ]
    },
    {
      id: 5,
      name: "Rajesh Naik",
      phone: "+91 9111222333",
      dateTaken: "2025-10-23",
      seedsTaken: 6000,
      region: "Bangalore",
      seedType: "Fish",
      status: "declined",
      currentDay: 8,
      images: [
        { id: 1, dayRange: "Day 1-10", url: null, uploaded: false },
        { id: 2, dayRange: "Day 10-20", url: null, uploaded: false },
        { id: 3, dayRange: "Day 20-30", url: null, uploaded: false },
        { id: 4, dayRange: "Day 30-40", url: null, uploaded: false }
      ]
    }
  ]);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      localStorage.setItem("lords-aqua-admin-theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  // Handle navigation
  const handleNavigation = (section, path) => {
    setActiveSection(section);
    if (path) {
      navigate(path);
    }
    setSidebarOpen(false);
  };

  // Handle row selection
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredSellers.map(seller => seller.id));
    }
    setSelectAll(!selectAll);
  };

  // Filter sellers
  const filteredSellers = sellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         seller.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || seller.status === statusFilter;
    const matchesSeedType = seedTypeFilter === "all" || seller.seedType === seedTypeFilter;
    const matchesRegion = regionFilter === "all" || seller.region === regionFilter;

    return matchesSearch && matchesStatus && matchesSeedType && matchesRegion;
  });

  // Calculate stats
  const totalSellers = sellers.length;
  const pendingCount = sellers.filter(s => s.status === "pending").length;
  const approvedCount = sellers.filter(s => s.status === "approved").length;
  const declinedCount = sellers.filter(s => s.status === "declined").length;

  // Pagination
  const totalPages = Math.ceil(filteredSellers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentSellers = filteredSellers.slice(startIndex, endIndex);

  // Bulk actions
  const handleBulkApprove = () => {
    console.log("Bulk approving:", selectedRows);
    // Implement bulk approve logic
  };

  const handleBulkDecline = () => {
    console.log("Bulk declining:", selectedRows);
    // Implement bulk decline logic
  };

  const handleExportCSV = () => {
    console.log("Exporting to CSV");
    // Implement CSV export logic
  };

  // Handle image click
  const handleImageClick = (seller, imageUrl) => {
    setSelectedSeller(seller);
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
    setImageZoom(1);
    setFeedback("");
  };

  // Handle zoom
  const handleZoomIn = () => setImageZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setImageZoom(prev => Math.max(prev - 0.25, 0.5));

  // Handle feedback submission
  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", {
      seller: selectedSeller,
      type: feedbackType,
      comment: feedback
    });
    setImageModalOpen(false);
  };

  return (
    <div className="admin-dashboard" data-admin-theme={theme}>
      {/* TOP NAVBAR */}
      <nav className="admin-navbar">
        <div className="admin-navbar-left">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="admin-logo">
            <img src="/logo.png" alt="Lords Aqua Hatcheries" className="admin-logo-img" />
            <div className="admin-brand-text">
              <span className="admin-brand-title">Lords Aqua Hatcheries</span>
              <span className="admin-brand-subtitle">Admin Panel</span>
            </div>
          </div>
        </div>

        <div className="admin-navbar-center">
          {/* Search bar moved to filters section */}
        </div>

        <div className="admin-navbar-right">
          {/* Quick Actions */}
          <button className="quick-action-btn" onClick={() => navigate('/admin/add-user')}>
            <FiPlus />
            <span>Add User</span>
          </button>

          {/* Theme Toggle */}
          <button className="icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {/* Notifications */}
          <div className="notifications-wrapper">
            <button
              className="icon-btn notification-btn"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <FiBell />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>

            {notificationsOpen && (
              <div className="notifications-dropdown">
                <div className="dropdown-header">
                  <h3>Notifications</h3>
                  <button className="mark-read-btn">Mark all read</button>
                </div>
                <div className="notifications-list">
                  <div className="notification-item unread">
                    <FiCheckCircle className="notif-icon success" />
                    <div className="notif-content">
                      <p>New submission from Ramesh Kumar</p>
                      <span className="notif-time">5 minutes ago</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <FiUsers className="notif-icon info" />
                    <div className="notif-content">
                      <p>3 new sellers registered</p>
                      <span className="notif-time">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="profile-avatar">
                <FiUser />
              </div>
              <span className="profile-name">Admin User</span>
              <FiChevronDown className={`dropdown-arrow ${profileDropdownOpen ? 'open' : ''}`} />
            </button>

            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => navigate('/admin-profile')}>
                  <FiUser />
                  <span>Profile</span>
                </div>
                <div className="dropdown-item" onClick={() => navigate('/admin/settings')}>
                  <FiSettings />
                  <span>Settings</span>
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={() => navigate('/admin-login')}>
                  <FiXCircle />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-section">
          <div className="section-title">Main</div>
          <button
            className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`}
            onClick={() => handleNavigation('dashboard', '/admin/dashboard')}
          >
            <FiHome />
            <span>Dashboard</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'sellers' ? 'active' : ''}`}
            onClick={() => handleNavigation('sellers', '/admin/sellers')}
          >
            <FiUsers />
            <span>Sellers</span>
          </button>
        </div>

        <div className="sidebar-section">
          <div className="section-title">Submissions</div>
          <button
            className={`sidebar-item ${activeSection === 'pending' ? 'active' : ''}`}
            onClick={() => handleNavigation('pending', '/admin/pending')}
          >
            <FiClock />
            <span>Pending Images</span>
            {pendingCount > 0 && <span className="sidebar-badge">{pendingCount}</span>}
          </button>
          <button
            className={`sidebar-item ${activeSection === 'approved' ? 'active' : ''}`}
            onClick={() => handleNavigation('approved', '/admin/approved')}
          >
            <FiCheckCircle />
            <span>Approved</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'declined' ? 'active' : ''}`}
            onClick={() => handleNavigation('declined', '/admin/declined')}
          >
            <FiXCircle />
            <span>Declined</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => handleNavigation('notifications', '/admin/notifications')}
          >
            <FiMessageSquare />
            <span>Notifications</span>
          </button>
        </div>

        <div className="sidebar-section">
          <div className="section-title">Management</div>
          <button
            className={`sidebar-item ${activeSection === 'add-user' ? 'active' : ''}`}
            onClick={() => handleNavigation('add-user', '/admin/add-user')}
          >
            <FiUserPlus />
            <span>Add User</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'reports' ? 'active' : ''}`}
            onClick={() => handleNavigation('reports', '/admin/reports')}
          >
            <FiBarChart2 />
            <span>Reports</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => handleNavigation('settings', '/admin/settings')}
          >
            <FiSettings />
            <span>Settings</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'audit' ? 'active' : ''}`}
            onClick={() => handleNavigation('audit', '/admin/audit')}
          >
            <FiFileText />
            <span>Audit Log</span>
          </button>
          <button
            className={`sidebar-item ${activeSection === 'help' ? 'active' : ''}`}
            onClick={() => handleNavigation('help', '/admin/help')}
          >
            <FiHelpCircle />
            <span>Help</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="admin-main">
        {/* Header Row */}
        <div className="admin-header">
          <div className="header-title">
            <h1>Pending Images</h1>
            <p>Review and manage seller submissions</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon total">
                <FiUsers />
              </div>
              <div className="stat-content">
                <div className="stat-value">{totalSellers}</div>
                <div className="stat-label">Total Sellers</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">
                <FiClock />
              </div>
              <div className="stat-content">
                <div className="stat-value">{pendingCount}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon approved">
                <FiCheckCircle />
              </div>
              <div className="stat-content">
                <div className="stat-value">{approvedCount}</div>
                <div className="stat-label">Approved</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon declined">
                <FiXCircle />
              </div>
              <div className="stat-content">
                <div className="stat-value">{declinedCount}</div>
                <div className="stat-label">Declined</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Row */}
        <div className="filters-row">
          <div className="filters-left">
            <div className="filter-group">
              <FiCalendar className="filter-icon" />
              <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            <div className="filter-group">
              <FiFilter className="filter-icon" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
              </select>
            </div>

            <div className="filter-group">
              <select value={seedTypeFilter} onChange={(e) => setSeedTypeFilter(e.target.value)}>
                <option value="all">All Seed Types</option>
                <option value="Prawn">Prawn</option>
                <option value="Fish">Fish</option>
                <option value="Crab">Crab</option>
              </select>
            </div>

            <div className="filter-group">
              <FiMapPin className="filter-icon" />
              <select value={regionFilter} onChange={(e) => setRegionFilter(e.target.value)}>
                <option value="all">All Regions</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            {/* Search bar moved here */}
            <div className="filter-group search-filter">
              <FiSearch className="filter-icon" />
              <input
                type="text"
                placeholder="Search sellers, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="filters-right">
            <button className="export-btn" onClick={handleExportCSV}>
              <FiDownload />
              <span>Export</span>
            </button>

            {selectedRows.length > 0 && (
              <div className="bulk-actions">
                <button className="bulk-btn approve" onClick={handleBulkApprove}>
                  <FiCheckCircle />
                  Approve ({selectedRows.length})
                </button>
                <button className="bulk-btn decline" onClick={handleBulkDecline}>
                  <FiXCircle />
                  Decline ({selectedRows.length})
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table View */}
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Member</th>
                <th>Phone</th>
                <th>Date Taken</th>
                <th>Seeds Taken</th>
                <th>Images</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSellers.map(seller => (
                <tr key={seller.id} className={selectedRows.includes(seller.id) ? 'selected' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(seller.id)}
                      onChange={() => handleRowSelect(seller.id)}
                    />
                  </td>
                  <td>
                    <div className="member-cell">
                      <div className="member-avatar">
                        {seller.name.charAt(0)}
                      </div>
                      <div className="member-info">
                        <div className="member-name">{seller.name}</div>
                        <div className="member-region">
                          <FiMapPin style={{ fontSize: "0.75rem" }} />
                          {seller.region}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="phone-cell">
                      <FiPhone style={{ fontSize: "0.875rem", opacity: 0.6 }} />
                      {seller.phone}
                    </div>
                  </td>
                  <td>{seller.dateTaken}</td>
                  <td>
                    <span className="seeds-badge">{seller.seedsTaken.toLocaleString()}</span>
                  </td>
                  <td>
                    <div className="images-cell">
                      {seller.images.map((img) => (
                        <div
                          key={img.id}
                          className={`image-thumb ${img.uploaded ? 'uploaded' : 'locked'}`}
                          onClick={() => img.uploaded && handleImageClick(seller, img.url)}
                          title={img.uploaded ? `${img.dayRange} - Click to view` : `${img.dayRange} - Not uploaded yet`}
                        >
                          {img.uploaded ? <FiEye /> : <FiLock />}
                          <span className="day-label">{img.dayRange}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${seller.status}`}>
                      {seller.status === 'pending' && <FiClock />}
                      {seller.status === 'approved' && <FiCheckCircle />}
                      {seller.status === 'declined' && <FiXCircle />}
                      {seller.status.charAt(0).toUpperCase() + seller.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="action-btn approve" title="Approve">
                        <FiCheckCircle />
                      </button>
                      <button className="action-btn decline" title="Decline">
                        <FiXCircle />
                      </button>
                      <button className="action-btn more" title="More actions">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredSellers.length)} of {filteredSellers.length} entries
          </div>

          <div className="pagination-controls">
            <div className="rows-per-page">
              <label>Rows per page:</label>
              <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="pagination-buttons">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  className={currentPage === idx + 1 ? 'active' : ''}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="admin-footer">
        <div className="footer-left">
          <span>HatchTrack Admin v1.0.0</span>
          <span className="footer-divider">•</span>
          <span>Last sync: Just now</span>
        </div>
        <div className="footer-right">
          <span>Support: +91 1800-123-456</span>
          <span className="footer-divider">•</span>
          <span>admin@lordsaqua.com</span>
        </div>
      </footer>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Image Zoom Modal */}
      {imageModalOpen && (
        <div className="image-modal-overlay" onClick={() => setImageModalOpen(false)}>
          <div className="image-modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setImageModalOpen(false)}>
              <FiX />
            </button>

            <div className="image-modal-content">
              {/* Left Side - Image Viewer */}
              <div className="image-viewer-section">
                <div className="image-viewer-header">
                  <h3>Image Preview</h3>
                  <div className="zoom-controls">
                    <button onClick={handleZoomOut} title="Zoom Out">
                      <FiZoomOut />
                    </button>
                    <span>{Math.round(imageZoom * 100)}%</span>
                    <button onClick={handleZoomIn} title="Zoom In">
                      <FiZoomIn />
                    </button>
                    <button onClick={() => setImageZoom(1)} title="Reset Zoom">
                      <FiRotateCw />
                    </button>
                  </div>
                </div>
                <div className="image-viewer-container">
                  <img
                    src={selectedImage}
                    alt="Seller submission"
                    style={{ transform: `scale(${imageZoom})` }}
                  />
                </div>
                {selectedSeller && (
                  <div className="image-info">
                    <div className="info-row">
                      <span className="info-label">Seller:</span>
                      <span className="info-value">{selectedSeller.name}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Region:</span>
                      <span className="info-value">{selectedSeller.region}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Date:</span>
                      <span className="info-value">{selectedSeller.dateTaken}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Seeds:</span>
                      <span className="info-value">{selectedSeller.seedsTaken.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side - Feedback Section */}
              <div className="feedback-section">
                <h3>Provide Feedback</h3>

                <div className="feedback-type-selector">
                  <button
                    className={`feedback-type-btn approve ${feedbackType === 'approve' ? 'active' : ''}`}
                    onClick={() => setFeedbackType('approve')}
                  >
                    <FiCheckCircle />
                    Approve
                  </button>
                  <button
                    className={`feedback-type-btn decline ${feedbackType === 'decline' ? 'active' : ''}`}
                    onClick={() => setFeedbackType('decline')}
                  >
                    <FiXCircle />
                    Decline
                  </button>
                </div>

                <div className="feedback-form">
                  <label>Comment / Reason</label>
                  <textarea
                    placeholder={feedbackType === 'approve'
                      ? "Add positive feedback or suggestions..."
                      : "Explain the reason for declining..."}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={6}
                  />

                  {feedbackType === 'decline' && (
                    <div className="quick-reasons">
                      <label>Quick Reasons:</label>
                      <div className="reason-chips">
                        {['Poor lighting', 'Out of focus', 'Wrong angle', 'Incomplete view', 'Date mismatch'].map(reason => (
                          <button
                            key={reason}
                            className="reason-chip"
                            onClick={() => setFeedback(prev => prev ? `${prev}, ${reason}` : reason)}
                          >
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="feedback-actions">
                    <button className="btn-cancel" onClick={() => setImageModalOpen(false)}>
                      Cancel
                    </button>
                    <button
                      className={`btn-submit ${feedbackType}`}
                      onClick={handleFeedbackSubmit}
                    >
                      {feedbackType === 'approve' ? 'Approve & Submit' : 'Decline & Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
