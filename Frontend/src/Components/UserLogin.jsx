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

  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const otp = generateOtp();
    localStorage.setItem("otp", otp);
    console.log("Generated OTP:", otp);
    setOtpSent(true);
    setCountdown(30);
    alert(`OTP sent to your mobile number! [Demo OTP: ${otp}]`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const storedOtp = localStorage.getItem("otp");
    if (enteredOtp === storedOtp) {
      localStorage.removeItem("otp");
      // Save phone number for dashboard to use
      localStorage.setItem("userPhoneNumber", phoneNumber);
      navigate("/user-dashboard");
      resetForm();
    } else {
      alert("Invalid OTP! Please try again.");
    }
  };

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      alert("Please enter mobile number and password");
      return;
    }
    // Save phone number for dashboard to use
    localStorage.setItem("userPhoneNumber", phoneNumber);
    navigate("/user-dashboard");
    resetForm();
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
                      <input
                        type="tel"
                        placeholder="Enter Mobile Number"
                        maxLength="10"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        style={{ paddingLeft: "2.75rem" }}
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
                      disabled={!phoneNumber || phoneNumber.length < 10}
                      style={{ marginTop: "0.5rem" }}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <button
                      className="send-btn"
                      onClick={handleSendOtp}
                      disabled={countdown > 0}
                      style={{ marginTop: "0.5rem" }}
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
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
                      />
                      <button type="submit" className="verify-btn">
                        Verify OTP & Login
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <form onSubmit={handlePasswordLogin} className="password-login">
                  <div style={{ position: "relative" }}>
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
                      maxLength="10"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      style={{ paddingLeft: "2.75rem" }}
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

                  <div style={{ position: "relative" }}>
                    <input
                      type="password"
                      placeholder="Enter Password"
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

                  <button type="submit" className="verify-btn">
                    Login to Dashboard
                  </button>
                </form>
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
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    placeholder="Full Name"
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

                <div style={{ position: "relative" }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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

                <div style={{ position: "relative" }}>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    style={{ paddingLeft: "2.75rem" }}
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
                  disabled={!phoneNumber || phoneNumber.length < 10}
                  style={{ marginTop: "0.5rem" }}
                >
                  Send OTP
                </button>
              ) : (
                <button
                  className="send-btn"
                  onClick={handleSendOtp}
                  disabled={countdown > 0}
                  style={{ marginTop: "0.5rem" }}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
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
                  />
                  <button type="submit" className="verify-btn">
                    Verify & Create Account
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
