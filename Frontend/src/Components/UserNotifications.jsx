import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiXCircle, FiMessageSquare, FiBell } from "react-icons/fi";
import "../CSS/SharedAuth.css";

export default function UserNotifications() {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, type: "accepted", message: "Your Day 1-10 upload has been approved", comment: "Excellent growth progress! Keep up the good work.", date: "2025-10-27", time: "10:30 AM", read: false },
    { id: 2, type: "rejected", message: "Your Day 10-20 upload was rejected", comment: "Image quality is too low. Please upload a clearer photo.", date: "2025-10-26", time: "02:15 PM", read: false },
    { id: 3, type: "comment", message: "Admin added a comment on Day 20-30", comment: "Good progress. Please ensure the water temperature is maintained between 28-30°C.", date: "2025-10-25", time: "09:45 AM", read: true },
    { id: 4, type: "accepted", message: "Pond #2 has been verified", comment: "All parameters look good.", date: "2025-10-24", time: "11:20 AM", read: true }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "accepted": return <FiCheckCircle style={{ color: "#22c55e", fontSize: "1.5rem" }} />;
      case "rejected": return <FiXCircle style={{ color: "#ef4444", fontSize: "1.5rem" }} />;
      case "comment": return <FiMessageSquare style={{ color: "#5B7C99", fontSize: "1.5rem" }} />;
      default: return <FiBell style={{ fontSize: "1.5rem" }} />;
    }
  };

  return (
    <div className="auth-container" style={{ minHeight: "100vh" }}>
      <button className="auth-back-btn" onClick={() => navigate("/user/dashboard")}>
        <FiArrowLeft /> Back to Dashboard
      </button>

      <div style={{ maxWidth: "900px", margin: "4rem auto", padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "0.5rem", letterSpacing: "-0.5px" }}>
          Notifications
        </h1>
        <p style={{ fontSize: "0.95rem", color: "var(--auth-text-light)", marginBottom: "2rem" }}>
          View all admin feedback and updates
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {notifications.map(notif => (
            <div key={notif.id} style={{
              background: notif.read ? "var(--auth-card-bg)" : "rgba(91, 124, 153, 0.05)",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid var(--auth-border)",
              display: "flex",
              gap: "1rem"
            }}>
              <div style={{ flexShrink: 0, paddingTop: "0.25rem" }}>{getIcon(notif.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "700", fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {notif.message}
                </div>
                <div style={{ color: "var(--auth-text-secondary)", marginBottom: "0.5rem", lineHeight: "1.5" }}>
                  {notif.comment}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--auth-text-light)" }}>
                  {notif.date} at {notif.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
