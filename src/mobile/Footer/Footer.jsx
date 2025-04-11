import React, { useState, useEffect } from 'react';

function Footer({ scrollToSection }) {
  const [revealLinks, setRevealLinks] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'past-sponsors', label: 'Past Sponsors' },
    { id: 'team', label: 'Team' },
    { id: 'contact-us', label: 'Contact Us' }
  ];
  
  // Function to update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    };
    
    // Update time immediately and then every second
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  const handleNavigation = (id) => {
    scrollToSection(id);
  };

  return (
    <footer className="bg-gray-900 relative overflow-hidden pb-4">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Static stars */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
            }}
          />
        ))}
        
        {/* Galaxy gradients */}
        <div className="absolute top-0 -left-20 w-60 h-60 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      {/* Main footer content */}
      <div className="relative z-10 px-5 pt-8">
        <div className="flex flex-col items-center mb-6">
          {/* Logo */}
          <div className="w-16 h-16 mb-3">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <polygon points="20,5 5,20 20,35 35,20" fill="none" stroke="#67e8f9" strokeWidth="2" className="animate-pulse" />
              <circle cx="20" cy="20" r="6" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="2" fill="#67e8f9" />
            </svg>
          </div>
          
          {/* Company name */}
          <h3 className="text-lg font-bold text-blue-300 text-center">
            ACM BMU <span className="text-cyan-400">STUDENT CHAPTER</span>
          </h3>
          
          {/* Tagline */}
          <p className="text-sm text-blue-200 mt-2 text-center">
            Bringing Our Legacy to you in an <span className="text-cyan-400">Innovative</span> way.
          </p>
        </div>
        
        {/* Links section */}
        <div className="mb-6">
          <button 
            className="flex items-center justify-center w-full py-2 mb-4 bg-blue-900/50 rounded-lg border border-blue-800/50"
            onClick={() => setRevealLinks(!revealLinks)}
          >
            <span className="text-blue-300 text-sm">{revealLinks ? 'Hide Links' : 'Explore Links'}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`w-4 h-4 ml-2 text-blue-300 transition-transform ${revealLinks ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Link grid - conditionally rendered */}
          {revealLinks && (
            <div className="grid grid-cols-1 gap-y-6 bg-blue-900/20 p-4 rounded-lg border border-blue-800/30 backdrop-blur-sm">
              {/* First column */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase text-blue-400 font-semibold mb-2">Navigation</h4>
                {navItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => handleNavigation(item.id)}
                    className="block text-blue-200 hover:text-cyan-400 text-sm cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              
              {/* Third column */}
             
            </div>
          )}
        </div>
      </div>
      
      {/* Footer lower section */}
      <div className="relative z-10 border-t border-blue-900/60 mt-2 pt-4 px-5">
        <div className="flex justify-between items-center mb-3">
          {/* Coordinates */}
          <div className="flex flex-col">
            <span className="text-xs text-blue-400">42°.1337.N</span>
            <span className="text-xs text-blue-400">88°.0101.W</span>
          </div>
          
          {/* Time indicator */}
          <div className="flex items-center">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm text-blue-200">{currentTime}</span>
          </div>
        </div>
        
        {/* System status */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-blue-300">
            © 2024-25 <span className="text-cyan-400">ACM BMU</span>
          </div>
          <div className="text-xs text-cyan-500">SYSTEM ONLINE</div>
        </div>
      </div>
      
      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </footer>
  );
}

export default Footer;