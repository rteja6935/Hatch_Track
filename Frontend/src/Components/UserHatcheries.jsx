import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiGrid } from "react-icons/fi";

export default function UserHatcheries() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "100vh", background: "#E8EDF2", padding: "2rem" }}>
      <button onClick={() => navigate("/user/dashboard")} style={{
        padding: "0.75rem 1.5rem", background: "#5B7C99", color: "white", border: "none",
        borderRadius: "10px", fontWeight: "700", cursor: "pointer", display: "flex",
        alignItems: "center", gap: "0.5rem", marginBottom: "2rem"
      }}>
        <FiArrowLeft /> Back to Dashboard
      </button>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "900", marginBottom: "2rem" }}>
          <FiGrid /> My Hatcheries
        </h1>
        <p>All your hatcheries will be displayed here.</p>
      </div>
    </div>
  );
}
