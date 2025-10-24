import React, { useState } from 'react';

const iconImage = "https://cdn-icons-png.flaticon.com/512/709/709496.png";
const fullImage = "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d";
const adminProfileImage = "https://randomuser.me/api/portraits/men/45.jpg";

const users = [
  {
    name: "Kim Koi",
    rating: 4.7,
    role: "Worker",
    location: "Lviv",
    seeds: 23,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Rassel Sharl",
    rating: 4.7,
    role: "Manager",
    location: "Lviv",
    seeds: 23,
    image: "https://randomuser.me/api/portraits/men/70.jpg",
  },
  {
    name: "Dima Surri",
    rating: 4.7,
    role: "DevOps",
    location: "Lviv",
    seeds: 23,
    image: "https://randomuser.me/api/portraits/men/73.jpg",
  },
  {
    name: "Henry Det",
    rating: 4.8,
    role: "Student",
    location: "Kyiv",
    seeds: 21,
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    name: "Olga Starikova",
    rating: 4.9,
    role: "Teacher",
    location: "Odesa",
    seeds: 27,
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    name: "Anna Klark",
    rating: 4.6,
    role: "Designer",
    location: "Moscow",
    seeds: 19,
    image: "https://randomuser.me/api/portraits/women/56.jpg",
  },
  {
    name: "Victor Lee",
    rating: 4.5,
    role: "QA",
    location: "Lviv",
    seeds: 25,
    image: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    name: "Sara Kim",
    rating: 4.8,
    role: "Frontend",
    location: "Lviv",
    seeds: 22,
    image: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Alex Martin",
    rating: 4.7,
    role: "Backend",
    location: "Kharkiv",
    seeds: 24,
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  }
];

const NavBar = () => (
  <div style={{
    width: "100%",
    background: "#ffffff",
    padding: "20px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    boxSizing: "border-box",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)"
  }}>
    <div style={{ 
      fontWeight: 700, 
      fontSize: "26px", 
      color: "#0891b2",
      letterSpacing: "-0.5px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      Hatch Track
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={adminProfileImage}
          alt="admin"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #0891b2"
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: "1.3" }}>
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#111827" }}>Admin User</span>
          <span style={{ fontSize: "12px", color: "#6b7280" }}>Administrator</span>
        </div>
      </div>
      <button style={{
        background: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        padding: "10px 24px",
        fontWeight: 600,
        fontSize: 14,
        cursor: "pointer",
        transition: "all 0.2s",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
      }}
      onMouseOver={(e) => e.target.style.background = "#dc2626"}
      onMouseOut={(e) => e.target.style.background = "#ef4444"}
      >
        Logout
      </button>
    </div>
  </div>
);

const ImageModal = ({ show, onClose, imgSrc }) =>
  show ? (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)"
      }}
    >
      <div
        style={{
          position: "relative",
          background: "#fff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          textAlign: "center",
          maxWidth: "90%"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={imgSrc} alt="full" style={{ 
          maxWidth: 500, 
          maxHeight: 500, 
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
        }} />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "#111827",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 36,
            height: 36,
            fontSize: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "24px" }}>
          <button style={{
            background: "#0891b2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}
          onMouseOver={(e) => e.target.style.background = "#0e7490"}
          onMouseOut={(e) => e.target.style.background = "#0891b2"}
          >
            Accept
          </button>
          <button style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}
          onMouseOver={(e) => e.target.style.background = "#dc2626"}
          onMouseOut={(e) => e.target.style.background = "#ef4444"}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  ) : null;

