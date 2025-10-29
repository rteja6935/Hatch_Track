import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCamera, FiSave, FiUser, FiMail, FiPhone } from "react-icons/fi";
import "../CSS/SharedAuth.css";

export default function UserProfile() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    phone: "+91 9876543210",
    address: "123 Aqua Street, Fish Town",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001"
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically save to backend
    alert("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="auth-container" style={{ minHeight: "100vh" }}>
      <button className="auth-back-btn" onClick={() => navigate("/user/dashboard")}>
        <FiArrowLeft /> Back to Dashboard
      </button>

      <div style={{
        maxWidth: "800px",
        margin: "4rem auto",
        padding: "2rem",
        background: "var(--auth-card-bg)",
        borderRadius: "16px",
        boxShadow: "var(--dashboard-shadow-md)"
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: "900",
          color: "var(--auth-text-primary)",
          marginBottom: "0.5rem",
          letterSpacing: "-0.5px"
        }}>
          User Profile
        </h1>
        <p style={{
          fontSize: "0.95rem",
          color: "var(--auth-text-light)",
          marginBottom: "2rem"
        }}>
          Manage your personal information and profile picture
        </p>

        {/* Profile Image Section */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem"
        }}>
          <div style={{ position: "relative" }}>
            <div style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "linear-gradient(135deg, #5B7C99 0%, #7A98B3 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px solid var(--auth-bg-secondary)"
            }}>
              {profileImagePreview ? (
                <img src={profileImagePreview} alt="Profile" style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} />
              ) : (
                <FiUser style={{ fontSize: "4rem", color: "white" }} />
              )}
            </div>
            {isEditing && (
              <label style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                background: "#5B7C99",
                color: "white",
                border: "3px solid var(--auth-card-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.2rem"
              }}>
                <FiCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                Full Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 0.85rem 3rem",
                    border: "2px solid var(--auth-border)",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: "500"
                  }}
                />
                <FiUser style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--auth-text-light)"
                }} />
              </div>
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 0.85rem 3rem",
                    border: "2px solid var(--auth-border)",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: "500"
                  }}
                />
                <FiMail style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--auth-text-light)"
                }} />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                Phone Number
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  disabled={!isEditing}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1rem 0.85rem 3rem",
                    border: "2px solid var(--auth-border)",
                    borderRadius: "10px",
                    fontSize: "0.95rem",
                    fontWeight: "500"
                  }}
                />
                <FiPhone style={{
                  position: "absolute",
                  left: "1rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--auth-text-light)"
                }} />
              </div>
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                City
              </label>
              <input
                type="text"
                value={profileData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--auth-border)",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "700",
              fontSize: "0.9rem",
              color: "var(--auth-text-primary)"
            }}>
              Address
            </label>
            <input
              type="text"
              value={profileData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              disabled={!isEditing}
              style={{
                width: "100%",
                padding: "0.85rem 1rem",
                border: "2px solid var(--auth-border)",
                borderRadius: "10px",
                fontSize: "0.95rem",
                fontWeight: "500"
              }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                State
              </label>
              <input
                type="text"
                value={profileData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--auth-border)",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              />
            </div>

            <div>
              <label style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "700",
                fontSize: "0.9rem",
                color: "var(--auth-text-primary)"
              }}>
                PIN Code
              </label>
              <input
                type="text"
                value={profileData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "0.85rem 1rem",
                  border: "2px solid var(--auth-border)",
                  borderRadius: "10px",
                  fontSize: "0.95rem",
                  fontWeight: "500"
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="auth-btn"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem"
                }}
              >
                <FiUser /> Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="auth-btn"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <FiSave /> Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    flex: 1,
                    padding: "0.85rem 1.5rem",
                    border: "2px solid var(--auth-border)",
                    background: "transparent",
                    color: "var(--auth-text-secondary)",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
