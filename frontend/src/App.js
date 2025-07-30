import React, { useState, useEffect } from 'react';
import BlogSection from './components/BlogSection'; 
import axios from 'axios'; // Import Axios
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import GetInvolvedSection from './components/GetInvolvedSection';
import ContactFormSection from './components/ContactFormSection'; 

import './App.css';

// Kenya Malaria Youth Corps Website
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Dark mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Hero Section Component
  const HeroSection = () => (
    <section id="home" className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-red-50'}`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/14739574/pexels-photo-14739574.jpeg" 
          alt="African Youth in Healthcare"
          className="w-full h-full object-cover opacity-30"
        />
        <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-gray-900/90 to-green-900/80' : 'bg-gradient-to-r from-green-900/80 to-red-900/70'}`}></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col justify-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="\kemya.png" 
              alt="Kenya Malaria Youth Corps Logo"
              className="w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse-custom"
            />
          </div>
          <h1 className={`text-5xl lg:text-7xl font-bold mb-6 leading-tight ${darkMode ? 'text-white' : 'text-white'}`}>
            <span className="text-green-400">Unite</span> Against <span className="text-red-400">Malaria</span>
          </h1>
          <p className={`text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-100'}`}>
            Empowering youth from all 47 counties of Kenya to eliminate malaria, improve maternal and child health, and advance universal healthcare access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => scrollToSection('get-involved')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Join the Movement
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Floating Animation Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse absolute top-20 left-10 w-4 h-4 bg-green-400 rounded-full opacity-60"></div>
        <div className="animate-pulse absolute top-40 right-20 w-6 h-6 bg-red-400 rounded-full opacity-40 animation-delay-1000"></div>
        <div className="animate-pulse absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animation-delay-2000"></div>
      </div>
    </section>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md shadow-lg`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/kemya.png" 
              alt="Kenya Malaria Youth Corps Logo"
              className="w-12 h-12 object-contain"
            />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Kenya Malaria Youth Corps
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {['home', 'about', 'impact', 'advocacy', 'get-involved', 'blog', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize font-medium transition-colors duration-200 ${
                  activeSection === section 
                    ? 'text-green-600' 
                    : darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {section.replace('-', ' ')}
              </button>
            ))}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden mt-4 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl`}>
            {['home', 'about', 'impact', 'advocacy', 'get-involved', 'blog', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left px-4 py-2 capitalize font-medium transition-colors duration-200 ${
                  darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                {section.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  // About Section Component
  const AboutSection = () => (
    <section id="about" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About <span className="text-green-600">Our Movement</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We are a passionate social movement uniting young individuals across Kenya's 47 counties in the fight against malaria.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1658112667912-27344f9bba4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIweW91dGglMjB0ZWFtJTIwY29sbGFib3JhdGlvbnxlbnwwfHx8Z3JlZW58MTc1MDkyNzYxNXww&ixlib=rb-4.1.0&q=85"
              alt="Youth Team Collaboration"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'} border-l-4 border-green-600`}>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Mission</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  To mobilize and empower youth across Kenya to actively participate in malaria elimination efforts while advancing universal healthcare access.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-red-50'} border-l-4 border-red-600`}>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Our Vision</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  A malaria-free Kenya where every child and mother has access to quality healthcare, driven by the power of youth activism.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} border-l-4 border-yellow-600`}>
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Key Focus Areas</h3>
                <ul className={`space-y-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Malaria prevention & education</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Maternal & child health improvement</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Universal healthcare advocacy</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>Community health education</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Impact Section Component
  const ImpactSection = () => (
    <section id="impact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-red-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our <span className="text-red-600">Impact</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Together, we're making a real difference in communities across Kenya.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { number: '47', label: 'Counties Reached', color: 'green' },
            { number: '10K+', label: 'Youth Volunteers', color: 'red' },
            { number: '500K+', label: 'Lives Impacted', color: 'yellow' },
            { number: '1M+', label: 'Bed Nets Distributed', color: 'blue' }
          ].map((stat, index) => (
            <div key={index} className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transform hover:scale-105 transition-all duration-300`}>
              <div className={`text-4xl lg:text-5xl font-bold mb-3 text-${stat.color}-600`}>
                {stat.number}
              </div>
              <div className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Community Health Engagement
            </h3>
            <div className="space-y-6">
              {[
                'Malaria prevention education campaigns',
                'Bed net distribution programs',
                'Community health worker training',
                'Maternal health awareness initiatives',
                'Youth-led health advocacy'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img 
              src="https://images.pexels.com/photos/5878507/pexels-photo-5878507.jpeg"
              alt="Community Health Engagement"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );

  // Advocacy Section Component
  const AdvocacySection = () => (
    <section id="advocacy" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Advocacy & <span className="text-green-600">Communication</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Amplifying youth voices for healthcare policy change and community engagement.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1648731232061-b5016716fcb6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwyfHx5b3V0aCUyMGFjdGl2aXNtJTIwQWZyaWNhfGVufDB8fHxncmVlbnwxNzUwOTI3NTkxfDA&ixlib=rb-4.1.0&q=85"
              alt="Youth Activism"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
          </div>
          <div className="space-y-8">
            <h3 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Our Advocacy Efforts
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Policy Advocacy',
                  description: 'Working with government to strengthen malaria prevention policies',
                  icon: '📋'
                },
                {
                  title: 'Community Campaigns',
                  description: 'Grassroots education and awareness programs',
                  icon: '📢'
                },
                {
                  title: 'Youth Mobilization',
                  description: 'Empowering young leaders across all counties',
                  icon: '👥'
                },
                {
                  title: 'Resource Mobilization',
                  description: 'Securing funding and supplies for malaria prevention',
                  icon: '💼'
                }
              ].map((item, index) => (
                <div key={index} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.title}
                      </h4>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-green-800 to-red-800' : 'bg-gradient-to-r from-green-600 to-red-600'} text-white`}>
          <h3 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { date: 'March 15', event: 'World Malaria Day Preparation', location: 'Nairobi' },
              { date: 'March 22', event: 'Youth Health Summit', location: 'Mombasa' },
              { date: 'April 5', event: 'Community Outreach Program', location: 'Kisumu' }
            ].map((event, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-lg font-bold mb-2">{event.date}</div>
                <div className="text-xl font-semibold mb-1">{event.event}</div>
                <div className="opacity-90">{event.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  // Footer Component
  const Footer = () => (
    <footer className={`relative py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-900'} text-white overflow-hidden`}>
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1650502389479-d4f6caecbbd2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwbGFuZHNjYXBlJTIwY3VsdHVyZXxlbnwwfHx8Z3JlZW58MTc1MDkyNzU5OXww&ixlib=rb-4.1.0&q=85"
          alt="African Landscape"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="\kemya.png" 
                alt="Kenya Malaria Youth Corps Logo"
                className="w-16 h-16 object-contain mb-6"
              />
              <span className="text-xl font-bold">Kenya Malaria Youth Corps</span>
            </div>
            <p className="text-gray-300 mb-6">
              Uniting youth across Kenya's 47 counties in the fight against malaria and for universal healthcare access.
            </p>
            <div className="flex space-x-4">
              {[
                 { name: 'Facebook', icon: <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />, url: 'https://web.facebook.com/MalariaYouthKE' },
            { name: 'X', icon: <img src="/twitter.png" alt="X" className="w-6 h-6" />, url: 'https://x.com/MalariaYouthKE' },
            { name: 'Instagram', icon: <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />, url: 'https://www.instagram.com/kenyamalariayouthcorps/' },
            { name: 'Linkedin', icon: <img src="/linkedin.png" alt="Linkedin" className="w-6 h-6" />, url: 'https://www.linkedin.com/company/kenya-malaria-youth-corps/posts/?feedView=all' },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.name === 'LinkedIn' ? '_blank' : '_self'}
                  rel={social.name === 'LinkedIn' ? 'noopener noreferrer' : ''}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-200"
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Impact', 'Get Involved', 'Blog', 'Contact'].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.toLowerCase().replace(' ', '-'))}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Focus Areas</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Malaria Prevention</li>
              <li>Maternal Health</li>
              <li>Child Health</li>
              <li>Universal Healthcare</li>
              <li>Youth Empowerment</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news and events.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Kenya Malaria Youth Corps. All rights reserved. | 
            <span className="text-green-400"> Together, we can eliminate malaria.</span>
          </p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <AdvocacySection />
      <GetInvolvedSection darkMode={darkMode}/>
      <BlogSection darkMode={darkMode} />
      <ContactFormSection darkMode={darkMode} />
      <Footer />
    </div>
  );
};

export default App;