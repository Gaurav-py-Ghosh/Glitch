import React from 'react';
import { ExternalLink } from 'lucide-react';

function Events() {
  // Sample events data\

 
  const events = [
    {
      id: 1,
      title: "HackBMU 7.0",
      location: "BML Munjal University (BMU), Gurgaon",
    
      image: "/events/hackbmu.webp",
      url: "https://unstop.com/hackathons/hackbmu-70-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432718"
    },
    {
      id: 2,
      title: "Dev Dash",
      location: "BML Munjal University (BMU), Gurgaon",
    
      image: "/events/dev-dash.webp",
      url: "https://unstop.com/hackathons/dev-dash-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432394"
    },
    {
      id: 3,
      title: "Bit by Bit",
      location: "BML Munjal University (BMU), Gurgaon",
      
      image: "/events/bitbybit.webp",
      url: "https://unstop.com/hackathons/bit-by-bit-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432595"
    },
    {
      id: 4,
      title: "Emoji Explorer",
      location: "BML Munjal University (BMU), Gurgaon",
    
      image: "/events/emoji-explorer.webp",
      url: "https://unstop.com/competitions/emoji-explorer-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432375"
    },
    {
      id: 5,
      title: "Capture the Flag",
      location: "BML Munjal University (BMU), Gurgaon",
     
      image: "/events/capture-the-flag.webp",
      url: "https://unstop.com/hackathons/capture-the-flag-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1437230"
    },
    {
      id: 6,
      title: "Tech Trap",
      location: "BML Munjal University (BMU), Gurgaon",
   
      image: "/events/tech-trap.webp",
      url: "https://unstop.com/hackathons/tech-trap-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1433764"
    },
    
    {
      id: 7,
      title: "Paint Off",
      location: "BML Munjal University (BMU), Gurgaon",
    
      image: "/events/paint-off.webp",
      url: "https://unstop.com/competitions/paint-off-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1448180"
    },
    {
      id: 8,
      title: "Duality Extended",
      location: "BML Munjal University (BMU), Gurgaon",
     
      image: "/events/duality-extended.webp",
      url: "https://unstop.com/hackathons/duality-extended-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432586"
    },
    {
      id: 9,
      title: "Horizon Talks",
      location: "BML Munjal University (BMU), Gurgaon",
     
      image: "/events/horizon-talks.webp",
      url: "https://unstop.com/workshops-webinars/horizon-talks-glitch-bml-munjal-university-bmu-gurgaon-1432372"
    }
  ];

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };
  

  return (
    <div className="bg-gray-900 min-h-screen p-4">
      {/* Cosmic header with stars */}
      <div className="relative mb-6">
        <h1 className="text-3xl font-bold text-blue-300 text-center mb-2">Upcoming Events</h1>
        <div className="h-1 bg-gradient-to-r from-blue-700 via-purple-500 to-blue-500 rounded-full mb-2"></div>
        <p className="text-blue-200 text-center">Explore our cosmic collection of tech events</p>
        
        {/* Decorative stars - absolute positioned */}
        <div className="absolute -top-2 left-2 w-2 h-2 bg-white rounded-full opacity-70"></div>
        <div className="absolute top-6 right-4 w-1 h-1 bg-white rounded-full opacity-80"></div>
        <div className="absolute top-10 left-8 w-1 h-1 bg-white rounded-full opacity-50"></div>
      </div>
      
      {/* Events grid - optimized for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event) => (
          <div 
            key={event.id}
            onClick={() => handleCardClick(event.url)}
            className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer border border-blue-700"
          >
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent"></div>
              <div className="absolute bottom-2 right-2 bg-blue-500/70 rounded-full p-1">
                <ExternalLink size={16} className="text-white" />
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-200 mb-1">{event.title}</h2>
              <p className="text-sm text-blue-300 mb-2">{event.location}</p>
              
              <div className="flex justify-between items-center">
                <span className="bg-blue-800/60 text-blue-200 text-xs px-2 py-1 rounded-full">
                  {event.date}
                </span>
                <div className="flex space-x-1">
                  {/* Small decorative stars */}
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-1 h-1 bg-blue-300 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative cosmic elements */}
      <div className="relative mt-8 h-10">
        <div className="absolute left-1/4 top-2 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
        <div className="absolute left-2/3 top-5 w-3 h-3 bg-purple-400 rounded-full opacity-40"></div>
        <div className="absolute left-1/2 top-8 w-1 h-1 bg-white rounded-full opacity-70"></div>
      </div>
    </div>
  );
}

export default Events;