import React from 'react';
import '../styles/BlackHoleOverlay.css'; // Assuming you have a CSS file for styling

const teamMembers = [
  { name: 'Member 1', position: 'Position 1', image: '/images/team/member1.jpg' },
  { name: 'Member 2', position: 'Position 2', image: '/images/team/member2.jpg' },
  { name: 'Member 3', position: 'Position 3', image: '/images/team/member3.jpg' },
];

const BlackHoleOverlay = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="black-hole-overlay">
      <div className="grid-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="grid-item">
            <img src={member.image} alt={member.name} className="member-image" />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
      <button className="close-button" onClick={onClose}>Close</button>
    </div>
  );
};

export default BlackHoleOverlay;