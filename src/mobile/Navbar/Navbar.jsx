import React, { useState, useEffect } from 'react';

const Navbar = ({ scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'past-sponsors', label: 'Past Sponsors' },
    { id: 'team', label: 'Team' },
    { id: 'contact-us', label: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.id);
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is visible in the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navItems]);

  const handleNavigation = (id) => {
    setIsMenuOpen(false);
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <div className="relative w-full">
      {/* Background with stars effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none bg-gray-900 z-0">
        {/* Static stars */}
        {Array(40).fill().map((_, i) => (
          <div 
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
            }}
          />
        ))}
        {/* Galaxy gradients */}
        <div className="absolute top-0 -left-20 w-60 h-60 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 shadow-lg shadow-blue-900/20' : 'bg-transparent'}`}>
        <div className="px-4 py-3 flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/images/logo.png" // 🔁 replace with your actual path
              alt="Glitch"
              className="w-12 h-12 rounded-full object-cover shadow-lg"
            />
          </div>

          {/* Hamburger Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 relative flex flex-col items-center justify-center focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-blue-300 mb-1.5 transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 bg-blue-300 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 bg-blue-300 mt-1.5 transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 z-40 flex flex-col pt-20 pb-6 px-6 bg-gray-900/95 backdrop-blur-md transition-all duration-500 overflow-y-auto transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Menu stars effect */}
          {Array(25).fill().map((_, i) => (
            <div 
              key={`menu-star-${i}`}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 0.5}px`,
                height: `${Math.random() * 2 + 0.5}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
              }}
            />
          ))}
          
          {/* Navigation Items */}
          <div className="space-y-6 relative z-10">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full text-left py-3 px-4 text-lg font-medium transition-all duration-300 rounded-lg
                  ${activeSection === item.id 
                    ? 'text-white bg-blue-900/50 border-l-4 border-blue-400 shadow-lg shadow-blue-500/20' 
                    : 'text-blue-200 hover:text-cyan-400 hover:bg-blue-900/20'}`}
              >
                <div className="flex items-center">
                  <span>{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-2 w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Navbar;