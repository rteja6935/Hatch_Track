import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>User not found</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "#0891b2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          alignSelf: "flex-start",
          marginBottom: "20px",
          background: "#0891b2",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          padding: "10px 20px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "16px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <img
          src={user.image}
          alt={user.name}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #0891b2",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>
          {user.name}
        </h1>
        <p style={{ color: "#6b7280", margin: "8px 0" }}>{user.role}</p>
        <p style={{ color: "#374151", fontWeight: 500 }}>
          📍 {user.location}
        </p>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            fontSize: "16px",
          }}
        >
          <span>⭐ Rating: <strong>{user.rating}</strong></span>
          <span>🌱 Seeds: <strong>{user.seeds}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
