import React, { useRef } from 'react';
import CosmosHero from '../Hero/Hero';
import Navbar from '../Navbar/Navbar';
import Events from '../Events/Events';
import Sponsors from '../Sponsors/Sponsors';
import Team from '../Team/Team';
import Contact from '../ContactUs/Contact';
import Footer from '../Footer/Footer';

function Home() {
  // Create refs for each section
  const homeRef = useRef(null);
  const eventsRef = useRef(null);
  const sponsorsRef = useRef(null);
  const teamRef = useRef(null);
  const contactRef = useRef(null);

  // Function to scroll to a specific section
  const scrollToSection = (sectionId) => {
    const refs = {
      'home': homeRef,
      'events': eventsRef,
      'past-sponsors': sponsorsRef,
      'team': teamRef,
      'contact-us': contactRef
    };
    
    const ref = refs[sectionId];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar scrollToSection={scrollToSection} />
      
      <div id="home" ref={homeRef}>
        <CosmosHero />
      </div>
      
      <div id="events" ref={eventsRef}>
        <Events />
      </div>
      
      <div id="past-sponsors" ref={sponsorsRef}>
        <Sponsors />
      </div>
      
      <div id="team" ref={teamRef}>
        <Team />
      </div>
      
      <div id="contact-us" ref={contactRef}>
        <Contact />
      </div>
      
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default Home;