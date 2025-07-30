import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const GetInvolvedSection = ({ darkMode }) => {
    // Console log to check if the darkMode prop is being received and toggling
  console.log("GetInvolvedSection - darkMode prop:", darkMode); 

  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '', // Changed from 'name' to 'fullName' to match Strapi field
    county: '',
    email: '',
    phoneNumber: '', // Changed from 'phone' to 'phoneNumber' to match Strapi field
    areasOfInterest: [] // Changed from 'interests' to 'areasOfInterest' to match Strapi field
  });

  // State for form submission feedback
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Strapi API endpoint for your new collection type
  // Replace 'volunteer-applications' with the actual API ID Strapi generated (e.g., 'malaria-applicants')
  const STRAPI_API_URL = 'http://localhost:1337/api/volunteer-applications'; 

  const counties = [
    'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu', 'Garissa', 'Homa Bay',
    'Isiolo', 'Kajiado', 'Kakamele', 'Kericho', 'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii',
    'Kisumu', 'Kitui', 'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
    'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi', 'Nakuru', 'Nandi',
    'Narok', 'Nyamira', 'Nyandarua', 'Nyeri', 'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River',
    'Tharaka-Nithi', 'Trans Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
  ];

  const interests = [
    'Community Health Education',
    'Malaria Prevention Campaigns',
    'Maternal & Child Health',
    'Youth Leadership',
    'Policy Advocacy',
    'Resource Mobilization',
    'Training & Capacity Building',
    'Research & Data Collection'
  ];

  // Handles changes for text and select inputs
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handles changes for checkbox inputs (Areas of Interest)
  const handleInterestChange = (interest) => {
    const updatedInterests = formData.areasOfInterest.includes(interest)
      ? formData.areasOfInterest.filter(i => i !== interest)
      : [...formData.areasOfInterest, interest];
    
    setFormData({
      ...formData,
      areasOfInterest: updatedInterests
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setSubmissionMessage('Submitting your application...');
    setMessageType('info');

    try {
      // Strapi expects data nested under 'data' key for creation
      const payload = {
        data: {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          county: formData.county,
          email: formData.email,
          areasOfInterest: formData.areasOfInterest, // JSON field handles array directly
        }
      };

      console.log("Sending payload to Strapi:", payload);

      const response = await axios.post(STRAPI_API_URL, payload);

      console.log('Form submitted successfully:', response.data);
      setSubmissionMessage('Thank you for joining the Kenya Malaria Youth Corps! Your application has been received.');
      setMessageType('success');
      
      // Clear the form after successful submission
      setFormData({
        fullName: '',
        county: '',
        email: '',
        phoneNumber: '',
        areasOfInterest: []
      });

    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setSubmissionMessage('There was an error submitting your application. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <section id="get-involved" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-green-50 to-red-50'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Get <span className="text-red-600">Involved</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of young Kenyans making a difference in the fight against malaria.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl`}>
            {/* Submission Message Display */}
            {submissionMessage && (
              <div className={`mb-6 p-4 rounded-lg text-center ${
                messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              } ${darkMode ? (messageType === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200') : ''}`}>
                {submissionMessage}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  County *
                </label>
                <select
                  name="county"
                  value={formData.county}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="">Select your county</option>
                  {counties.map((county) => (
                    <option key={county} value={county}>{county}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email Address *
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
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200`}
                  placeholder="+254 XXX XXX XXX"
                />
              </div>
            </div>
            
            <div className="mb-8">
              <label className={`block text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Areas of Interest (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.areasOfInterest.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className={`ml-3 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {interest}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Join the Movement
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
