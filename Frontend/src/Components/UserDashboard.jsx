import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell, FiUpload, FiMenu, FiX, FiHome, FiGrid, FiSettings, FiHelpCircle,
  FiCheckCircle, FiClock, FiXCircle, FiEye, FiCamera, FiUser, FiLogOut,
  FiTrendingUp, FiPackage, FiActivity, FiFileText, FiChevronDown, FiCalendar,
  FiImage, FiTrash2, FiDownload, FiFilter, FiBarChart2, FiPieChart, FiAlertCircle,
  FiGlobe, FiMoon, FiSun, FiLock, FiMail, FiPhone, FiDatabase, FiRefreshCw, FiShield, FiSave,
  FiMessageCircle, FiBook, FiSend, FiChevronRight, FiEdit3, FiMapPin
} from "react-icons/fi";
import "../CSS/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  // Get phone number from localStorage (set during login)
  const userPhoneNumber = localStorage.getItem("userPhoneNumber") || "+919876543210";

  // User profile state
  const [userProfile, setUserProfile] = useState({
    firstName: "Ramesh",
    lastName: "Kumar",
    email: "ramesh@example.com",
    phone: userPhoneNumber,
    displayImage: null,
    country: "India",
    state: "Andhra Pradesh",
    region: "Coastal Region",
    pincode: "533001",
    hatcheryName: "Coastal Aqua Farms"
  });

  // Profile edit modal state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileEditData, setProfileEditData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    displayImage: null,
    country: "",
    state: "",
    region: "",
    pincode: "",
    hatcheryName: ""
  });

  // Notifications state
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      message: "Hatchery #1 batch approved",
      time: "2 hours ago",
      read: false
    },
    {
      id: 2,
      type: "warning",
      message: "Upload pending for Hatchery #2",
      time: "5 hours ago",
      read: false
    },
    {
      id: 3,
      type: "info",
      message: "New seeds available in stock",
      time: "1 day ago",
      read: true
    }
  ]);

  // Overview stats
  const [stats] = useState({
    seedsAvailable: 25000,
    seedsPurchased: 18500,
    activeBatches: 4,
    totalHatcheries: 6
  });

  // My Hatcheries state
  const [hatcheries, setHatcheries] = useState([
    {
      id: 1,
      name: "Coastal Farm - Pond A1",
      startDate: "2025-10-01",
      currentDate: "2025-10-31",
      endDate: "2025-11-30",
      status: "active",
      images: [null, null, null, null]
    }
  ]);

  const [selectedHatchery, setSelectedHatchery] = useState(null);
  const [showAddHatcheryForm, setShowAddHatcheryForm] = useState(false);
  const [newHatchery, setNewHatchery] = useState({
    name: "",
    startDate: "",
    endDate: ""
  });

  // Reports state
  const [reportFilters, setReportFilters] = useState({
    dateRange: "all",
    status: "all",
    batchType: "all"
  });
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [showBatchDetailModal, setShowBatchDetailModal] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    language: "en",
    theme: "light",
    notificationsEnabled: true,
    emailNotifications: true,
    pushNotifications: false
  });
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showChangePhoneModal, setShowChangePhoneModal] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [phoneData, setPhoneData] = useState({
    newPhone: "",
    otp: ""
  });
  const [emailData, setEmailData] = useState({
    newEmail: "",
    otp: ""
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // Help section state
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: ""
  });
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  // Mock batch reports data
  const [batchReports] = useState([
    {
      id: 1,
      batchName: "Batch A1 - Oct 2025",
      hatchery: "Coastal Farm - Pond A1",
      startDate: "2025-10-01",
      endDate: "2025-10-31",
      status: "completed",
      totalSeeds: 5000,
      survivalRate: 92,
      imagesUploaded: 4,
      adminFeedback: "Excellent growth rate. Water quality maintained well.",
      growthData: [
        { day: 5, weight: 0.5, length: 12 },
        { day: 10, weight: 1.2, length: 18 },
        { day: 15, weight: 2.1, length: 25 },
        { day: 20, weight: 3.5, length: 32 },
        { day: 25, weight: 5.2, length: 40 },
        { day: 30, weight: 7.8, length: 48 }
      ]
    },
    {
      id: 2,
      batchName: "Batch B2 - Sep 2025",
      hatchery: "River Valley - Pond B2",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      status: "approved",
      totalSeeds: 4500,
      survivalRate: 88,
      imagesUploaded: 4,
      adminFeedback: "Good progress. Monitor water temperature more closely.",
      growthData: [
        { day: 5, weight: 0.4, length: 11 },
        { day: 10, weight: 1.0, length: 17 },
        { day: 15, weight: 1.9, length: 23 },
        { day: 20, weight: 3.2, length: 30 },
        { day: 25, weight: 4.8, length: 38 },
        { day: 30, weight: 7.0, length: 45 }
      ]
    },
    {
      id: 3,
      batchName: "Batch C3 - Aug 2025",
      hatchery: "Coastal Farm - Pond A1",
      startDate: "2025-08-01",
      endDate: "2025-08-31",
      status: "pending",
      totalSeeds: 5500,
      survivalRate: 85,
      imagesUploaded: 3,
      adminFeedback: "Awaiting final inspection.",
      growthData: [
        { day: 5, weight: 0.5, length: 12 },
        { day: 10, weight: 1.1, length: 18 },
        { day: 15, weight: 2.0, length: 24 },
        { day: 20, weight: 3.3, length: 31 },
        { day: 25, weight: 5.0, length: 39 }
      ]
    },
    {
      id: 4,
      batchName: "Batch D4 - Jul 2025",
      hatchery: "Mountain Springs - Pond C1",
      startDate: "2025-07-01",
      endDate: "2025-07-31",
      status: "rejected",
      totalSeeds: 4000,
      survivalRate: 65,
      imagesUploaded: 4,
      adminFeedback: "Low survival rate. Review feeding schedule and water quality parameters.",
      growthData: [
        { day: 5, weight: 0.3, length: 10 },
        { day: 10, weight: 0.8, length: 15 },
        { day: 15, weight: 1.5, length: 20 },
        { day: 20, weight: 2.5, length: 26 },
        { day: 25, weight: 3.8, length: 33 },
        { day: 30, weight: 5.5, length: 40 }
      ]
    }
  ]);

  // Calculate report stats
  const reportStats = {
    totalBatches: batchReports.length,
    approvedBatches: batchReports.filter(b => b.status === "approved" || b.status === "completed").length,
    pendingBatches: batchReports.filter(b => b.status === "pending").length,
    rejectedBatches: batchReports.filter(b => b.status === "rejected").length,
    avgSurvivalRate: Math.round(batchReports.reduce((sum, b) => sum + b.survivalRate, 0) / batchReports.length),
    totalSeeds: batchReports.reduce((sum, b) => sum + b.totalSeeds, 0)
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  // Handle navigation
  const handleNavigation = (section) => {
    setActiveSection(section);
    setSidebarOpen(false);
    setProfileDropdownOpen(false);
    setNotificationsOpen(false);
  };

  // Handle image upload for hatchery
  const handleImageUpload = (hatcheryId, imageIndex, e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHatcheries(prev =>
          prev.map(h =>
            h.id === hatcheryId
              ? {
                  ...h,
                  images: h.images.map((img, idx) =>
                    idx === imageIndex ? reader.result : img
                  )
                }
              : h
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle remove image
  const handleRemoveImage = (hatcheryId, imageIndex) => {
    if (window.confirm("Are you sure you want to remove this image?")) {
      setHatcheries(prev =>
        prev.map(h =>
          h.id === hatcheryId
            ? {
                ...h,
                images: h.images.map((img, idx) =>
                  idx === imageIndex ? null : img
                )
              }
            : h
        )
      );
    }
  };

  // Handle add new hatchery
  const handleAddHatchery = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const newHatcheryData = {
      id: Date.now(),
      name: newHatchery.name,
      startDate: newHatchery.startDate,
      currentDate: today,
      endDate: newHatchery.endDate,
      status: "active",
      images: [null, null, null, null]
    };
    setHatcheries(prev => [...prev, newHatcheryData]);
    setNewHatchery({ name: "", startDate: "", endDate: "" });
    setShowAddHatcheryForm(false);
  };

  // Handle delete hatchery
  const handleDeleteHatchery = (id) => {
    if (window.confirm("Are you sure you want to delete this hatchery?")) {
      setHatcheries(prev => prev.filter(h => h.id !== id));
      setSelectedHatchery(null);
    }
  };

  // Render Overview Section
  const renderOverview = () => (
    <div className="overview-section">
      <h2 className="section-title">Overview</h2>
      <p className="section-subtitle">Welcome back, {userProfile.name}! Here's your hatchery summary.</p>

      <div className="stats-grid">
        <div className="stat-card seeds-available">
          <div className="stat-icon">
            <FiPackage />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.seedsAvailable.toLocaleString()}</div>
            <div className="stat-label">Seeds Available</div>
          </div>
        </div>

        <div className="stat-card seeds-purchased">
          <div className="stat-icon">
            <FiTrendingUp />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.seedsPurchased.toLocaleString()}</div>
            <div className="stat-label">Seeds Purchased</div>
          </div>
        </div>

        <div className="stat-card active-batches">
          <div className="stat-icon">
            <FiActivity />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.activeBatches}</div>
            <div className="stat-label">Active Batches</div>
          </div>
        </div>

        <div className="stat-card total-hatcheries">
          <div className="stat-icon">
            <FiGrid />
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalHatcheries}</div>
            <div className="stat-label">Total Hatcheries</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h3 className="subsection-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          <button className="quick-action-card" onClick={() => handleNavigation("hatcheries")}>
            <FiGrid className="action-icon" />
            <span>View All Hatcheries</span>
          </button>
          <button className="quick-action-card" onClick={() => handleNavigation("notifications")}>
            <FiBell className="action-icon" />
            <span>Check Notifications</span>
          </button>
          <button className="quick-action-card" onClick={() => handleNavigation("reports")}>
            <FiFileText className="action-icon" />
            <span>Generate Report</span>
          </button>
          <button className="quick-action-card" onClick={() => handleNavigation("settings")}>
            <FiSettings className="action-icon" />
            <span>Manage Settings</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h3 className="subsection-title">Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon success">
              <FiCheckCircle />
            </div>
            <div className="activity-content">
              <p className="activity-text">Hatchery "Coastal Farm - Pond A1" image uploaded successfully</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon info">
              <FiPackage />
            </div>
            <div className="activity-content">
              <p className="activity-text">5000 new seeds added to inventory</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon warning">
              <FiClock />
            </div>
            <div className="activity-content">
              <p className="activity-text">Batch #3 requires image upload</p>
              <span className="activity-time">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render My Hatcheries Section
  const renderMyHatcheries = () => (
    <div className="hatcheries-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">My Hatcheries</h2>
          <p className="section-subtitle">Manage your hatchery batches and upload progress images</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddHatcheryForm(true)}>
          <FiGrid /> Add New Hatchery
        </button>
      </div>

      {/* Add Hatchery Form */}
      {showAddHatcheryForm && (
        <div className="modal-overlay" onClick={() => setShowAddHatcheryForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Hatchery</h3>
              <button className="modal-close" onClick={() => setShowAddHatcheryForm(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddHatchery} className="hatchery-form">
              <div className="form-group">
                <label>Hatchery Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Coastal Farm - Pond A1"
                  value={newHatchery.name}
                  onChange={(e) => setNewHatchery({ ...newHatchery, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Date *</label>
                  <input
                    type="date"
                    value={newHatchery.startDate}
                    onChange={(e) => setNewHatchery({ ...newHatchery, startDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Date *</label>
                  <input
                    type="date"
                    value={newHatchery.endDate}
                    onChange={(e) => setNewHatchery({ ...newHatchery, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowAddHatcheryForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Hatchery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hatcheries List */}
      <div className="hatcheries-list">
        {hatcheries.map(hatchery => (
          <div key={hatchery.id} className="hatchery-card-detailed">
            <div className="hatchery-header">
              <div className="hatchery-info">
                <h3 className="hatchery-name">{hatchery.name}</h3>
                <span className={`hatchery-status-badge ${hatchery.status}`}>
                  {hatchery.status === "active" && <FiCheckCircle />}
                  {hatchery.status}
                </span>
              </div>
              <button className="btn-danger-icon" onClick={() => handleDeleteHatchery(hatchery.id)}>
                <FiTrash2 />
              </button>
            </div>

            <div className="hatchery-dates">
              <div className="date-item">
                <FiCalendar />
                <div>
                  <span className="date-label">Start Date</span>
                  <span className="date-value">{hatchery.startDate}</span>
                </div>
              </div>
              <div className="date-item">
                <FiClock />
                <div>
                  <span className="date-label">Current Date</span>
                  <span className="date-value">{hatchery.currentDate}</span>
                </div>
              </div>
              <div className="date-item">
                <FiCalendar />
                <div>
                  <span className="date-label">End Date</span>
                  <span className="date-value">{hatchery.endDate}</span>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="image-upload-section">
              <h4 className="upload-title">Progress Images (4 images required)</h4>
              <div className="images-grid">
                {hatchery.images.map((image, index) => (
                  <div key={index} className="image-upload-slot">
                    <div className="image-preview">
                      {image ? (
                        <>
                          <img src={image} alt={`Upload ${index + 1}`} />
                          <button
                            className="remove-image-btn"
                            onClick={() => handleRemoveImage(hatchery.id, index)}
                          >
                            <FiTrash2 />
                          </button>
                        </>
                      ) : (
                        <label className="upload-placeholder">
                          <FiCamera />
                          <span>Upload Image {index + 1}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(hatchery.id, index, e)}
                            style={{ display: "none" }}
                          />
                        </label>
                      )}
                    </div>
                    <div className="image-slot-label">
                      Image {index + 1}
                      {image && <FiCheckCircle className="uploaded-icon" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Section */}
            <div className="hatchery-status-section">
              <div className="status-info">
                <span className="status-label">Upload Status:</span>
                <span className="status-value">
                  {hatchery.images.filter(img => img !== null).length} / 4 images uploaded
                </span>
              </div>
              {hatchery.images.filter(img => img !== null).length === 4 && (
                <div className="status-complete">
                  <FiCheckCircle /> All images uploaded successfully
                </div>
              )}
            </div>
          </div>
        ))}

        {hatcheries.length === 0 && (
          <div className="empty-state">
            <FiGrid className="empty-icon" />
            <p>No hatcheries found</p>
            <button className="btn-primary" onClick={() => setShowAddHatcheryForm(true)}>
              <FiGrid /> Add Your First Hatchery
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Render Notifications Section
  const renderNotifications = () => (
    <div className="notifications-section">
      <h2 className="section-title">Notifications</h2>
      <p className="section-subtitle">Stay updated with your hatchery activities</p>
      <div className="notifications-list-full">
        {notifications.map(notif => (
          <div key={notif.id} className={`notification-item-full ${notif.read ? 'read' : 'unread'}`}>
            <div className={`notif-icon-wrapper ${notif.type}`}>
              {notif.type === "success" && <FiCheckCircle />}
              {notif.type === "warning" && <FiClock />}
              {notif.type === "info" && <FiBell />}
            </div>
            <div className="notif-content-full">
              <p className="notif-message">{notif.message}</p>
              <span className="notif-time">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Filter batch reports
  const filteredBatchReports = batchReports.filter(batch => {
    const matchesStatus = reportFilters.status === "all" || batch.status === reportFilters.status;
    // Add more filter logic as needed
    return matchesStatus;
  });

  // Handle export
  const handleExportReport = (format) => {
    alert(`Exporting report as ${format.toUpperCase()}... This would download a ${format} file in production.`);
  };

  // Handle view batch details
  const handleViewBatchDetails = (batch) => {
    setSelectedBatch(batch);
    setShowBatchDetailModal(true);
  };

  // Render Reports Section
  const renderReports = () => (
    <div className="reports-section">
      <div className="reports-header">
        <div>
          <h2 className="section-title">Reports & Analytics</h2>
          <p className="section-subtitle">Track batch performance and growth metrics</p>
        </div>
        <div className="export-buttons">
          <button className="btn-export" onClick={() => handleExportReport('pdf')}>
            <FiDownload /> Export PDF
          </button>
          <button className="btn-export" onClick={() => handleExportReport('excel')}>
            <FiDownload /> Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="reports-filters">
        <div className="filter-group">
          <FiFilter className="filter-icon" />
          <select
            value={reportFilters.status}
            onChange={(e) => setReportFilters({ ...reportFilters, status: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="filter-group">
          <FiCalendar className="filter-icon" />
          <select
            value={reportFilters.dateRange}
            onChange={(e) => setReportFilters({ ...reportFilters, dateRange: e.target.value })}
            className="filter-select"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="reports-summary-grid">
        <div className="report-summary-card total">
          <div className="summary-icon">
            <FiGrid />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.totalBatches}</div>
            <div className="summary-label">Total Batches</div>
          </div>
        </div>

        <div className="report-summary-card approved">
          <div className="summary-icon">
            <FiCheckCircle />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.approvedBatches}</div>
            <div className="summary-label">Approved</div>
          </div>
        </div>

        <div className="report-summary-card pending">
          <div className="summary-icon">
            <FiClock />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.pendingBatches}</div>
            <div className="summary-label">Pending</div>
          </div>
        </div>

        <div className="report-summary-card rejected">
          <div className="summary-icon">
            <FiXCircle />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.rejectedBatches}</div>
            <div className="summary-label">Rejected</div>
          </div>
        </div>

        <div className="report-summary-card survival">
          <div className="summary-icon">
            <FiTrendingUp />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.avgSurvivalRate}%</div>
            <div className="summary-label">Avg Survival Rate</div>
          </div>
        </div>

        <div className="report-summary-card seeds">
          <div className="summary-icon">
            <FiPackage />
          </div>
          <div className="summary-content">
            <div className="summary-value">{reportStats.totalSeeds.toLocaleString()}</div>
            <div className="summary-label">Total Seeds</div>
          </div>
        </div>
      </div>

      {/* Growth Chart Visualization */}
      <div className="growth-chart-section">
        <h3 className="subsection-title">
          <FiBarChart2 /> Growth Trends
        </h3>
        <div className="chart-container">
          <div className="chart-placeholder">
            <FiPieChart className="chart-icon" />
            <p>Interactive growth charts showing weight and length progression</p>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color weight"></div>
                <span>Average Weight (grams)</span>
              </div>
              <div className="legend-item">
                <div className="legend-color length"></div>
                <span>Average Length (mm)</span>
              </div>
            </div>
            <div className="simple-bar-chart">
              {batchReports[0]?.growthData.map((data, idx) => (
                <div key={idx} className="bar-group">
                  <div className="bar weight-bar" style={{ height: `${(data.weight / 8) * 100}%` }}>
                    <span className="bar-label">{data.weight}g</span>
                  </div>
                  <div className="bar length-bar" style={{ height: `${(data.length / 50) * 100}%` }}>
                    <span className="bar-label">{data.length}mm</span>
                  </div>
                  <div className="bar-day-label">Day {data.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Batch-wise Table */}
      <div className="batch-table-section">
        <h3 className="subsection-title">
          <FiFileText /> Batch Reports
        </h3>
        <div className="table-container">
          <table className="batch-report-table">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Hatchery</th>
                <th>Duration</th>
                <th>Seeds</th>
                <th>Survival</th>
                <th>Status</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatchReports.map(batch => (
                <tr key={batch.id}>
                  <td className="batch-name-cell">{batch.batchName}</td>
                  <td>{batch.hatchery}</td>
                  <td>{batch.startDate} to {batch.endDate}</td>
                  <td>{batch.totalSeeds.toLocaleString()}</td>
                  <td>
                    <span className={`survival-badge ${batch.survivalRate >= 85 ? 'high' : batch.survivalRate >= 70 ? 'medium' : 'low'}`}>
                      {batch.survivalRate}%
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge-table ${batch.status}`}>
                      {batch.status === "completed" && <FiCheckCircle />}
                      {batch.status === "approved" && <FiCheckCircle />}
                      {batch.status === "pending" && <FiClock />}
                      {batch.status === "rejected" && <FiXCircle />}
                      {batch.status}
                    </span>
                  </td>
                  <td>{batch.imagesUploaded} / 4</td>
                  <td>
                    <button className="btn-view-details" onClick={() => handleViewBatchDetails(batch)}>
                      <FiEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Feedback Summary */}
      <div className="insights-section">
        <h3 className="subsection-title">
          <FiAlertCircle /> Insights & Feedback
        </h3>
        <div className="insights-grid">
          {filteredBatchReports.filter(b => b.adminFeedback).map(batch => (
            <div key={batch.id} className={`insight-card ${batch.status}`}>
              <div className="insight-header">
                <span className="insight-batch-name">{batch.batchName}</span>
                <span className={`insight-status ${batch.status}`}>
                  {batch.status}
                </span>
              </div>
              <p className="insight-feedback">{batch.adminFeedback}</p>
              <div className="insight-meta">
                <span>Survival Rate: {batch.survivalRate}%</span>
                <span>•</span>
                <span>{batch.totalSeeds.toLocaleString()} seeds</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Batch Detail Modal */}
      {showBatchDetailModal && selectedBatch && (
        <div className="modal-overlay" onClick={() => setShowBatchDetailModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Batch Details: {selectedBatch.batchName}</h3>
              <button className="modal-close" onClick={() => setShowBatchDetailModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="batch-detail-content">
              {/* Batch Info Grid */}
              <div className="batch-detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Hatchery</span>
                  <span className="detail-value">{selectedBatch.hatchery}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">{selectedBatch.startDate} to {selectedBatch.endDate}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Seeds</span>
                  <span className="detail-value">{selectedBatch.totalSeeds.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Survival Rate</span>
                  <span className="detail-value">{selectedBatch.survivalRate}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status ${selectedBatch.status}`}>
                    {selectedBatch.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Images Uploaded</span>
                  <span className="detail-value">{selectedBatch.imagesUploaded} / 4</span>
                </div>
              </div>

              {/* Growth Data Table */}
              <div className="growth-data-section">
                <h4>Growth Progression</h4>
                <table className="growth-data-table">
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Weight (g)</th>
                      <th>Length (mm)</th>
                      <th>Growth Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedBatch.growthData.map((data, idx) => (
                      <tr key={idx}>
                        <td>Day {data.day}</td>
                        <td>{data.weight}g</td>
                        <td>{data.length}mm</td>
                        <td>
                          {idx > 0 && (
                            <span className="growth-rate positive">
                              +{((data.weight - selectedBatch.growthData[idx - 1].weight) / selectedBatch.growthData[idx - 1].weight * 100).toFixed(1)}%
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Admin Feedback */}
              <div className="admin-feedback-section">
                <h4>Admin Feedback</h4>
                <div className="feedback-box">
                  <FiAlertCircle />
                  <p>{selectedBatch.adminFeedback}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="batch-detail-actions">
                <button className="btn-secondary" onClick={() => handleExportReport('pdf')}>
                  <FiDownload /> Export Report
                </button>
                <button className="btn-primary" onClick={() => setShowBatchDetailModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Handle settings changes
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Handle password change
  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }
    // API call would go here
    alert("Password changed successfully!");
    setShowChangePasswordModal(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  // Handle phone change
  const handleChangePhone = () => {
    if (!phoneData.newPhone || phoneData.newPhone.length < 10) {
      alert("Please enter a valid phone number!");
      return;
    }
    // API call to send OTP would go here
    alert("OTP sent to new phone number!");
  };

  // Handle email change
  const handleChangeEmail = () => {
    if (!emailData.newEmail || !emailData.newEmail.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }
    // API call to send OTP would go here
    alert("Verification email sent!");
  };

  // Handle confirm action
  const handleConfirmAction = (action) => {
    setConfirmAction(action);
    setShowConfirmDialog(true);
  };

  const executeConfirmedAction = () => {
    if (confirmAction === "clearCache") {
      alert("Cache cleared successfully!");
    } else if (confirmAction === "deleteAllData") {
      alert("All data has been deleted!");
    } else if (confirmAction === "downloadData") {
      alert("Downloading your data... This would trigger a download in production.");
    }
    setShowConfirmDialog(false);
    setConfirmAction(null);
  };

  // Profile handlers
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileEditData({ ...profileEditData, displayImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = () => {
    // Validate required fields
    if (!profileEditData.firstName || !profileEditData.lastName || !profileEditData.email) {
      alert("Please fill in all required fields (First Name, Last Name, and Email)!");
      return;
    }

    // Trim whitespace
    const trimmedFirstName = profileEditData.firstName.trim();
    const trimmedLastName = profileEditData.lastName.trim();
    const trimmedEmail = profileEditData.email.trim();

    if (!trimmedFirstName || !trimmedLastName || !trimmedEmail) {
      alert("Please fill in all required fields with valid data!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    // Pincode validation (if provided)
    if (profileEditData.pincode && !/^\d{6}$/.test(profileEditData.pincode)) {
      alert("Pincode must be 6 digits!");
      return;
    }

    // Update profile with trimmed data
    const updatedProfile = {
      ...profileEditData,
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail
    };

    setUserProfile(updatedProfile);
    alert("Profile updated successfully!");
    setShowProfileModal(false);
  };

  const handleMobileRedirect = () => {
    setShowProfileModal(false);
    setProfileDropdownOpen(false);
    setActiveSection("settings");
    // Scroll to account security section (optional)
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("userPhoneNumber");
    // Navigate to home page
    navigate("/");
  };

  const openProfileModal = () => {
    // Sync current profile data to edit modal
    setProfileEditData({ ...userProfile });
    setShowProfileModal(true);
    setProfileDropdownOpen(false);
  };

  // Render Settings Section
  const renderSettings = () => (
    <div className="settings-section">
      <h2 className="section-title">Settings</h2>
      <p className="section-subtitle">Manage your account preferences and security</p>

      {/* App Preferences */}
      <div className="settings-category">
        <div className="category-header">
          <FiSettings className="category-icon" />
          <h3 className="category-title">App Preferences</h3>
        </div>

        <div className="settings-card">
          {/* Language */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiGlobe />
              </div>
              <div className="setting-details">
                <div className="setting-label">Language</div>
                <div className="setting-description">Choose your preferred language</div>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange("language", e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
            </select>
          </div>

          {/* Theme */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                {settings.theme === "light" ? <FiSun /> : <FiMoon />}
              </div>
              <div className="setting-details">
                <div className="setting-label">Theme</div>
                <div className="setting-description">Switch between light and dark mode</div>
              </div>
            </div>
            <div className="theme-toggle">
              <button
                className={`theme-btn ${settings.theme === "light" ? "active" : ""}`}
                onClick={() => handleSettingChange("theme", "light")}
              >
                <FiSun /> Light
              </button>
              <button
                className={`theme-btn ${settings.theme === "dark" ? "active" : ""}`}
                onClick={() => handleSettingChange("theme", "dark")}
              >
                <FiMoon /> Dark
              </button>
            </div>
          </div>

          {/* Notifications Enable */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiBell />
              </div>
              <div className="setting-details">
                <div className="setting-label">Notifications</div>
                <div className="setting-description">Enable or disable all notifications</div>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => handleSettingChange("notificationsEnabled", e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Email Notifications */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiMail />
              </div>
              <div className="setting-details">
                <div className="setting-label">Email Notifications</div>
                <div className="setting-description">Receive updates via email</div>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange("emailNotifications", e.target.checked)}
                disabled={!settings.notificationsEnabled}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          {/* Push Notifications */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiBell />
              </div>
              <div className="setting-details">
                <div className="setting-label">Push Notifications</div>
                <div className="setting-description">Get instant push alerts</div>
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange("pushNotifications", e.target.checked)}
                disabled={!settings.notificationsEnabled}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="settings-category">
        <div className="category-header">
          <FiShield className="category-icon" />
          <h3 className="category-title">Account Security</h3>
        </div>

        <div className="settings-card">
          {/* Change Password */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiLock />
              </div>
              <div className="setting-details">
                <div className="setting-label">Change Password</div>
                <div className="setting-description">Update your account password</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setShowChangePasswordModal(true)}>
              Change
            </button>
          </div>

          {/* Manage Phone Number */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiPhone />
              </div>
              <div className="setting-details">
                <div className="setting-label">Phone Number</div>
                <div className="setting-description">{userProfile.phone}</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setShowChangePhoneModal(true)}>
              Update
            </button>
          </div>

          {/* Manage Email */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiMail />
              </div>
              <div className="setting-details">
                <div className="setting-label">Email Address</div>
                <div className="setting-description">{userProfile.email}</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setShowChangeEmailModal(true)}>
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Storage & Data */}
      <div className="settings-category">
        <div className="category-header">
          <FiDatabase className="category-icon" />
          <h3 className="category-title">Storage & Data</h3>
        </div>

        <div className="settings-card">
          {/* Clear Cache */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiRefreshCw />
              </div>
              <div className="setting-details">
                <div className="setting-label">Clear Cache</div>
                <div className="setting-description">Free up space by clearing cached data</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => handleConfirmAction("clearCache")}>
              Clear
            </button>
          </div>

          {/* Manage Uploads */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiImage />
              </div>
              <div className="setting-details">
                <div className="setting-label">Manage Uploads</div>
                <div className="setting-description">View and manage your uploaded images</div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => handleNavigation("hatcheries")}>
              Manage
            </button>
          </div>

          {/* Download All Data */}
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-icon">
                <FiDownload />
              </div>
              <div className="setting-details">
                <div className="setting-label">Download Your Data</div>
                <div className="setting-description">Download all your hatchery data</div>
              </div>
            </div>
            <button className="btn-primary" onClick={() => handleConfirmAction("downloadData")}>
              <FiDownload /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="modal-overlay" onClick={() => setShowChangePasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowChangePasswordModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password (min 6 characters)"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowChangePasswordModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleChangePassword}>
                  <FiSave /> Save Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Phone Modal */}
      {showChangePhoneModal && (
        <div className="modal-overlay" onClick={() => setShowChangePhoneModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Phone Number</h3>
              <button className="modal-close" onClick={() => setShowChangePhoneModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>New Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter new phone number"
                  value={phoneData.newPhone}
                  onChange={(e) => setPhoneData({ ...phoneData, newPhone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>OTP Verification</label>
                <input
                  type="text"
                  placeholder="Enter OTP sent to new number"
                  value={phoneData.otp}
                  onChange={(e) => setPhoneData({ ...phoneData, otp: e.target.value })}
                />
                <button className="btn-link" onClick={handleChangePhone}>
                  Send OTP
                </button>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowChangePhoneModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={() => alert("Phone number updated!")}>
                  <FiSave /> Verify & Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Email Modal */}
      {showChangeEmailModal && (
        <div className="modal-overlay" onClick={() => setShowChangeEmailModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Email Address</h3>
              <button className="modal-close" onClick={() => setShowChangeEmailModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>New Email Address</label>
                <input
                  type="email"
                  placeholder="Enter new email address"
                  value={emailData.newEmail}
                  onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter code sent to email"
                  value={emailData.otp}
                  onChange={(e) => setEmailData({ ...emailData, otp: e.target.value })}
                />
                <button className="btn-link" onClick={handleChangeEmail}>
                  Send Verification Email
                </button>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowChangeEmailModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={() => alert("Email address updated!")}>
                  <FiSave /> Verify & Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="modal-overlay" onClick={() => setShowConfirmDialog(false)}>
          <div className="modal-content modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Action</h3>
              <button className="modal-close" onClick={() => setShowConfirmDialog(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="confirm-message">
                <FiAlertCircle className="confirm-icon" />
                <p>
                  {confirmAction === "clearCache" && "Are you sure you want to clear the cache? This cannot be undone."}
                  {confirmAction === "downloadData" && "Download all your hatchery data? This may take a few moments."}
                </p>
              </div>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowConfirmDialog(false)}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={executeConfirmedAction}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render Help Section
  const renderHelp = () => {
    const faqs = [
      {
        id: 1,
        question: "How do I add a new hatchery?",
        answer: "Go to 'My Hatcheries' section, click 'Add New Hatchery' button, fill in the hatchery details including name, start date, end date, and upload up to 4 images. Click 'Add Hatchery' to save."
      },
      {
        id: 2,
        question: "How do I upload images for my hatchery?",
        answer: "In the 'My Hatcheries' section, find your hatchery card and click on any of the 4 image slots. You can upload images in JPG, PNG, or JPEG format. Each hatchery supports up to 4 images."
      },
      {
        id: 3,
        question: "What do the different batch statuses mean?",
        answer: "'Completed' means the batch has finished its cycle. 'Pending' means awaiting admin approval. 'Approved' means admin has verified your batch. 'Rejected' means the batch needs revision."
      },
      {
        id: 4,
        question: "How can I view my reports?",
        answer: "Navigate to the 'Reports' section from the sidebar. You'll see summary cards, growth charts, and detailed batch-wise reports. You can filter by status and date range, and export reports as PDF or Excel."
      },
      {
        id: 5,
        question: "How do I change my phone number?",
        answer: "Go to 'Settings' > 'Account Security' > 'Update Phone Number'. Enter your new phone number, verify with OTP, and save the changes."
      },
      {
        id: 6,
        question: "Can I download my data?",
        answer: "Yes! Go to 'Settings' > 'Storage & Data' > 'Download Your Data'. This will generate and download all your hatchery data including reports and images."
      }
    ];

    const policies = [
      {
        id: 1,
        title: "Privacy Policy",
        icon: <FiShield />,
        content: `Last updated: October 2025

1. Information Collection
We collect information you provide directly to us, including your phone number, hatchery details, and uploaded images.

2. Use of Information
Your information is used to:
- Manage your hatchery operations
- Generate reports and analytics
- Provide customer support
- Improve our services

3. Data Security
We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.

4. Data Sharing
We do not sell or share your personal information with third parties except as required by law or with your explicit consent.

5. Your Rights
You have the right to access, update, or delete your personal information at any time through your account settings.`
      },
      {
        id: 2,
        title: "Terms of Service",
        icon: <FiBook />,
        content: `Last updated: October 2025

1. Acceptance of Terms
By accessing Lords Aqua Hatcheries platform, you agree to these Terms of Service.

2. User Responsibilities
- Provide accurate information
- Maintain confidentiality of your account
- Upload only authentic hatchery images
- Comply with local aquaculture regulations

3. Service Usage
- Use the platform for legitimate hatchery management only
- Do not misuse or attempt to breach security
- Report any issues or bugs to admin support

4. Image Upload Guidelines
- Upload clear, relevant hatchery images
- Images must be from your own hatcheries
- Maximum 4 images per hatchery
- Supported formats: JPG, PNG, JPEG

5. Account Termination
We reserve the right to suspend or terminate accounts that violate these terms.

6. Limitation of Liability
Lords Aqua Hatcheries is not liable for any indirect or consequential damages arising from platform use.`
      },
      {
        id: 3,
        title: "Data Usage Policy",
        icon: <FiDatabase />,
        content: `Last updated: October 2025

1. Data Collection
We collect:
- Phone number for authentication
- Hatchery details (name, dates, location)
- Uploaded images
- Report data and analytics

2. Data Storage
- All data is stored securely on encrypted servers
- Images are stored with restricted access
- Backup performed regularly

3. Data Retention
- Active account data is retained indefinitely
- Deleted data is removed within 30 days
- You can request data deletion at any time

4. Data Export
- You can download all your data anytime
- Exported data includes hatcheries, reports, and images
- Data is provided in standard formats (PDF, Excel)

5. Analytics
We use anonymized data to improve our services and generate insights without identifying individual users.`
      }
    ];

    const handleContactSubmit = () => {
      if (!contactForm.subject || !contactForm.message) {
        alert("Please fill in all fields!");
        return;
      }
      alert("Your message has been sent to admin support. We'll respond within 24 hours.");
      setShowContactModal(false);
      setContactForm({ subject: "", message: "" });
    };

    return (
      <div className="help-section">
        <h2 className="section-title">Help & Support</h2>
        <p className="section-subtitle">Get assistance and learn more about our platform</p>

        {/* FAQ Section */}
        <div className="help-category">
          <div className="category-header">
            <FiHelpCircle className="category-icon" />
            <h3 className="category-title">Frequently Asked Questions</h3>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${expandedFaq === faq.id ? "active" : ""}`}
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <FiChevronRight className={`faq-icon ${expandedFaq === faq.id ? "rotated" : ""}`} />
                </button>
                {expandedFaq === faq.id && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="help-category">
          <div className="category-header">
            <FiMessageCircle className="category-icon" />
            <h3 className="category-title">Contact Admin Support</h3>
          </div>

          <div className="help-card">
            <div className="contact-info">
              <p className="contact-description">
                Need help? Our admin support team is here to assist you with any questions or issues.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <FiMail className="contact-icon" />
                  <div>
                    <div className="contact-label">Email</div>
                    <div className="contact-value">support@lordsaqua.com</div>
                  </div>
                </div>
                <div className="contact-item">
                  <FiPhone className="contact-icon" />
                  <div>
                    <div className="contact-label">Phone</div>
                    <div className="contact-value">+91 98765 43210</div>
                  </div>
                </div>
                <div className="contact-item">
                  <FiClock className="contact-icon" />
                  <div>
                    <div className="contact-label">Support Hours</div>
                    <div className="contact-value">Mon - Sat: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
              <button className="btn-primary" onClick={() => setShowContactModal(true)}>
                <FiSend /> Send Message to Admin
              </button>
            </div>
          </div>
        </div>

        {/* Policies Section */}
        <div className="help-category">
          <div className="category-header">
            <FiBook className="category-icon" />
            <h3 className="category-title">Policies</h3>
          </div>

          <div className="policies-grid">
            {policies.map((policy) => (
              <div key={policy.id} className="policy-card" onClick={() => setSelectedPolicy(policy)}>
                <div className="policy-icon">{policy.icon}</div>
                <h4 className="policy-title">{policy.title}</h4>
                <p className="policy-description">Click to read more</p>
                <FiChevronRight className="policy-arrow" />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Modal */}
        {showContactModal && (
          <div className="modal-overlay" onClick={() => setShowContactModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Contact Admin Support</h3>
                <button className="modal-close" onClick={() => setShowContactModal(false)}>
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="What do you need help with?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    rows="6"
                    placeholder="Describe your issue or question in detail..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn-secondary" onClick={() => setShowContactModal(false)}>
                    Cancel
                  </button>
                  <button className="btn-primary" onClick={handleContactSubmit}>
                    <FiSend /> Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Policy Modal */}
        {selectedPolicy && (
          <div className="modal-overlay" onClick={() => setSelectedPolicy(null)}>
            <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{selectedPolicy.title}</h3>
                <button className="modal-close" onClick={() => setSelectedPolicy(null)}>
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="policy-content">
                  <pre>{selectedPolicy.content}</pre>
                </div>
                <div className="form-actions">
                  <button className="btn-primary" onClick={() => setSelectedPolicy(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <img src="/logo.png" alt="Logo" className="header-logo" />
          <h1 className="header-title">Lords Aqua Hatcheries</h1>
        </div>

        <div className="header-right">
          {/* Notifications */}
          <div className="notifications-dropdown-container">
            <button
              className="header-icon-btn"
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
                  <div className="dropdown-header-text">
                    <h3>Notifications</h3>
                    <span className="notif-count">{unreadNotifications} new</span>
                  </div>
                  <div className="notifications-list-dropdown">
                    {notifications.slice(0, 3).map(notif => (
                      <div key={notif.id} className="notification-item-dropdown">
                        <div className={`notif-icon ${notif.type}`}>
                          {notif.type === "success" && <FiCheckCircle />}
                          {notif.type === "warning" && <FiClock />}
                          {notif.type === "info" && <FiBell />}
                        </div>
                        <div className="notif-content-dropdown">
                          <p>{notif.message}</p>
                          <span>{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="view-all-btn" onClick={() => handleNavigation("notifications")}>
                    View All
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="profile-dropdown-container">
            <button
              className="profile-btn"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="profile-avatar">
                {userProfile.displayImage ? (
                  <img src={userProfile.displayImage} alt="Profile" />
                ) : (
                  <FiUser />
                )}
              </div>
              <span className="profile-name">{userProfile.firstName} {userProfile.lastName}</span>
              <FiChevronDown />
            </button>

            {profileDropdownOpen && (
              <>
                <div className="dropdown-overlay" onClick={() => setProfileDropdownOpen(false)} />
                <div className="profile-dropdown">
                  <div className="profile-dropdown-header">
                    <div className="profile-dropdown-avatar">
                      {userProfile.displayImage ? (
                        <img src={userProfile.displayImage} alt="Profile" />
                      ) : (
                        <FiUser />
                      )}
                    </div>
                    <div className="profile-dropdown-info">
                      <div className="profile-dropdown-name">{userProfile.firstName} {userProfile.lastName}</div>
                      <div className="profile-dropdown-email">{userProfile.email}</div>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={openProfileModal}
                  >
                    <FiEdit3 /> Edit Profile
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigation("settings")}>
                    <FiSettings /> Settings
                  </button>
                  <button className="dropdown-item" onClick={() => handleNavigation("help")}>
                    <FiHelpCircle /> Help & Support
                  </button>
                  <div className="dropdown-divider" />
                  <button className="dropdown-item logout" onClick={handleLogout}>
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
          {sidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}
          <nav className="sidebar-nav">
            <button
              className={`sidebar-item ${activeSection === "overview" ? "active" : ""}`}
              onClick={() => handleNavigation("overview")}
            >
              <FiHome /> Overview
            </button>
            <button
              className={`sidebar-item ${activeSection === "hatcheries" ? "active" : ""}`}
              onClick={() => handleNavigation("hatcheries")}
            >
              <FiGrid /> My Hatcheries
            </button>
            <button
              className={`sidebar-item ${activeSection === "notifications" ? "active" : ""}`}
              onClick={() => handleNavigation("notifications")}
            >
              <FiBell /> Notifications
              {unreadNotifications > 0 && (
                <span className="sidebar-badge">{unreadNotifications}</span>
              )}
            </button>
            <button
              className={`sidebar-item ${activeSection === "reports" ? "active" : ""}`}
              onClick={() => handleNavigation("reports")}
            >
              <FiFileText /> Reports
            </button>
            <button
              className={`sidebar-item ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => handleNavigation("settings")}
            >
              <FiSettings /> Settings
            </button>
            <button
              className={`sidebar-item ${activeSection === "help" ? "active" : ""}`}
              onClick={() => handleNavigation("help")}
            >
              <FiHelpCircle /> Help
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {activeSection === "overview" && renderOverview()}
          {activeSection === "hatcheries" && renderMyHatcheries()}
          {activeSection === "notifications" && renderNotifications()}
          {activeSection === "reports" && renderReports()}
          {activeSection === "settings" && renderSettings()}
          {activeSection === "help" && renderHelp()}
        </main>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Profile</h3>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}>
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              {/* Profile Picture */}
              <div className="profile-picture-section">
                <div className="profile-picture-container">
                  <div className="profile-picture-large">
                    {profileEditData.displayImage ? (
                      <img src={profileEditData.displayImage} alt="Profile" />
                    ) : (
                      <FiUser />
                    )}
                  </div>
                  <label className="profile-picture-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      style={{ display: 'none' }}
                    />
                    <FiCamera />
                    <span>Change Photo</span>
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="profile-edit-section">
                <h4 className="profile-section-title">
                  <FiUser /> Basic Information
                </h4>
                <div className="profile-form-grid">
                  <div className="form-group">
                    <label>First Name <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter first name"
                      value={profileEditData.firstName}
                      onChange={(e) => setProfileEditData({ ...profileEditData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input
                      type="text"
                      placeholder="Enter last name"
                      value={profileEditData.lastName}
                      onChange={(e) => setProfileEditData({ ...profileEditData, lastName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="profile-edit-section">
                <h4 className="profile-section-title">
                  <FiMail /> Contact Information
                </h4>
                <div className="profile-form-grid">
                  <div className="form-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      placeholder="Enter email address"
                      value={profileEditData.email}
                      onChange={(e) => setProfileEditData({ ...profileEditData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <div className="input-with-action">
                      <input
                        type="tel"
                        value={profileEditData.phone}
                        disabled
                        style={{ cursor: 'not-allowed', background: '#f5f5f5' }}
                      />
                      <button
                        className="btn-link-inline"
                        onClick={handleMobileRedirect}
                        type="button"
                      >
                        <FiSettings /> Change in Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="profile-edit-section">
                <h4 className="profile-section-title">
                  <FiMapPin /> Address
                </h4>
                <div className="profile-form-grid">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      placeholder="Enter country"
                      value={profileEditData.country}
                      onChange={(e) => setProfileEditData({ ...profileEditData, country: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      value={profileEditData.state}
                      onChange={(e) => setProfileEditData({ ...profileEditData, state: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Region</label>
                    <input
                      type="text"
                      placeholder="Enter region"
                      value={profileEditData.region}
                      onChange={(e) => setProfileEditData({ ...profileEditData, region: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Pincode</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit pincode"
                      value={profileEditData.pincode}
                      maxLength="6"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setProfileEditData({ ...profileEditData, pincode: value });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Hatchery Information */}
              <div className="profile-edit-section">
                <h4 className="profile-section-title">
                  <FiHome /> Hatchery Information
                </h4>
                <div className="form-group">
                  <label>Hatchery Name</label>
                  <input
                    type="text"
                    placeholder="Enter hatchery name"
                    value={profileEditData.hatcheryName}
                    onChange={(e) => setProfileEditData({ ...profileEditData, hatcheryName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setShowProfileModal(false)}>
                  Cancel
                </button>
                <button className="btn-primary" onClick={handleProfileSave}>
                  <FiSave /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
