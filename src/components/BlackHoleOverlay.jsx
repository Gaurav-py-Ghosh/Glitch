import React from 'react';
import '../styles/BlackHoleOverlay.css'; // Assuming you have a CSS file for styling

const teamMembers = [
  { name: 'Purvanshu', position: 'Sponsorship Lead ', image: '/images/team/member1.jpg' },
  { name: 'Shrey', position: 'Sponsorship Lead ', image: '/images/team/member2.jpg' },
  { name: 'Vanshita', position: 'Operations & Decor Lead ', image: '/images/team/member3.jpg' },
  { name: 'Tanmay', position: 'Operations Lead ', image: '/images/team/member4.jpg' },
  { name: 'Shreya', position: 'Social Media Lead ', image: '/images/team/member5.jpg' },
  { name: 'Vanshika', position: 'Social Media Lead ', image: '/images/team/member6.jpg' },
  { name: 'Akriti', position: 'Entry Management Lead ', image: '/images/team/member10.jpg' },
  { name: 'Kavya', position: 'Entry Management Lead ', image: '/images/team/member11.jpg' },
  { name: 'Sejal', position: 'Technical & Decor Lead ', image: '/images/team/member12.jpg' },
  { name: 'Gaurav', position: 'Technical & Decor Lead ', image: '/images/team/member13.jpg' },
  { name: 'Suvansh', position: 'Design Lead ', image: '/images/team/member14.jpg' },
  { name: 'Molly', position: 'Offline Marketing Lead ', image: '/images/team/member15.jpg' },
  { name: 'Yash', position: 'Offline Marketing Lead ', image: '/images/team/member16.jpg' },
  { name: 'Kavya', position: 'Content Lead ', image: '/images/team/member17.jpg' },
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