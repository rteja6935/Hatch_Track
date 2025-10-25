import React from "react";
import "../CSS/HomePage.css";
import { useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate("/user-login");
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">🐣 HatchSeed</div>
      

    <div class="nav-buttons">
      
      <button className="logIn-btn" onClick={handleLogout}>
          Login
        </button>
       <div class="profile">
         <Link to="/admin-login">
        <FaCircleUser size={25} style={{ textDecoration: 'none', color: 'white' }}/> 
        </Link>
      </div>
    </div>
  </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to HatchSeed</h1>
          <p>
            Manage your hatchery seeds efficiently. Upload growth images,
            monitor progress, and get real-time admin feedback.
          </p>
          <button className="cta-btn" onClick={() => navigate("/user-login")}>
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="info-section">
        <h2>🌱 About HatchSeed</h2>
        <p>
          HatchTrack simplifies hatchery management. Users can register using OTP,
          upload growth images at different stages, and track seed usage with ease.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📸 Growth Photos</h3>
            <p>Upload 10-day and 20-day seed growth images for accurate tracking.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Seed Tracking</h3>
            <p>Monitor the number of seeds distributed and consumed.</p>
          </div>
          <div className="feature-card">
            <h3>🧑‍💼 Admin Feedback</h3>
            <p>Receive feedback from administrators to improve seed management.</p>
          </div>
          <div className="feature-card">
            <h3>🔐 Secure Login</h3>
            <p>OTP-based authentication ensures secure and hassle-free login.</p>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="reviews-section">
        <h2>💬 Client Reviews</h2>
        <div className="reviews">
          <div className="review-card">
            <p>
              “HatchTrack made it easy to track seed progress and upload growth
              images. Highly recommended!”
            </p>
            <span>- Ramesh, Hatchery Owner</span>
          </div>
          <div className="review-card">
            <p>
              “Admin dashboard is intuitive and easy to manage. A great tool for
              hatchery management.”
            </p>
            <span>- Priya, Admin</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="footer-content">
          <h3>Contact Us</h3>
          <p>Email: support@hatchtrack.com</p>
          <p>© 2025 HatchTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
