import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiEdit3, FiMail, FiPhone, FiMapPin, FiUsers, FiCheckCircle, FiClock } from "react-icons/fi";

const adminProfileImage = "https://randomuser.me/api/portraits/men/45.jpg";

const AdminProfile = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #f9fafb, #f3f4f6)",
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Top Navigation */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px 32px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <div
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            color: "#0891b2",
            fontWeight: 600,
          }}
        >
          <FiArrowLeft /> Back to Dashboard
        </div>
        <h2 style={{ color: "#111827", fontWeight: 700, fontSize: "20px" }}>Admin Profile</h2>
        <div></div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "40px auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* Profile Header Card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
          }}
        >
          <img
            src={adminProfileImage}
            alt="Admin"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #0891b2",
              boxShadow: "0 4px 10px rgba(8,145,178,0.15)",
            }}
          />
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827" }}>Admin User</h2>
            <p style={{ fontSize: "15px", color: "#6b7280" }}>System Administrator</p>

            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151" }}>
                <FiMail /> admin@hatchtrack.com
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151" }}>
                <FiPhone /> +91 98765 43210
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#374151" }}>
                <FiMapPin /> Bengaluru, India
              </div>
            </div>
          </div>

          <button
            style={{
              background: "#0891b2",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#0e7490")}
            onMouseOut={(e) => (e.target.style.background = "#0891b2")}
          >
            <FiEdit3 /> Edit Profile
          </button>
        </div>

        {/* Stats Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              icon: <FiUsers />,
              label: "Total Users Managed",
              value: "134",
              color: "#0891b2",
            },
            {
              icon: <FiCheckCircle />,
              label: "Approved Requests",
              value: "87",
              color: "#16a34a",
            },
            {
              icon: <FiClock />,
              label: "Pending Approvals",
              value: "12",
              color: "#f59e0b",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  background: `${stat.color}15`,
                  color: stat.color,
                  borderRadius: "10px",
                  width: 48,
                  height: 48,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "18px", color: "#111827" }}>
                  {stat.value}
                </div>
                <div style={{ color: "#6b7280", fontSize: "14px" }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Settings Section */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "28px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginBottom: "20px" }}>
            Account Settings
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {["Change Email", "Update Password", "Manage Notifications"].map((setting) => (
              <button
                key={setting}
                style={{
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "14px 18px",
                  textAlign: "left",
                  fontWeight: 500,
                  color: "#111827",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#e0f2fe";
                  e.currentTarget.style.borderColor = "#0891b2";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                {setting}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