const IconBoxRow = ({ onIconClick }) => (
  <div style={{
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
    marginTop: "12px"
  }}>
    {[...Array(4)].map((_, i) => (
      <div key={i} style={{
        width: 36,
        height: 36,
        background: "#f3f4f6",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        border: "1px solid #e5e7eb"
      }} 
      onClick={() => onIconClick(fullImage)}
      onMouseOver={(e) => {
        e.currentTarget.style.background = "#e0f2fe";
        e.currentTarget.style.borderColor = "#0891b2";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = "#f3f4f6";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
      >
        <img src={iconImage} alt="icon" style={{ width: 20, height: 20, opacity: 0.7 }} />
      </div>
    ))}
  </div>
);

const UserCard = ({ user, highlighted, onIconClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      border: highlighted ? "2px solid #0891b2" : "1px solid #e5e7eb",
      borderRadius: "16px",
      background: "#ffffff",
      boxShadow: highlighted 
        ? "0 4px 6px -1px rgba(8, 145, 178, 0.1), 0 2px 4px -1px rgba(8, 145, 178, 0.06)" 
        : "0 1px 3px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "flex-start",
      padding: "24px",
      minWidth: "340px",
      maxWidth: "420px",
      margin: "12px",
      flex: "1 1 360px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      cursor: "pointer"
    }}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onMouseOver={(e) => {
      if (!highlighted) {
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)";
      } else {
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(8, 145, 178, 0.2), 0 4px 6px -2px rgba(8, 145, 178, 0.1)";
      }
    }}
    onMouseOut={(e) => {
      if (!highlighted) {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.05)";
      } else {
        e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(8, 145, 178, 0.1), 0 2px 4px -1px rgba(8, 145, 178, 0.06)";
      }
    }}
    >
      <img src={user.image} alt={user.name} style={{
        width: 64,
        height: 64,
        borderRadius: "12px",
        objectFit: "cover",
        marginRight: "20px",
        border: "2px solid #f3f4f6",
        transition: "all 0.3s ease",
        transform: isHovered ? "scale(1.08)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none"
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontWeight: "600", 
          fontSize: "18px",
          color: "#111827",
          marginBottom: "8px"
        }}>
          {user.name}
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          fontSize: 13, 
          color: "#6b7280",
          marginBottom: "4px"
        }}>
          <span style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "4px",
            background: "#fef3c7",
            padding: "2px 8px",
            borderRadius: "6px",
            color: "#92400e",
            fontWeight: 600
          }}>
            ⭐ {user.rating}
          </span>
          <span style={{
            background: "#e0f2fe",
            padding: "2px 8px",
            borderRadius: "6px",
            color: "#075985",
            fontWeight: 600
          }}>
            {user.role}
          </span>
        </div>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          fontSize: 13, 
          color: "#6b7280",
          marginBottom: "12px"
        }}>
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            📍 {user.location}
          </span>
          <span style={{ margin: "0 8px", color: "#d1d5db" }}>•</span>
          <span><strong style={{ color: "#374151" }}>Seeds:</strong> {user.seeds}</span>
        </div>
        <IconBoxRow onIconClick={onIconClick} />
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{
            background: "#0891b2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            flex: 1,
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}
          onMouseOver={(e) => e.target.style.background = "#0e7490"}
          onMouseOut={(e) => e.target.style.background = "#0891b2"}
          >
            Accept
          </button>
          <button style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "10px 24px",
            fontWeight: 600,
            fontSize: 14,
            cursor: "pointer",
            flex: 1,
            transition: "all 0.2s",
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)"
          }}
          onMouseOver={(e) => e.target.style.background = "#dc2626"}
          onMouseOut={(e) => e.target.style.background = "#ef4444"}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [modalImg, setModalImg] = useState(null);

  const handleIconClick = (imgSrc) => setModalImg(imgSrc);
  const handleCloseModal = () => setModalImg(null);

  return (
    <div style={{ 
      background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)', 
      minHeight: '100vh',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif"
    }}>
      <NavBar />
      <div style={{ padding: "32px 24px" }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          marginBottom: "32px"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: 700,
            color: "#111827",
            marginBottom: "8px",
            letterSpacing: "-0.5px"
          }}>
            User Management
          </h1>
          <p style={{
            fontSize: "15px",
            color: "#6b7280",
            margin: 0
          }}>
            Review and manage user submissions
          </p>
        </div>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "1200px",
          margin: "0 auto",
        }}>
          {users.map((user, idx) => (
            <UserCard
              key={user.name}
              user={user}
              highlighted={false}
              onIconClick={handleIconClick}
            />
          ))}
        </div>
      </div>
      <ImageModal
        show={!!modalImg}
        onClose={handleCloseModal}
        imgSrc={modalImg}
      />
    </div>
  );
};

export default AdminDashboard;