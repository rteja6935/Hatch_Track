import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMoon, FiSun, FiArrowLeft, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../CSS/SharedAuth.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("lords-aqua-admin-theme") || "light";
    } catch {
      return "light";
    }
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("auth-dark");
    } else {
      root.classList.add("auth-dark");
    }
    localStorage.setItem("lords-aqua-admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password });
    navigate("/admin-dashboard");
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
          <h3>Administrator Portal</h3>
          <p>
            Manage your aquaculture operations with powerful admin tools. Monitor hatcheries,
            approve submissions, and provide expert feedback to users.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="auth-right">
        <div className="auth-box">
          <h2>Administrator Login</h2>
          <p className="auth-subtext">
            Access your administrative dashboard securely
          </p>

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ paddingLeft: "2.75rem" }}
                />
                <FiUser
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--auth-text-light)",
                    fontSize: "1.2rem"
                  }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingLeft: "2.75rem", paddingRight: "3.5rem" }}
                />
                <FiLock
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--auth-text-light)",
                    fontSize: "1.2rem"
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--auth-primary)",
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    padding: "0.25rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "0.5rem"
            }}>
              <a
                href="#"
                style={{
                  color: "var(--auth-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                onMouseLeave={(e) => e.target.style.textDecoration = "none"}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="auth-btn" style={{ marginTop: "0.5rem" }}>
              Login to Dashboard
            </button>
          </form>

          <p className="switch-text" style={{ marginTop: "1.5rem" }}>
            Need assistance?{" "}
            <span onClick={() => alert("Please contact support at support@lordsaqua.com")}>
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
