import React from 'react';

const Navbar = ({ focused, handleObjectClick }) => {
  if (focused) return null;

  return (
    <nav style={{
      position: 'absolute',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 15,
      display: 'flex',
      gap: '8px',
      padding: '8px 25px',
      background: 'linear-gradient(145deg, rgba(5,15,40,0.9) 0%, rgba(2,8,25,0.9) 100%)',
      border: '1px solid rgba(0, 170, 255, 0.3)',
      borderRadius: '6px',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 0 30px rgba(0, 85, 255, 0.3)',
      fontFamily: 'monospace',
      clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)',
      opacity: 0.90
    }}>
      <button
        onClick={() => handleObjectClick('blackhole')}
        style={buttonStyle}
      >
        TEAM
      </button>
      
      <button
        onClick={() => handleObjectClick('moon')}
        style={buttonStyle}
      >
        CONTACT
      </button>
      
      <button
        onClick={() => handleObjectClick('saturn')}
        style={buttonStyle}
      >
        SPONSORS
      </button>
      
      <button
        onClick={() => handleObjectClick('spaceship')}
        style={buttonStyle}
      >
        EVENTS
      </button>
      
      <button
        onClick={() => handleObjectClick('mars')}
        style={buttonStyle}
      >
        ABOUT
      </button>

      <style jsx>{`
        @keyframes glowFlow {
          0% { transform: rotate(45deg) translateX(-50%); }
          100% { transform: rotate(45deg) translateX(50%); }
        }
        
        @media (max-width: 768px) {
          nav {
            gap: 6px;
            padding: 6px 20px;
          }
          
          button {
            font-size: 12px;
            padding: 6px 12px;
          }
        }
        
        @media (max-width: 480px) {
          nav {
            max-width: 90%;
            padding: 6px 15px;
          }
          
          button {
            font-size: 11px;
            padding: 4px 8px;
          }
        }
      `}</style>
    </nav>
  );
};

const buttonStyle = {
  color: '#00ffff',
  background: 'transparent',
  border: 'none',
  padding: '8px 20px',
  cursor: 'pointer',
  fontSize: '13px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  textShadow: '0 0 8px rgba(0, 170, 255, 0.5)',
  clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)',
  
  ':hover': {
    background: 'rgba(0, 170, 255, 0.1)',
    boxShadow: '0 0 15px rgba(0, 170, 255, 0.3)',
  },
  
  ':before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent)',
    transform: 'rotate(45deg)',
    animation: 'glowFlow 6s infinite linear',
  }
};

export default Navbar;