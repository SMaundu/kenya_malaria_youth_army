import React, { useState } from 'react'; // Essential React hooks
import axios from 'axios'; // Essential for API calls

// Corrected: The component name now matches the default export name
const ContactFormSection = ({ darkMode }) => { 
  // Console log to check if the darkMode prop is being received and toggling
  console.log("ContactFormSection - darkMode prop:", darkMode); 

  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // State for form submission feedback
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Strapi API endpoint for your 'Contact Message' collection type
  // Replace 'contact-messages' with the actual API ID Strapi generated if different
  const STRAPI_API_URL = 'http://localhost:1337/api/contact-messages'; 

  // Handles changes for all input fields
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handles form submission to Strapi
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setSubmissionMessage('Sending your message...');
    setMessageType('info');

    try {
      // Strapi expects data nested under 'data' key for creation
      const payload = {
        data: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      };

      console.log("Sending contact form payload to Strapi:", payload);

      const response = await axios.post(STRAPI_API_URL, payload);

      console.log('Contact form submitted successfully:', response.data);
      setSubmissionMessage('Thank you! Your message has been sent successfully.');
      setMessageType('success');
      
      // Clear the form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting contact form:', error.response ? error.response.data : error.message);
      setSubmissionMessage('There was an error sending your message. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get in <span className="text-green-600">Touch</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions or want to collaborate? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
              {/* Submission Message Display */}
              {submissionMessage && (
                <div className={`mb-6 p-4 rounded-lg text-center ${
                  messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                } ${darkMode ? (messageType === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200') : ''}`}>
                  {submissionMessage}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Message subject"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact Information and Social Media Section */}
          <div className="space-y-8">
            <div>
              <h3 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email</div>
                    <a 
                      href="mailto:info@malariayouth.ke"
                      className={`${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} transition-colors duration-200`}
                    >
                      info@malariayouth.ke
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Phone</div>
                    <a 
                      href="tel:+254706655274"
                      className={`${darkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-600'} transition-colors duration-200`}
                    >
                      +254 706 655 274
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Address</div>
                    <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Nairobi, Kenya</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Follow Us
              </h3>
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
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} flex items-center justify-center transition-all duration-200 transform hover:scale-110`}
                  >
                    <span className="text-xl">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
