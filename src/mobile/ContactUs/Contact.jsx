import React from 'react';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

function Contact() {
  const contacts = [
    {
      name: "Aditya Rastogi",
      role: "Convenor",
      email: "aditya.rastogi.22cse@bmu.edu.in",
      phone: "+91 88264 27240",
      image: "/images/adityarast.webp",
      linkedin: "https://linkedin.com/in/adityarastogi",
    
    },
    {
      name: "Shrey Jaiswal",
      role: "Co-Convenor",
      email: "shrey.jaiswal.23cse@bmu.edu.in",
      phone: "+91 88823 45939",
      image: "/images/shrey.webp",
      linkedin: "https://linkedin.com/in/shreyjaiswal",
      
    }
  ];

  return (
    <div className="bg-gray-900 min-h-screen p-5 relative overflow-hidden">
      {/* Cosmic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stars */}
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-20 right-14 w-2 h-2 bg-blue-300 rounded-full opacity-50"></div>
        <div className="absolute top-40 left-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/5 w-1 h-1 bg-blue-200 rounded-full opacity-40"></div>
        
        {/* Galaxy-like background gradients */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-700 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-80 h-80 bg-indigo-600 rounded-full opacity-5 blur-3xl"></div>
      </div>
      
      {/* Header Section */}
      <div className="relative z-10 mb-8 pt-4">
        <h2 className="text-3xl font-bold text-center text-blue-300">Contact Us</h2>
        <div className="h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full"></div>
        <p className="text-blue-200 text-center mt-3 text-sm opacity-80">Connect with our cosmic team</p>
      </div>
      
      {/* Contact Cards */}
      <div className="space-y-6 relative z-10">
        {contacts.map((contact, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-blue-900/90 to-indigo-900/90 rounded-lg overflow-hidden border border-blue-800/50 shadow-lg"
          >
            {/* Top decorative strip */}
            <div className="h-2 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-indigo-500"></div>
            
            <div className="p-5">
              {/* Profile section */}
              <div className="flex items-center mb-4">
                {/* Profile Image with cosmic ring */}
                <div className="relative mr-4">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500/50">
                    <img 
                      src={contact.image} 
                      alt={contact.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Name and role */}
                <div>
                  <h3 className="text-xl font-semibold text-blue-200">{contact.name}</h3>
                  <p className="text-sm text-blue-400">{contact.role}</p>
                </div>
              </div>
              
              {/* Contact details */}
              <div className="space-y-3 mt-5">
                <a 
                  href={`mailto:${contact.email}`}
                  className="flex items-center p-3 bg-blue-900/50 rounded-lg hover:bg-blue-800/50 transition-colors"
                >
                  <Mail size={18} className="text-blue-300 mr-3" />
                  <span className="text-blue-200 text-sm">{contact.email}</span>
                </a>
                
                <a 
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="flex items-center p-3 bg-blue-900/50 rounded-lg hover:bg-blue-800/50 transition-colors"
                >
                  <Phone size={18} className="text-blue-300 mr-3" />
                  <span className="text-blue-200 text-sm">{contact.phone}</span>
                </a>
                
                {/* Social links */}
              
              </div>
            </div>
            
            {/* Decorative cosmic elements */}
            <div className="absolute bottom-2 right-2 w-1 h-1 bg-blue-400 rounded-full opacity-70"></div>
            <div className="absolute top-10 right-6 w-1 h-1 bg-purple-300 rounded-full opacity-50"></div>
          </div>
        ))}
      </div>
      
      {/* Extra contact messaging */}
      <div className="mt-8 text-center relative z-10">
        <p className="text-blue-300 text-sm">
          Have questions about our events?
        </p>
        <p className="text-blue-400 text-xs mt-1">
          Reach out to our team leads above
        </p>
      </div>
      
      {/* Bottom decorative cosmic element */}
      <div className="relative h-20 mt-8">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}

export default Contact;