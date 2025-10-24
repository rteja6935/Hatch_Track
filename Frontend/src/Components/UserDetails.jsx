import React from "react";
import { useParams, Link } from "react-router-dom";

const users = [
  {
    name: "Kim Koi",
    rating: 4.7,
    role: "Worker",
    location: "Lviv",
    seeds: 23,
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  // ... add the same user list as in AdminDashboard.jsx
];

const UserDetailPage = () => {
  const { userName } = useParams();
  const user = users.find((u) => u.name === decodeURIComponent(userName));

  if (!user) return <h2>User not found</h2>;

  return (
    <div style={{ padding: "32px", background: "#f9fafb", minHeight: "100vh" }}>
      <Link to="/" style={{ color: "#0891b2", textDecoration: "none", fontWeight: 600 }}>
        ← Back to Dashboard
      </Link>
      <div style={{ display: "flex", marginTop: "32px", gap: "32px" }}>
        <img
          src={user.image}
          alt={user.name}
          style={{ width: 160, height: 160, borderRadius: "12px", objectFit: "cover" }}
        />
        <div>
          <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>{user.name}</h1>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Seeds:</strong> {user.seeds}</p>
          <p><strong>Rating:</strong> ⭐ {user.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
