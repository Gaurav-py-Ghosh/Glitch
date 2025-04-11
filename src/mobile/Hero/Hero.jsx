import React, { useState, useEffect } from 'react';
import { Star, ChevronRight } from 'lucide-react';

export default function CosmosHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Set event date
  const eventDate = new Date('2025-04-18T00:00:00');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const handleRegisterClick = () => {
    window.open("https://unstop.com/college-fests/glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-355060", "_blank");
  };
  
  // Format numbers with leading zeros
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-blue-950 to-black overflow-hidden text-white font-sans">
      {/* Animated cosmic background */}
      <div className="absolute inset-0 z-0 opacity-60">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `twinkle ${Math.random() * 8 + 2}s infinite alternate ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Glowing particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, 255, 0.8), rgba(0, 238, 255, 0.1))`,
              boxShadow: '0 0 10px rgba(0, 238, 255, 0.6)',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>
      
      {/* Cosmic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-blue-900/20 z-0"></div>
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center pt-12 pb-8 px-5 min-h-screen">
        {/* Floating cosmic accent elements */}
        <div className="absolute top-24 left-2 opacity-70">
          <Star size={12} fill="#50E3C2" color="#50E3C2" />
        </div>
        <div className="absolute top-40 right-6 opacity-50">
          <Star size={16} fill="#50E3C2" color="#50E3C2" />
        </div>
        <div className="absolute bottom-32 left-6 opacity-60">
          <Star size={14} fill="#50E3C2" color="#50E3C2" />
        </div>
        
        {/* Glowing orbit circle */}
        <div className="absolute w-64 h-64 rounded-full border border-cyan-500/20 top-20 -left-32 opacity-30"></div>
        <div className="absolute w-80 h-80 rounded-full border border-purple-500/10 bottom-20 -right-40 opacity-20"></div>
        
        {/* Title section with 3D effect */}
        <div className="relative z-20 text-center mb-6 mt-4">
          <h1 className="text-5xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 drop-shadow-lg">
            GLITCH
          </h1>
          <div className="mt-1 text-xl tracking-wider font-medium text-gray-200">
          The Ultimate Tech Extravaganza!
          </div>
          <div className="h-0.5 w-32 mt-5 mb-5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </div>
        
        {/* Description with improved typography */}
        <p className="text-center text-gray-300 leading-relaxed text-sm max-w-md mb-8 px-2">
          <span className="text-cyan-300">Glitch 2025 </span>is an annual technical extravaganza organized by the BML Munjal University ACM Student Chapter in collaboration with regional ACM student chapters across India.
        </p>
        
        {/* Stylized countdown section */}
        <div className="w-full max-w-md bg-gradient-to-br from-gray-900/90 to-blue-950/90 backdrop-blur-md rounded-xl p-6 mb-8 border border-cyan-900/30 shadow-lg shadow-blue-900/20">
          <h3 className="text-center font-medium mb-4 text-cyan-200 tracking-widest">COUNTDOWN TO LIFTOFF</h3>
          
          <div className="flex justify-between items-center">
            {/* Days */}
            <div className="flex-1 text-center relative">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-lg border border-blue-700/20 shadow-inner">
                <div className="text-2xl font-bold text-cyan-400">{formatNumber(timeLeft.days)}</div>
                <div className="text-xs mt-1 tracking-wider text-gray-400">DAYS</div>
              </div>
            </div>
            
            <div className="text-cyan-500 mx-1 font-light">:</div>
            
            {/* Hours */}
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-lg border border-blue-700/20 shadow-inner">
                <div className="text-2xl font-bold text-cyan-400">{formatNumber(timeLeft.hours)}</div>
                <div className="text-xs mt-1 tracking-wider text-gray-400">HOURS</div>
              </div>
            </div>
            
            <div className="text-cyan-500 mx-1 font-light">:</div>
            
            {/* Minutes */}
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-lg border border-blue-700/20 shadow-inner">
                <div className="text-2xl font-bold text-cyan-400">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-xs mt-1 tracking-wider text-gray-400">MINS</div>
              </div>
            </div>
            
            <div className="text-cyan-500 mx-1 font-light">:</div>
            
            {/* Seconds */}
            <div className="flex-1 text-center">
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-3 rounded-lg border border-blue-700/20 shadow-inner">
                <div className="text-2xl font-bold text-cyan-400">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-xs mt-1 tracking-wider text-gray-400">SECS</div>
              </div>
            </div>
          </div>
          
          {/* Enhanced timeline */}
          <div className="mt-8 mb-2">
            <div className="w-full h-1.5 bg-gray-800/80 rounded-full relative">
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 -top-1.5 left-0 shadow-lg shadow-cyan-500/50 z-10"></div>
              <div className="absolute w-1 h-6 bg-cyan-400/20 -top-2.5 left-0"></div>
              <div className="absolute w-2/5 h-1.5 bg-gradient-to-r from-cyan-400 to-transparent rounded-full"></div>
              
              <div className="absolute w-3 h-3 rounded-full bg-gray-700 border border-cyan-900/50 -top-1 left-1/2 transform -translate-x-1/2"></div>
              <div className="absolute w-3 h-3 rounded-full bg-gray-700 border border-cyan-900/50 -top-1 right-0"></div>
            </div>
            
            <div className="flex justify-between mt-3 text-xs font-medium">
              <div className="w-1/3 text-center text-cyan-300">18TH</div>
              <div className="w-1/3 text-center text-gray-400">19TH</div>
              <div className="w-1/3 text-center text-gray-400">20TH</div>
            </div>
          </div>
        </div>
        
        {/* Enhanced register button */}
        <button 
          onClick={handleRegisterClick}
          className="relative group px-8 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg font-bold text-white text-sm tracking-wider overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out"></div>
          <div className="relative flex items-center">
            <span>REGISTER NOW</span>
            <ChevronRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="absolute inset-0 -z-10 border-2 border-cyan-400/30 rounded-lg blur-sm translate-x-1 translate-y-1"></div>
        </button>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}