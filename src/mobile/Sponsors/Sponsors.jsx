import React, { useState, useEffect } from 'react';

function Sponsors() {
  const [visibleSponsors, setVisibleSponsors] = useState([]);
  
  // Sample sponsors data based on your provided code
  const sponsors = [
    {
      name: "Spheron",
      logo: "https://cdn.brandfetch.io/idc9pQIv4m/w/820/h/984/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Decentralized cloud hosting for modern web apps.",
    },
    {
      name: "Balsamiq",
      logo: "https://cdn.brandfetch.io/idG_yTIc33/w/820/h/206/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Wireframing tool that helps teams plan user interfaces quickly.",
    },
    {
      name: "1Password",
      logo: "https://cdn.brandfetch.io/ids0xxqhX-/w/272/h/52/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "A secure password manager to protect your online accounts.",
    },
    {
      name: "Major League Hacking (MLH)",
      logo: "https://cdn.brandfetch.io/id76pHTjeR/w/820/h/346/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Official student hackathon league supporting innovation and learning.",
    },
    {
      name: "Axure",
      logo: "https://cdn.brandfetch.io/id99STEpoQ/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "UX prototyping and wireframing software for teams.",
    },
    {
      name: "Leading Learners",
      logo: "/sponsors/leading.webp",
      description: "Platform offering educational resources and student support programs.",
    },
    {
      name: "Taskade",
      logo: "https://cdn.brandfetch.io/idmPQXX073/w/820/h/219/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Collaborative task management and team productivity platform.",
    },
    {
      name: "echo3D",
      logo: "https://cdn.brandfetch.io/ideSDI1U4x/w/521/h/96/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Cloud platform for building and deploying 3D/AR/VR content.",
    },
    {
      name: "Wolfram",
      logo: "https://cdn.brandfetch.io/idcT0xhnHg/w/820/h/854/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Advanced computation software and knowledge engine.",
    },
    {
      name: "Devfolio",
      logo: "/sponsors/devfolio.png",
      description: "India's largest community of developers & hackathons.",
    },
    {
      name: "Coding Ninjas",
      logo: "https://ninjasfiles.s3.amazonaws.com/logo.png",
      description: "Online coding courses for developers and learners.",
    },
    {
      name: "Coding Blocks",
      logo: "https://cdn.brandfetch.io/idlWUAEYyO/w/204/h/86/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
      description: "Coding Bootcamps and online courses for software development.",
    },
  ];

  // Set up intersection observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sponsorId = parseInt(entry.target.dataset.id);
            if (!visibleSponsors.includes(sponsorId)) {
              setVisibleSponsors(prev => [...prev, sponsorId]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sponsor cards
    document.querySelectorAll('.sponsor-card').forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleSponsors]);

  return (
    <div className="bg-gray-900 min-h-screen p-4 overflow-hidden relative">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-300 rounded-full opacity-70"></div>
        <div className="absolute top-20 right-12 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-32 left-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-40"></div>
        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-blue-200 rounded-full opacity-60"></div>
      </div>
      
      {/* Title with animation */}
      <div className="relative z-10 mb-8 opacity-0 animate-fade-in-down" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
        <h2 className="text-3xl font-bold text-center text-blue-300">Past Sponsors</h2>
        <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full"></div>
      </div>
      
      {/* Sponsors grid - optimized for mobile */}
      <div className="grid grid-cols-1 gap-6">
        {sponsors.map((sponsor, index) => (
          <div 
            key={index}
            data-id={index}
            className={`sponsor-card bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-lg p-4 border border-blue-700/50 shadow-lg backdrop-blur-sm transform transition-all duration-700 ${
              visibleSponsors.includes(index) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{transitionDelay: `${index * 0.1}s`}}
          >
            <div className="flex flex-col items-center">
              {/* Logo area with glow effect */}
              <div className="relative mb-4 p-4 bg-gradient-to-b from-blue-900/50 to-indigo-900/30 rounded-lg w-full flex justify-center items-center h-24">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="cosmic-glow absolute -inset-2 bg-blue-500/10 blur-xl"></div>
                </div>
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="max-h-20 max-w-full object-contain relative z-10"
                />
              </div>
              
              {/* Sponsor details */}
              <h3 className="text-xl font-semibold text-blue-200 mb-2 text-center">{sponsor.name}</h3>
              
              {/* Description with staggered animation */}
              <p className={`text-sm text-blue-300 text-center opacity-0 ${
                visibleSponsors.includes(index) ? 'animate-fade-in' : ''
              }`} style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
                {sponsor.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom decorative elements */}
      <div className="h-20 relative mt-8">
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent rounded-full"></div>
      </div>
      
      {/* CSS for custom animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .cosmic-glow {
          animation: pulse 4s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

export default Sponsors;