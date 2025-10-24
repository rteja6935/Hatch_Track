import React, { useState } from "react";
import "../CSS/AdminLogin.css";
import adminImage from "../Images/LoginImage.jpeg"; // Add your image in /src/assets/

const AdminLogin = () => {
  const [isLogin, setIsLogin] = useState(true); // Conditional rendering toggle
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${loginData.username}`);
    // Add backend authentication logic
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert(`Account created for ${signupData.name}`);
    setIsLogin(true); // Switch to login after signup
    // Add backend signup logic
  };

  return (
    <div className="adminauth-container">
      {/* Left Side - Image */}
      <div className="auth-left">
        <img src={adminImage} alt="Admin Illustration" className="auth-image" />
      </div>

      {/* Right Side - Login/Signup Form */}
      <div className="auth-right">
        <div className="auth-box">
          {isLogin ? (
            <>
              <h2>Admin Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={handleLoginChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                />
                <button type="submit" className="auth-btn">
                  Login
                </button>
              </form>
              <p className="switch-text">
                Don't have an account?{" "}
                <span onClick={() => setIsLogin(false)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <h2>Admin Signup</h2>
              <form onSubmit={handleSignupSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={signupData.name}
                  onChange={handleSignupChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={signupData.confirmPassword}
                  onChange={handleSignupChange}
                  required
                />
                <button type="submit" className="auth-btn">
                  Sign Up
                </button>
              </form>
              <p className="switch-text">
                Already have an account?{" "}
                <span onClick={() => setIsLogin(true)}>Login</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
