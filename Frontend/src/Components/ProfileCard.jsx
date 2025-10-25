import React from "react";
import "../CSS/ProfileCard.css";

const ProfileCard = ({ user, onClick }) => {
  return (
    <div className="profile-card" onClick={onClick}>
      <img src={user.image} alt={user.name} className="profile-img" />
      <h3>{user.name}</h3>
      <p className="role">{user.role}</p>
      <p className="experience">{user.experience} Years Experience</p>
      <div className="skills">
        {user.skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
