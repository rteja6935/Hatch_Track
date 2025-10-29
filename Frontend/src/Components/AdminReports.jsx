import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiDownload, FiFilter, FiCalendar, FiMapPin, FiTrendingUp,
  FiUsers, FiCheckCircle, FiXCircle, FiAlertTriangle, FiFileText,
  FiBarChart2, FiPieChart, FiActivity, FiSettings, FiX
} from 'react-icons/fi';
import '../CSS/AdminReports.css';

const AdminReports = () => {
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState(null);
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    region: 'all',
    seedType: 'all',
    reviewer: 'all'
  });

  const reportTypes = [
    {
      id: 'daily-uploads',
      title: 'Daily Uploads',
      icon: <FiActivity />,
      description: 'Number of uploads per day filtered by region/seed',
      color: '#3b82f6'
    },
    {
      id: 'approval-rates',
      title: 'Approval Rates',
      icon: <FiPieChart />,
      description: 'Accepted vs declined by region, reviewer, seed type',
      color: '#22c55e'
    },
    {
      id: 'top-sellers',
      title: 'Top Sellers',
      icon: <FiTrendingUp />,
      description: 'Ranked by uploads or acceptance rate',
      color: '#f59e0b'
    },
    {
      id: 'missing-uploads',
      title: 'Missing Uploads',
      icon: <FiAlertTriangle />,
      description: 'Sellers who skipped day(s) in their 40-day cycle',
      color: '#ef4444'
    },
    {
      id: 'image-quality',
      title: 'Image Quality Issues',
      icon: <FiXCircle />,
      description: 'Most common decline reasons and quality metrics',
      color: '#8b5cf6'
    },
    {
      id: 'custom-report',
      title: 'Custom Report',
      icon: <FiSettings />,
      description: 'Choose columns & filters, export as CSV/XLSX/PDF',
      color: '#5B7C99'
    }
  ];

  // Sample data for demonstration
  const dailyUploadsData = [
    { date: '2025-10-25', uploads: 45, region: 'Mumbai', seedType: 'Prawn' },
    { date: '2025-10-26', uploads: 52, region: 'Chennai', seedType: 'Fish' },
    { date: '2025-10-27', uploads: 38, region: 'Kolkata', seedType: 'Prawn' },
    { date: '2025-10-28', uploads: 61, region: 'Hyderabad', seedType: 'Crab' },
    { date: '2025-10-29', uploads: 47, region: 'Bangalore', seedType: 'Fish' }
  ];

  const approvalRatesData = [
    { region: 'Mumbai', approved: 85, declined: 15, total: 120 },
    { region: 'Chennai', approved: 92, declined: 8, total: 98 },
    { region: 'Kolkata', approved: 78, declined: 22, total: 156 },
    { region: 'Hyderabad', approved: 88, declined: 12, total: 134 },
    { region: 'Bangalore', approved: 81, declined: 19, total: 112 }
  ];

  const topSellersData = [
    { name: 'Ramesh Kumar', uploads: 156, acceptance: 94, region: 'Mumbai' },
    { name: 'Suresh Patel', uploads: 142, acceptance: 97, region: 'Chennai' },
    { name: 'Vijay Singh', uploads: 138, acceptance: 89, region: 'Kolkata' },
    { name: 'Anita Deshmukh', uploads: 125, acceptance: 92, region: 'Hyderabad' },
    { name: 'Rajesh Naik', uploads: 118, acceptance: 88, region: 'Bangalore' }
  ];

  const missingUploadsData = [
    { name: 'Prakash Rao', phone: '+91 9876543210', missedDays: [12, 15, 18], cycle: 40 },
    { name: 'Lakshmi Reddy', phone: '+91 9123456789', missedDays: [8, 22], cycle: 40 },
    { name: 'Kumar Swamy', phone: '+91 9988776655', missedDays: [35], cycle: 40 }
  ];

  const imageQualityData = [
    { reason: 'Poor lighting', count: 45, percentage: 32 },
    { reason: 'Out of focus', count: 38, percentage: 27 },
    { reason: 'Wrong angle', count: 28, percentage: 20 },
    { reason: 'Incomplete view', count: 19, percentage: 14 },
    { reason: 'Date mismatch', count: 10, percentage: 7 }
  ];

  const handleExport = (format) => {
    console.log(`Exporting ${activeReport} as ${format}`);
    // Implement export logic
  };

  const renderReportContent = () => {
    switch (activeReport) {
      case 'daily-uploads':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Daily Uploads Report</h2>
              <div className="export-buttons">
                <button onClick={() => handleExport('csv')}><FiDownload /> CSV</button>
                <button onClick={() => handleExport('xlsx')}><FiDownload /> Excel</button>
                <button onClick={() => handleExport('pdf')}><FiDownload /> PDF</button>
              </div>
            </div>

            <div className="report-filters">
              <div className="filter-group">
                <FiCalendar />
                <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({...filters, dateFrom: e.target.value})} />
                <span>to</span>
                <input type="date" value={filters.dateTo} onChange={(e) => setFilters({...filters, dateTo: e.target.value})} />
              </div>
              <select value={filters.region} onChange={(e) => setFilters({...filters, region: e.target.value})}>
                <option value="all">All Regions</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Chennai">Chennai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
              <select value={filters.seedType} onChange={(e) => setFilters({...filters, seedType: e.target.value})}>
                <option value="all">All Seed Types</option>
                <option value="Prawn">Prawn</option>
                <option value="Fish">Fish</option>
                <option value="Crab">Crab</option>
              </select>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Uploads</th>
                  <th>Region</th>
                  <th>Seed Type</th>
                </tr>
              </thead>
              <tbody>
                {dailyUploadsData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.date}</td>
                    <td><span className="badge uploads">{row.uploads}</span></td>
                    <td>{row.region}</td>
                    <td>{row.seedType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'approval-rates':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Approval Rates Report</h2>
              <div className="export-buttons">
                <button onClick={() => handleExport('csv')}><FiDownload /> CSV</button>
                <button onClick={() => handleExport('xlsx')}><FiDownload /> Excel</button>
                <button onClick={() => handleExport('pdf')}><FiDownload /> PDF</button>
              </div>
            </div>

            <div className="stats-summary">
              <div className="stat-card">
                <div className="stat-icon approved"><FiCheckCircle /></div>
                <div className="stat-info">
                  <span className="stat-value">84.8%</span>
                  <span className="stat-label">Overall Approval Rate</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon declined"><FiXCircle /></div>
                <div className="stat-info">
                  <span className="stat-value">15.2%</span>
                  <span className="stat-label">Decline Rate</span>
                </div>
              </div>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Total</th>
                  <th>Approved</th>
                  <th>Declined</th>
                  <th>Approval Rate</th>
                </tr>
              </thead>
              <tbody>
                {approvalRatesData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.region}</td>
                    <td>{row.total}</td>
                    <td><span className="badge approved">{row.approved}</span></td>
                    <td><span className="badge declined">{row.declined}</span></td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{width: `${(row.approved/row.total)*100}%`}}></div>
                        <span>{Math.round((row.approved/row.total)*100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'top-sellers':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Top Sellers Report</h2>
              <div className="export-buttons">
                <button onClick={() => handleExport('csv')}><FiDownload /> CSV</button>
                <button onClick={() => handleExport('xlsx')}><FiDownload /> Excel</button>
                <button onClick={() => handleExport('pdf')}><FiDownload /> PDF</button>
              </div>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Seller Name</th>
                  <th>Region</th>
                  <th>Total Uploads</th>
                  <th>Acceptance Rate</th>
                </tr>
              </thead>
              <tbody>
                {topSellersData.map((seller, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`rank-badge rank-${idx + 1}`}>#{idx + 1}</span>
                    </td>
                    <td><strong>{seller.name}</strong></td>
                    <td>{seller.region}</td>
                    <td><span className="badge uploads">{seller.uploads}</span></td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill success" style={{width: `${seller.acceptance}%`}}></div>
                        <span>{seller.acceptance}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'missing-uploads':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Missing Uploads Report</h2>
              <div className="export-buttons">
                <button onClick={() => handleExport('csv')}><FiDownload /> CSV</button>
                <button onClick={() => handleExport('xlsx')}><FiDownload /> Excel</button>
                <button onClick={() => handleExport('pdf')}><FiDownload /> PDF</button>
              </div>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Seller Name</th>
                  <th>Phone</th>
                  <th>Missed Days</th>
                  <th>Cycle Progress</th>
                </tr>
              </thead>
              <tbody>
                {missingUploadsData.map((seller, idx) => (
                  <tr key={idx}>
                    <td><strong>{seller.name}</strong></td>
                    <td>{seller.phone}</td>
                    <td>
                      <div className="missed-days">
                        {seller.missedDays.map(day => (
                          <span key={day} className="day-badge">Day {day}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className="cycle-info">{seller.cycle - seller.missedDays.length} / {seller.cycle}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'image-quality':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Image Quality Issues Report</h2>
              <div className="export-buttons">
                <button onClick={() => handleExport('csv')}><FiDownload /> CSV</button>
                <button onClick={() => handleExport('xlsx')}><FiDownload /> Excel</button>
                <button onClick={() => handleExport('pdf')}><FiDownload /> PDF</button>
              </div>
            </div>

            <table className="report-table">
              <thead>
                <tr>
                  <th>Decline Reason</th>
                  <th>Count</th>
                  <th>Percentage</th>
                  <th>Distribution</th>
                </tr>
              </thead>
              <tbody>
                {imageQualityData.map((item, idx) => (
                  <tr key={idx}>
                    <td><strong>{item.reason}</strong></td>
                    <td><span className="badge declined">{item.count}</span></td>
                    <td>{item.percentage}%</td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill danger" style={{width: `${item.percentage}%`}}></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'custom-report':
        return (
          <div className="report-content">
            <div className="report-header">
              <h2>Custom Report Builder</h2>
            </div>

            <div className="custom-report-builder">
              <div className="builder-section">
                <h3>Select Columns</h3>
                <div className="checkbox-grid">
                  {['Seller Name', 'Phone Number', 'Region', 'Upload Date', 'Seed Type', 'Status', 'Reviewer', 'Comments'].map(col => (
                    <label key={col} className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>{col}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="builder-section">
                <h3>Apply Filters</h3>
                <div className="custom-filters">
                  <div className="filter-row">
                    <select>
                      <option>Date Range</option>
                      <option>Region</option>
                      <option>Seed Type</option>
                      <option>Status</option>
                    </select>
                    <select>
                      <option>equals</option>
                      <option>not equals</option>
                      <option>contains</option>
                    </select>
                    <input type="text" placeholder="Value" />
                    <button className="btn-remove">Remove</button>
                  </div>
                  <button className="btn-add-filter">+ Add Filter</button>
                </div>
              </div>

              <div className="builder-actions">
                <button className="btn-preview"><FiBarChart2 /> Preview</button>
                <button className="btn-export" onClick={() => handleExport('csv')}><FiDownload /> Export CSV</button>
                <button className="btn-export" onClick={() => handleExport('xlsx')}><FiDownload /> Export Excel</button>
                <button className="btn-export" onClick={() => handleExport('pdf')}><FiDownload /> Export PDF</button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-reports-page">
      <div className="reports-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FiX />
          </button>
          <div>
            <h1>Reports & Analytics</h1>
            <p>Generate comprehensive reports and export data</p>
          </div>
        </div>
      </div>

      <div className="reports-container">
        {!activeReport ? (
          <div className="report-types-grid">
            {reportTypes.map(report => (
              <div
                key={report.id}
                className="report-type-card"
                onClick={() => setActiveReport(report.id)}
                style={{ '--card-color': report.color }}
              >
                <div className="report-icon" style={{ color: report.color }}>
                  {report.icon}
                </div>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <button className="view-report-btn">View Report →</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="report-viewer">
            <button className="back-to-types" onClick={() => setActiveReport(null)}>
              ← Back to Report Types
            </button>
            {renderReportContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;
