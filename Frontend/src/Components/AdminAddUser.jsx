import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUser, FiPhone, FiMail, FiMapPin, FiGlobe, FiShield, FiSend,
  FiSave, FiX, FiAlertCircle, FiCheckCircle, FiCalendar
} from 'react-icons/fi';
import '../CSS/AdminAddUser.css';

const AdminAddUser = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    countryCode: '+91',
    email: '',
    region: '',
    customRegion: '',
    language: 'English',
    role: 'Seller',
    onboardingMethod: 'sendOTP',
    hatcheryName: '',
    seedType: '',
    startDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Predefined options
  const countryCodes = ['+91', '+1', '+44', '+61', '+81', '+86'];
  const regions = [
    'Mumbai',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Bangalore',
    'Custom...'
  ];
  const languages = ['English', 'हिंदी (Hindi)', 'తెలుగు (Telugu)', 'தமிழ் (Tamil)', 'বাংলা (Bengali)'];
  const roles = ['Seller', 'Support', 'Viewer', 'Admin'];
  const seedTypes = ['Prawn', 'Fish', 'Crab', 'Shrimp', 'Mixed'];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    // Mobile number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Enter valid 10-digit mobile number';
    }

    // Email validation (optional)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter valid email address';
    }

    // Region validation
    if (!formData.region) {
      newErrors.region = 'Region is required';
    }

    if (formData.region === 'Custom...' && !formData.customRegion.trim()) {
      newErrors.customRegion = 'Please specify custom region';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (action) => {
    if (!validateForm()) {
      return;
    }

    const userData = {
      ...formData,
      finalRegion: formData.region === 'Custom...' ? formData.customRegion : formData.region,
      fullMobileNumber: `${formData.countryCode} ${formData.mobileNumber}`,
      createdAt: new Date().toISOString()
    };

    console.log('Creating user:', userData);
    console.log('Action:', action);

    // Show success message
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (action === 'continue') {
        navigate(`/admin/user/${formData.mobileNumber}`);
      } else {
        // Reset form
        setFormData({
          fullName: '',
          mobileNumber: '',
          countryCode: '+91',
          email: '',
          region: '',
          customRegion: '',
          language: 'English',
          role: 'Seller',
          onboardingMethod: 'sendOTP',
          hatcheryName: '',
          seedType: '',
          startDate: '',
          notes: ''
        });
      }
    }, 2000);
  };

  return (
    <div className="admin-add-user-page">
      <div className="add-user-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/admin-dashboard')}>
            <FiX />
          </button>
          <div>
            <h1>Add New User</h1>
            <p>Create a new seller account with optional hatchery setup</p>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="success-banner">
          <FiCheckCircle />
          <span>User created successfully! {formData.onboardingMethod === 'sendOTP' && 'OTP invite sent.'}</span>
        </div>
      )}

      <div className="add-user-container">
        <form className="add-user-form">
          {/* Basic Information Section */}
          <section className="form-section">
            <h2>Basic Information</h2>
            <div className="form-grid">
              <div className="form-field full-width">
                <label>
                  <FiUser />
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.fullName}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label>
                  <FiPhone />
                  Country Code <span className="required">*</span>
                </label>
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                >
                  {countryCodes.map(code => (
                    <option key={code} value={code}>{code}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>
                  <FiPhone />
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  maxLength="10"
                  className={errors.mobileNumber ? 'error' : ''}
                />
                {errors.mobileNumber && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.mobileNumber}
                  </span>
                )}
              </div>

              <div className="form-field full-width">
                <label>
                  <FiMail />
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.email}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label>
                  <FiMapPin />
                  Region / Village <span className="required">*</span>
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className={errors.region ? 'error' : ''}
                >
                  <option value="">Select region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && (
                  <span className="error-message">
                    <FiAlertCircle /> {errors.region}
                  </span>
                )}
              </div>

              {formData.region === 'Custom...' && (
                <div className="form-field">
                  <label>Custom Region</label>
                  <input
                    type="text"
                    name="customRegion"
                    value={formData.customRegion}
                    onChange={handleChange}
                    placeholder="Enter region name"
                    className={errors.customRegion ? 'error' : ''}
                  />
                  {errors.customRegion && (
                    <span className="error-message">
                      <FiAlertCircle /> {errors.customRegion}
                    </span>
                  )}
                </div>
              )}

              <div className="form-field">
                <label>
                  <FiGlobe />
                  Default Language
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>
                  <FiShield />
                  Role (RBAC)
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Onboarding Method Section */}
          <section className="form-section">
            <h2>Initial Onboarding Method</h2>
            <div className="radio-group">
              <label className="radio-option">
                <input
                  type="radio"
                  name="onboardingMethod"
                  value="sendOTP"
                  checked={formData.onboardingMethod === 'sendOTP'}
                  onChange={handleChange}
                />
                <div className="radio-content">
                  <FiSend />
                  <div>
                    <strong>Send OTP Invite</strong>
                    <span>(Recommended) - Sends SMS with OTP to activate account</span>
                  </div>
                </div>
              </label>

              <label className="radio-option">
                <input
                  type="radio"
                  name="onboardingMethod"
                  value="createWithout"
                  checked={formData.onboardingMethod === 'createWithout'}
                  onChange={handleChange}
                />
                <div className="radio-content">
                  <FiSave />
                  <div>
                    <strong>Create Without Invite</strong>
                    <span>Creates account - seller must login by OTP later</span>
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Optional Hatchery Setup */}
          <section className="form-section">
            <h2>Optional: Default Hatchery (Quick Create)</h2>
            <div className="form-grid">
              <div className="form-field">
                <label>Hatchery Name</label>
                <input
                  type="text"
                  name="hatcheryName"
                  value={formData.hatcheryName}
                  onChange={handleChange}
                  placeholder="e.g., Krishna Prawn Farm"
                />
              </div>

              <div className="form-field">
                <label>Seed Type</label>
                <select
                  name="seedType"
                  value={formData.seedType}
                  onChange={handleChange}
                >
                  <option value="">Select seed type</option>
                  {seedTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>
                  <FiCalendar />
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Notes Section */}
          <section className="form-section">
            <h2>Notes / Admin Comment</h2>
            <div className="form-field full-width">
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add any notes or comments about this user..."
                rows={4}
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/admin-dashboard')}
            >
              <FiX />
              Cancel
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={() => handleSubmit('continue')}
            >
              <FiSave />
              Create & Continue
            </button>

            <button
              type="button"
              className="btn-success"
              onClick={() => handleSubmit('sendOTP')}
            >
              <FiSend />
              {formData.onboardingMethod === 'sendOTP' ? 'Create & Send OTP' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAddUser;
