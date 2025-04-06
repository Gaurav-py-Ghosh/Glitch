import React, { useState } from 'react';

const Navbar = ({ focused, handleObjectClick }) => {
  const [hoveredButton, setHoveredButton] = useState(null);
  
  if (focused) return null;
  
  const navItems = [
    { id: 'blackhole', label: 'TEAM' },
    { id: 'moon', label: 'CONTACT' },
    { id: 'saturn', label: 'SPONSORS' },
    { id: 'spaceship', label: 'EVENTS' },
    { id: 'mars', label: 'ABOUT' }
  ];

  return (
    <nav className="cosmic-navbar">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-button ${hoveredButton === item.id ? 'hovered' : ''}`}
          onClick={() => handleObjectClick(item.id)}
          onMouseEnter={() => setHoveredButton(item.id)}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <span className="button-text">{item.label}</span>
          <span className="button-glow"></span>
        </button>
      ))}
      
      <style jsx>{`
        .cosmic-navbar {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          display: flex;
          gap: 12px;
          padding: 10px 30px;
          background: linear-gradient(145deg, rgba(5,15,40,0.85) 0%, rgba(2,8,25,0.95) 100%);
          border: 1px solid rgba(0, 170, 255, 0.3);
          border-radius: 8px;
          backdrop-filter: blur(15px);
          box-shadow: 0 0 30px rgba(0, 85, 255, 0.3),
                      inset 0 0 20px rgba(0, 200, 255, 0.1);
          font-family: 'JetBrains Mono', monospace;
          clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%);
          opacity: 0.95;
        }
        
        .nav-button {
          color: #00ffff;
          background: rgba(0, 40, 80, 0.3);
          border: 1px solid rgba(0, 170, 255, 0.1);
          border-radius: 4px;
          padding: 8px 20px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
          text-shadow: 0 0 8px rgba(0, 170, 255, 0.5);
          clip-path: polygon(0% 0%, 100% 0%, 92% 100%, 8% 100%);
        }
        
        .nav-button:hover, .nav-button.hovered {
          background: rgba(0, 170, 255, 0.15);
          box-shadow: 0 0 15px rgba(0, 170, 255, 0.4),
                      inset 0 0 8px rgba(0, 255, 255, 0.4);
          transform: translateY(-2px);
          color: #ffffff;
          text-shadow: 0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.5);
          border-color: rgba(0, 200, 255, 0.4);
        }
        
        .button-text {
          position: relative;
          z-index: 2;
        }
        
        .button-glow {
          position: absolute;
          top: -100%;
          left: -100%;
          width: 300%;
          height: 300%;
          background: linear-gradient(45deg, 
                                    transparent, 
                                    rgba(0, 255, 255, 0.1), 
                                    rgba(0, 200, 255, 0.2), 
                                    rgba(0, 255, 255, 0.1), 
                                    transparent);
          transform: rotate(45deg);
          transition: all 0.5s ease;
          opacity: 0;
        }
        
        .nav-button:hover .button-glow, .nav-button.hovered .button-glow {
          animation: glowFlow 3s infinite linear;
          opacity: 1;
        }
        
        @keyframes glowFlow {
          0% { transform: rotate(45deg) translateX(-100%); }
          100% { transform: rotate(45deg) translateX(100%); }
        }
        
        @media (max-width: 768px) {
          .cosmic-navbar {
            gap: 8px;
            padding: 8px 20px;
          }
          
          .nav-button {
            font-size: 12px;
            padding: 6px 14px;
          }
        }
        
        @media (max-width: 480px) {
          .cosmic-navbar {
            max-width: 95%;
            padding: 6px 12px;
            gap: 6px;
          }
          
          .nav-button {
            font-size: 11px;
            padding: 5px 10px;
            letter-spacing: 1px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;