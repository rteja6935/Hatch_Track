import { useState } from "react";
import { User, Lock } from "lucide-react";
import {useNavigate} from "react-router-dom";
import "../CSS/LogIn.css";
 
export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ username, password, rememberMe });
    navigate("/admin-dashboard");
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <h1>WELCOME</h1>
        <h3>YOUR HEADLINE NAME</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <h2> Administrator LogIn</h2>
        <p className="login-subtext">Access your account securely</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label>User Name</label>
          <div className="input-box">
            <User size={18} className="icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <label>Password</label>
          <div className="input-box">
            <Lock size={18} className="icon1" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>

          <div className="login-options">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-btn">
           Log In
          </button>
        </form>
      </div>
    </div>
  );
}
