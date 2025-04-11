import React, { useState } from 'react';

function Team() {
  const [activeTeam, setActiveTeam] = useState("CORE TEAM");
  
  const teamData = {
    name: "MEET THE TEAM",
    teams: [
      {
        name: "CORE TEAM",
        members: [
          { name: "Aditya Rastogi", role: "Convenor", img: "/images/adityarast.webp" },
          { name: "Shrey Jaiswal", role: "Co-Convenor", img: "/images/shrey.webp" },
          { name: "Prakhar Srivastava", role: "Core", img: "/images/prakhar.webp" },
          { name: "Divyansh Verma", role: "Core", img: "/images/divyansh.webp" },
          { name: "Guneet Chawal", role: "Core", img: "/images/Guneet.webp" },
          { name: "Ananya Aggarwal", role: "Core", img: "/images/Ananya.webp" },
        ],
      },
      {
        name: "SPONSORSHIP TEAM",
        members: [
          { name: "Purvanshu", role: "Lead", img: "/images/purvanshu.webp" },
          { name: "Shrey", role: "Lead", img: "/images/shrey.webp" },
        ],
      },
      {
        name: "OPERATIONS TEAM",
        members: [
          { name: "Vanshita", role: "Lead", img: "/images/vanshita.webp" },
          { name: "Tanmay", role: "Lead", img: "/images/tanmay.webp" },
        ],
      },
      {
        name: "SOCIAL MEDIA TEAM",
        members: [
          { name: "Shreya", role: "Lead", img: "/images/shreya.webp" },
          { name: "Vanshika", role: "Lead", img: "/images/vanshika.webp" },
        ],
      },
      {
        name: "ENTRY MANAGEMENT TEAM",
        members: [
          { name: "Akriti", role: "Lead", img: "/images/akriti.webp" },
          { name: "Kavya", role: "Lead", img: "/images/kavya.webp" },
        ],
      },
      {
        name: "DECOR TEAM",
        members: [
          { name: "Vanshita", role: "Lead", img: "/images/vanshita.webp" },
          { name: "Tanmay", role: "Lead", img: "/images/tanmay.webp" },
          { name: "Sejal", role: "Lead", img: "/images/sejal.webp" },
          { name: "Gaurav", role: "Lead", img: "/images/gaurav.webp" },
          { name: "Purvanshu", role: "Lead", img: "/images/purvanshu.webp" },
        ],
      },
      {
        name: "TECHNICAL TEAM",
        members: [
          { name: "Sejal", role: "Lead", img: "/images/sejal.webp" },
          { name: "Gaurav", role: "Lead", img: "/images/gaurav.webp" },
        ],
      },
      {
        name: "DESIGN TEAM",
        members: [{ name: "Suvansh", role: "Lead", img: "/images/suvansh.webp" }],
      },
      {
        name: "OFFLINE MARKETING TEAM",
        members: [
          { name: "Molly", role: "Lead", img: "/images/molly.webp" },
          { name: "Yash", role: "Lead", img: "/images/yash.webp" },
        ],
      },
      {
        name: "CONTENT TEAM",
        members: [{ name: "Kavya", role: "Lead", img: "/images/kavya.webp" }],
      },
    ]
  };

  // Get current active team members
  const activeMembers = teamData.teams.find(team => team.name === activeTeam)?.members || [];

  return (
    <div className="bg-gray-900 min-h-screen p-4 pt-6 relative overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-300 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-12 w-1 h-1 bg-white rounded-full opacity-50"></div>
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-indigo-400 rounded-full opacity-30 animate-pulse" style={{animationDuration: '4s'}}></div>
        <div className="absolute bottom-24 right-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-40 left-16 w-1 h-1 bg-blue-200 rounded-full opacity-40 animate-pulse" style={{animationDuration: '3s'}}></div>
        
        {/* Galaxy-like background gradients */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-600 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-indigo-500 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative z-10 mb-8">
        <h2 className="text-3xl font-bold text-center text-blue-300">{teamData.name}</h2>
        <div className="h-1 w-40 mx-auto mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-full"></div>
        <p className="text-blue-200 text-center mt-3 text-sm opacity-80">The cosmic minds behind our stellar events</p>
      </div>
      
      {/* Team Navigation Tabs */}
      <div className="relative z-10 mb-6 overflow-x-auto hide-scrollbar">
        <div className="flex space-x-2 pb-2 min-w-max">
          {teamData.teams.map((team) => (
            <button
              key={team.name}
              onClick={() => setActiveTeam(team.name)}
              className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                activeTeam === team.name
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-blue-900/40 text-blue-300 border border-blue-800/50'
              }`}
            >
              {team.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Team Members Grid */}
      <div className="grid grid-cols-2 gap-4 relative z-10">
        {activeMembers.map((member, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-lg p-3 border border-blue-800/50 backdrop-blur-sm transform transition-all duration-300 hover:scale-105"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className="flex flex-col items-center">
              {/* Profile Image with cosmic ring */}
              <div className="relative mb-3">
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse-slow"></div>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-500/50">
                  <img 
                    src={member.img || "/api/placeholder/100/100"} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/100/100";
                    }}
                  />
                </div>
                {/* Orbital ring decoration */}
                <div className="absolute -inset-1 border border-blue-400/20 rounded-full rotate-45"></div>
              </div>
              
              {/* Member details */}
              <h3 className="text-base font-medium text-blue-200 text-center">{member.name}</h3>
              <p className="text-xs text-blue-400 mt-1 bg-blue-900/30 px-2 py-0.5 rounded-full">
                {member.role}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Empty state if no team members */}
      {activeMembers.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-blue-300 opacity-70">No team members found</p>
        </div>
      )}
      
      {/* CSS for custom animations and scrollbar hiding */}
      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s infinite alternate;
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(1.05); }
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Team;