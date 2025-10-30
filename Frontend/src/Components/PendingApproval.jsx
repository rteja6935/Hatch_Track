import React, { useEffect } from "react";
import "../CSS/SharedAuth.css";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiClock, FiCheckCircle, FiMessageCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const PendingApproval = () => {
  const navigate = useNavigate();
  const phoneNumber = localStorage.getItem("userPhoneNumber") || "your number";

  useEffect(() => {
    // If no phone number in localStorage, redirect to login
    if (!localStorage.getItem("userPhoneNumber")) {
      navigate("/user-login");
    }
  }, [navigate]);

  const whatsappNumber = "919876543210"; // Replace with actual WhatsApp number
  const whatsappMessage = encodeURIComponent(`Hello, I am waiting for approval for my account with phone number ${phoneNumber}. Please help.`);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="auth-container">
      {/* Back to Login Button */}
      <Link to="/user-login" className="auth-back-btn">
        <FiArrowLeft /> Back to Login
      </Link>

      {/* Left Side - Image */}
      <div className="auth-left">
        <div className="auth-left-content">
          <img src="/logo.png" alt="Lords Aqua Hatcheries" className="auth-left-logo" />
          <h1>Almost There!</h1>
          <h3>Lords Aqua Hatcheries</h3>
          <p>
            Your registration is complete and we're reviewing your account.
            You'll be able to access all features once approved by our team.
          </p>
        </div>
      </div>

      {/* Right Side - Pending Approval Message */}
      <div className="auth-right">
        <div className="auth-box">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            style={{ textAlign: "center", marginBottom: "2rem" }}
          >
            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "0 auto 1.5rem",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiClock size={50} color="white" />
            </div>
          </motion.div>

          <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Verification Successful!
          </h2>

          <div
            style={{
              background: "rgba(102, 126, 234, 0.1)",
              padding: "1.5rem",
              borderRadius: "12px",
              marginBottom: "2rem",
              border: "2px solid rgba(102, 126, 234, 0.3)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <FiCheckCircle size={24} color="#667eea" style={{ marginRight: "0.75rem" }} />
              <p style={{ margin: 0, fontWeight: "600", color: "var(--auth-text)" }}>
                Your mobile number has been successfully verified.
              </p>
            </div>
            <p style={{ margin: 0, color: "var(--auth-text-light)", lineHeight: "1.6" }}>
              Please wait for the organization's approval to gain system access.
              You will be notified once your account is approved.
            </p>
          </div>

          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h3 style={{ fontSize: "1rem", marginBottom: "1rem", color: "var(--auth-text)" }}>
              What happens next?
            </h3>
            <ul style={{ paddingLeft: "1.5rem", margin: 0, lineHeight: "1.8", color: "var(--auth-text-light)" }}>
              <li>Our team will review your registration details</li>
              <li>You'll receive a notification once approved</li>
              <li>Approval typically takes 24-48 hours</li>
              <li>You can then access your dashboard and all features</li>
            </ul>
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "1.5rem",
              background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
              borderRadius: "12px",
              marginBottom: "1.5rem",
            }}
          >
            <FiMessageCircle size={32} color="#667eea" style={{ marginBottom: "0.75rem" }} />
            <p style={{ margin: "0 0 1rem", color: "var(--auth-text)", fontWeight: "500" }}>
              For urgent assistance, contact us:
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background: "#25D366",
                color: "white",
                textDecoration: "none",
                borderRadius: "50px",
                fontWeight: "600",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact on WhatsApp
            </a>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ margin: 0, color: "var(--auth-text-light)", fontSize: "0.9rem" }}>
              Verified Phone: <strong style={{ color: "var(--auth-text)" }}>{phoneNumber}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
