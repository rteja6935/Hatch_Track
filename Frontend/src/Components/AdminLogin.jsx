import React, { useState } from "react";
import "../CSS/SharedAuth.css";
import { useNavigate, Link } from "react-router-dom";
import { FiMoon, FiSun, FiArrowLeft, FiUser, FiMail, FiLock } from "react-icons/fi";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("lords-aqua-theme") || "light";
    } catch {
      return "light";
    }
  });

  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("auth-dark");
    } else {
      root.classList.add("auth-dark");
    }
    localStorage.setItem("lords-aqua-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add backend authentication logic here
    console.log("Admin Login:", loginData);
    navigate("/admin-dashboard");
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add backend signup logic here
    console.log("Admin Signup:", signupData);
    alert(`Account created for ${signupData.name}`);
    setIsLogin(true);
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
          <h1>Lords Aqua Hatcheries</h1>
          <h3>Admin Portal</h3>
          <p>
            Manage your aquaculture operations with powerful admin tools. Monitor hatcheries,
            approve submissions, and provide expert feedback to users.
          </p>
        </div>
      </div>

      {/* Right Side - Login/Signup Form */}
      <div className="auth-right">
        <div className="auth-box">
          {isLogin ? (
            <>
              <h2>Admin Login</h2>
              <p className="auth-subtext">
                Access your administrative dashboard
              </p>

              <form onSubmit={handleLoginSubmit}>
                <div className="auth-input-group">
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={loginData.username}
                      onChange={handleLoginChange}
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
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={loginData.password}
                      onChange={handleLoginChange}
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
                </div>

                <button type="submit" className="auth-btn" style={{ marginTop: "0.5rem" }}>
                  Login to Dashboard
                </button>
              </form>

              <p className="switch-text">
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Create Admin Account</span>
              </p>
            </>
          ) : (
            <>
              <h2>Admin Signup</h2>
              <p className="auth-subtext">
                Create your administrator account
              </p>

              <form onSubmit={handleSignupSubmit}>
                <div className="auth-input-group">
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={signupData.name}
                      onChange={handleSignupChange}
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
                      name="email"
                      placeholder="Email Address"
                      value={signupData.email}
                      onChange={handleSignupChange}
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
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={signupData.password}
                      onChange={handleSignupChange}
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
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
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
                </div>

                <button type="submit" className="auth-btn" style={{ marginTop: "0.5rem" }}>
                  Create Account
                </button>
              </form>

              <p className="switch-text">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login here</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
