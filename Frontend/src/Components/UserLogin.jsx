import React, { useState, useEffect } from "react";
import "../CSS/SharedAuth.css";
import { useNavigate, Link } from "react-router-dom";
import { FiMoon, FiSun, FiArrowLeft, FiUser, FiMail, FiLock, FiSmartphone } from "react-icons/fi";

const UserLogin = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [loginMethod, setLoginMethod] = useState("otp");

  // Password management states
  const [hasPassword, setHasPassword] = useState(null); // null = not checked, true/false = result
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotPasswordOtpSent, setForgotPasswordOtpSent] = useState(false);

  // Loading states
  const [isLoadingSendOtp, setIsLoadingSendOtp] = useState(false);
  const [isLoadingVerifyOtp, setIsLoadingVerifyOtp] = useState(false);
  const [isLoadingPasswordLogin, setIsLoadingPasswordLogin] = useState(false);
  const [isLoadingCreatePassword, setIsLoadingCreatePassword] = useState(false);
  const [isLoadingForgotPassword, setIsLoadingForgotPassword] = useState(false);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("lords-aqua-theme") || "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("auth-dark");
    } else {
      root.classList.add("auth-dark");
    }
    localStorage.setItem("lords-aqua-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Countdown effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const handleSendOtp = async () => {
    // Validation for signup
    if (isSignUp) {
      if (!name.trim()) {
        alert("Please enter your full name");
        return;
      }
      if (phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit mobile number");
        return;
      }
    } else {
      // Validation for login
      if (phoneNumber.length !== 10) {
        alert("Please enter a valid 10-digit mobile number");
        return;
      }
    }

    setIsLoadingSendOtp(true);

    try {
      // Add +91 country code to phone number
      const phoneNumberWithCode = `+91${phoneNumber}`;

      // Call backend API based on signup or login
      const endpoint = isSignUp
        ? 'http://localhost:3000/api/Auth/User-signup-otpGen'
        : 'http://localhost:3000/api/Auth/User-login-otpGen';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumberWithCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setCountdown(30);
        alert(data.message || 'OTP sent successfully to your mobile number!');
      } else {
        // Handle specific error cases
        if (data.notRegistered) {
          alert(data.message || 'This mobile number is not registered. Please sign up first.');
        } else if (data.pendingApproval) {
          // Navigate to pending approval page
          navigate("/pending-approval");
        } else {
          alert(data.message || 'Failed to send OTP. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please check your connection and try again.');
    } finally {
      setIsLoadingSendOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoadingVerifyOtp(true);

    try {
      // Add +91 country code to phone number
      const phoneNumberWithCode = `+91${phoneNumber}`;

      // Call backend API based on signup or login
      const endpoint = isSignUp
        ? 'http://localhost:3000/api/Auth/User-signup-otpVerify'
        : 'http://localhost:3000/api/Auth/User-login-otpVerify';

      const requestBody = isSignUp
        ? {
            name,
            email: email || undefined,
            phoneNumber: phoneNumberWithCode,
            password: password || undefined,
            otpCode: enteredOtp,
          }
        : {
            phoneNumber: phoneNumberWithCode,
            otpCode: enteredOtp,
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user data for dashboard (with +91 code)
        localStorage.setItem("userPhoneNumber", phoneNumberWithCode);

        // If signing up, save additional user information
        if (isSignUp) {
          localStorage.setItem("userName", name);
          if (email) localStorage.setItem("userEmail", email);
          if (data.user && data.user._id) {
            localStorage.setItem("userId", data.user._id);
          }
        }

        alert(data.message || 'OTP verified successfully!');
        navigate("/user-dashboard");
        resetForm();
      } else {
        alert(data.message || 'Invalid OTP! Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Failed to verify OTP. Please check your connection and try again.');
    } finally {
      setIsLoadingVerifyOtp(false);
    }
  };

  // Check if user has password when switching to password login
  const checkUserPassword = async () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number first");
      return;
    }

    try {
      const phoneNumberWithCode = `+91${phoneNumber}`;

      const response = await fetch('http://localhost:3000/api/Auth/User-check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumberWithCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setHasPassword(data.hasPassword);
        if (!data.hasPassword) {
          setShowCreatePassword(true);
        }
      } else {
        // Handle specific error cases
        if (data.notRegistered) {
          alert(data.message || 'This mobile number is not registered. Please sign up first.');
          setLoginMethod("otp"); // Switch back to OTP login
        } else if (data.pendingApproval) {
          // Navigate to pending approval page
          navigate("/pending-approval");
        } else {
          alert(data.message || 'Failed to check password status');
        }
      }
    } catch (error) {
      console.error('Error checking password:', error);
      alert('Failed to check password status. Please try again.');
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      alert("Please enter mobile number and password");
      return;
    }

    setIsLoadingPasswordLogin(true);

    try {
      // Add +91 country code to phone number
      const phoneNumberWithCode = `+91${phoneNumber}`;

      const response = await fetch('http://localhost:3000/api/Auth/User-login-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumberWithCode, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save phone number for dashboard to use (with +91 code)
        localStorage.setItem("userPhoneNumber", phoneNumberWithCode);
        alert(data.message || 'Login successful!');
        navigate("/user-dashboard");
        resetForm();
      } else {
        // Handle specific error cases
        if (data.notRegistered) {
          alert(data.message || 'This mobile number is not registered. Please sign up first.');
        } else if (data.pendingApproval) {
          // Navigate to pending approval page
          navigate("/pending-approval");
        } else {
          alert(data.message || 'Login failed. Please check your credentials.');
        }
      }
    } catch (error) {
      console.error('Error during password login:', error);
      alert('Failed to login. Please check your connection and try again.');
    } finally {
      setIsLoadingPasswordLogin(false);
    }
  };

  const handleCreatePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please enter both password and confirm password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setIsLoadingCreatePassword(true);

    try {
      const phoneNumberWithCode = `+91${phoneNumber}`;

      const response = await fetch('http://localhost:3000/api/Auth/User-create-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumberWithCode,
          password,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || 'Password created successfully!');
        setHasPassword(true);
        setShowCreatePassword(false);
        setPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || 'Failed to create password');
      }
    } catch (error) {
      console.error('Error creating password:', error);
      alert('Failed to create password. Please try again.');
    } finally {
      setIsLoadingCreatePassword(false);
    }
  };

  const handleForgotPasswordSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsLoadingForgotPassword(true);

    try{
      const phoneNumberWithCode = `+91${phoneNumber}`;

      const response = await fetch('http://localhost:3000/api/Auth/User-forgot-password-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: phoneNumberWithCode }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setForgotPasswordOtpSent(true);
        setCountdown(30);
        alert(data.message || 'OTP sent successfully for password reset!');
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending forgot password OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setIsLoadingForgotPassword(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!enteredOtp || !newPassword || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const phoneNumberWithCode = `+91${phoneNumber}`;

      const response = await fetch('http://localhost:3000/api/Auth/User-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumberWithCode,
          otpCode: enteredOtp,
          newPassword,
          confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message || 'Password reset successfully!');
        setShowForgotPassword(false);
        setForgotPasswordOtpSent(false);
        setHasPassword(true);
        setEnteredOtp("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    }
  };

  const resetForm = () => {
    setOtpSent(false);
    setCountdown(0);
    setPhoneNumber("");
    setEnteredOtp("");
    setPassword("");
    if (isSignUp) {
      setName("");
      setEmail("");
      setIsSignUp(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Back to Home Button */}
      <Link to="/" className="auth-back-btn">
        <FiArrowLeft /> Back to Home
      </Link>

      {/* Theme Toggle */}
      <button className="auth-theme-toggle" onClick={toggleTheme}>
        {theme === "dark" ? <FiSun /> : <FiMoon />}
      </button>

      {/* Left Side - Image */}
      <div className="auth-left">
        <div className="auth-left-content">
          <img src="/logo.png" alt="Lords Aqua Hatcheries" className="auth-left-logo" />
          <h1>Welcome Back</h1>
          <h3>Lords Aqua Hatcheries</h3>
          <p>
            Track your fish hatchery operations, monitor daily growth, and get expert feedback
            from our administrators. Join our community of successful aquaculture professionals.
          </p>
        </div>
      </div>

      {/* Right Side - Login/Signup Form */}
      <div className="auth-right">
        <div className="auth-box">
          {!isSignUp ? (
            <>
              <h2>User Login</h2>
              <p className="auth-subtext">
                Choose your preferred login method
              </p>

              {/* Login method toggle */}
              <div className="login-method">
                <label>
                  <input
                    type="radio"
                    name="loginMethod"
                    value="otp"
                    checked={loginMethod === "otp"}
                    onChange={(e) => setLoginMethod(e.target.value)}
                  />
                  Login with OTP
                </label>
                <label>
                  <input
                    type="radio"
                    name="loginMethod"
                    value="password"
                    checked={loginMethod === "password"}
                    onChange={(e) => setLoginMethod(e.target.value)}
                  />
                  Login with Password
                </label>
              </div>

              {loginMethod === "otp" ? (
                <>
                  <div className="auth-input-group">
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "2.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--auth-text)",
                          fontWeight: "500",
                          pointerEvents: "none",
                          zIndex: 1
                        }}
                      >
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ paddingLeft: "5rem" }}
                      />
                      <FiSmartphone
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--auth-text-light)"
                        }}
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      className="send-btn"
                      onClick={handleSendOtp}
                      disabled={!phoneNumber || phoneNumber.length < 10 || isLoadingSendOtp}
                      style={{ marginTop: "0.5rem" }}
                    >
                      {isLoadingSendOtp ? "Sending OTP..." : "Send OTP"}
                    </button>
                  ) : (
                    <button
                      className="send-btn"
                      onClick={handleSendOtp}
                      disabled={countdown > 0 || isLoadingSendOtp}
                      style={{ marginTop: "0.5rem" }}
                    >
                      {isLoadingSendOtp ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                    </button>
                  )}

                  {otpSent && (
                    <form onSubmit={handleVerifyOtp} className="otp-section">
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        maxLength="6"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        required
                        disabled={isLoadingVerifyOtp}
                      />
                      <button type="submit" className="verify-btn" disabled={isLoadingVerifyOtp}>
                        {isLoadingVerifyOtp ? "Verifying..." : "Verify OTP & Login"}
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <>
                  {/* Phone Number Input */}
                  <div className="auth-input-group">
                    <div style={{ position: "relative" }}>
                      <span
                        style={{
                          position: "absolute",
                          left: "2.75rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--auth-text)",
                          fontWeight: "500",
                          pointerEvents: "none",
                          zIndex: 1
                        }}
                      >
                        +91
                      </span>
                      <input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onBlur={checkUserPassword}
                        style={{ paddingLeft: "5rem" }}
                      />
                      <FiSmartphone
                        style={{
                          position: "absolute",
                          left: "1rem",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--auth-text-light)"
                        }}
                      />
                    </div>
                  </div>

                  {/* Show Forgot Password Flow */}
                  {showForgotPassword ? (
                    <>
                      {!forgotPasswordOtpSent ? (
                        <button
                          className="send-btn"
                          onClick={handleForgotPasswordSendOtp}
                          disabled={!phoneNumber || phoneNumber.length < 10 || isLoadingForgotPassword}
                          style={{ marginTop: "0.5rem" }}
                        >
                          {isLoadingForgotPassword ? "Sending OTP..." : "Send OTP for Password Reset"}
                        </button>
                      ) : (
                        <button
                          className="send-btn"
                          onClick={handleForgotPasswordSendOtp}
                          disabled={countdown > 0 || isLoadingForgotPassword}
                          style={{ marginTop: "0.5rem" }}
                        >
                          {isLoadingForgotPassword ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                        </button>
                      )}

                      {forgotPasswordOtpSent && (
                        <form onSubmit={handleResetPassword} className="password-login">
                          <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            maxLength="6"
                            value={enteredOtp}
                            onChange={(e) => setEnteredOtp(e.target.value)}
                            required
                          />

                          <div style={{ position: "relative" }}>
                            <input
                              type="password"
                              placeholder="New Password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              style={{ paddingLeft: "2.75rem" }}
                            />
                            <FiLock
                              style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--auth-text-light)"
                              }}
                            />
                          </div>

                          <div style={{ position: "relative" }}>
                            <input
                              type="password"
                              placeholder="Confirm New Password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              style={{ paddingLeft: "2.75rem" }}
                            />
                            <FiLock
                              style={{
                                position: "absolute",
                                left: "1rem",
                                top: "50%",
                                transform: "translateY(-50%)",
                                color: "var(--auth-text-light)"
                              }}
                            />
                          </div>

                          <button type="submit" className="verify-btn">
                            Reset Password
                          </button>
                        </form>
                      )}

                      <p className="signup-text">
                        Remember your password?{" "}
                        <span className="signup-link" onClick={() => {
                          setShowForgotPassword(false);
                          setForgotPasswordOtpSent(false);
                          setEnteredOtp("");
                          setNewPassword("");
                          setConfirmPassword("");
                        }}>
                          Back to Login
                        </span>
                      </p>
                    </>
                  ) : showCreatePassword ? (
                    /* Show Create Password Form */
                    <form onSubmit={handleCreatePassword} className="password-login">
                      <p style={{ fontSize: "0.9rem", color: "var(--auth-text-light)", marginBottom: "1rem" }}>
                        You haven't set a password yet. Please create one to continue.
                      </p>

                      <div style={{ position: "relative" }}>
                        <input
                          type="password"
                          placeholder="Create Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          style={{ paddingLeft: "2.75rem" }}
                        />
                        <FiLock
                          style={{
                            position: "absolute",
                            left: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--auth-text-light)"
                          }}
                        />
                      </div>

                      <div style={{ position: "relative" }}>
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          style={{ paddingLeft: "2.75rem" }}
                        />
                        <FiLock
                          style={{
                            position: "absolute",
                            left: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--auth-text-light)"
                          }}
                        />
                      </div>

                      <button type="submit" className="verify-btn" disabled={isLoadingCreatePassword}>
                        {isLoadingCreatePassword ? "Creating Password..." : "Create Password & Login"}
                      </button>
                    </form>
                  ) : (
                    /* Show Normal Password Login Form */
                    <form onSubmit={handlePasswordLogin} className="password-login">
                      <div style={{ position: "relative" }}>
                        <input
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoadingPasswordLogin}
                          style={{ paddingLeft: "2.75rem" }}
                        />
                        <FiLock
                          style={{
                            position: "absolute",
                            left: "1rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "var(--auth-text-light)"
                          }}
                        />
                      </div>

                      <button type="submit" className="verify-btn" disabled={isLoadingPasswordLogin}>
                        {isLoadingPasswordLogin ? "Logging in..." : "Login to Dashboard"}
                      </button>

                      <p className="signup-text">
                        <span className="signup-link" onClick={() => setShowForgotPassword(true)}>
                          Forgot Password?
                        </span>
                      </p>
                    </form>
                  )}
                </>
              )}

              <p className="signup-text">
                Don't have an account?{" "}
                <span className="signup-link" onClick={() => setIsSignUp(true)}>
                  Sign up now
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Create Account</h2>
              <p className="auth-subtext">Join Lords Aqua Hatcheries today</p>

              <div className="auth-input-group">
                {/* Full Name - Mandatory */}
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ paddingLeft: "2.75rem" }}
                  />
                  <FiUser
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--auth-text-light)"
                    }}
                  />
                </div>

                {/* Mobile Number - Mandatory */}
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "2.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--auth-text)",
                      fontWeight: "500",
                      pointerEvents: "none",
                      zIndex: 1
                    }}
                  >
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Mobile Number *"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{ paddingLeft: "5rem" }}
                  />
                  <FiSmartphone
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--auth-text-light)"
                    }}
                  />
                </div>

                {/* Email - Optional */}
                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: "2.75rem" }}
                  />
                  <FiMail
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--auth-text-light)"
                    }}
                  />
                </div>

                {/* Password - Optional */}
                <div style={{ position: "relative" }}>
                  <input
                    type="password"
                    placeholder="Password (Optional)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: "2.75rem" }}
                  />
                  <FiLock
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "var(--auth-text-light)"
                    }}
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  className="send-btn"
                  onClick={handleSendOtp}
                  disabled={!name.trim() || !phoneNumber || phoneNumber.length < 10 || isLoadingSendOtp}
                  style={{ marginTop: "0.5rem" }}
                >
                  {isLoadingSendOtp ? "Sending OTP..." : "Send OTP"}
                </button>
              ) : (
                <button
                  className="send-btn"
                  onClick={handleSendOtp}
                  disabled={countdown > 0 || isLoadingSendOtp}
                  style={{ marginTop: "0.5rem" }}
                >
                  {isLoadingSendOtp ? "Sending..." : countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                </button>
              )}

              {otpSent && (
                <form onSubmit={handleVerifyOtp} className="otp-section">
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    required
                    disabled={isLoadingVerifyOtp}
                  />
                  <button type="submit" className="verify-btn" disabled={isLoadingVerifyOtp}>
                    {isLoadingVerifyOtp ? "Verifying..." : "Verify & Create Account"}
                  </button>
                </form>
              )}

              <p className="signup-text">
                Already have an account?{" "}
                <span className="signup-link" onClick={() => setIsSignUp(false)}>
                  Login here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
