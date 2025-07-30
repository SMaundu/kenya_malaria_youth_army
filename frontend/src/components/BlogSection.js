import React, { useState, useEffect } from 'react'; // Essential React hooks
import axios from 'axios'; // Essential for API calls

const BlogSection = ({ darkMode }) => { 
  // Console log to check if the darkMode prop is being received and toggling
  console.log("BlogSection - darkMode prop:", darkMode); 

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Strapi API URL for blog posts, with 'populate=image' to include image data
  const STRAPI_API_URL = 'http://localhost:1337/api/blog-posts?populate=image'; 

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        console.log("Fetching from API:", STRAPI_API_URL);
        const response = await axios.get(STRAPI_API_URL);
        
        // Determine the correct data array from the API response.
        // It could be directly 'response.data' or nested under 'response.data.data'.
        // This handles cases where Strapi returns { data: [...] } or just [...]
        const apiResponseData = Array.isArray(response.data.data) ? response.data.data : response.data;
        console.log("Raw API Response Data (from React component):", apiResponseData); 

        // Validate if the fetched data is an array
        if (!Array.isArray(apiResponseData)) {
          throw new Error("API response is not an array or is empty.");
        }

        // Transform the raw API data into a format suitable for your component
        const transformedPosts = apiResponseData
          .map(item => { // Changed 'post' to 'item' for consistency with previous debugging
            // Add a guard clause to prevent crashes from malformed or empty posts.
            // This can happen if an entry in Strapi is corrupted or incomplete.
            if (!item || (!item.attributes && !item.id)) { // Check for id or attributes
              console.warn("Skipping a malformed blog post object from API:", item);
              return null;
            }

            // Strapi v4 typically nests fields under 'attributes'.
            // If your API is returning flat, 'item.attributes' might be undefined.
            // We'll try to get attributes, or use the item directly if flat.
            const attributes = item.attributes || item; // Use item directly if attributes is missing

            // Format the date for display
            const rawDate = attributes.date || new Date().toISOString();
            const formattedDate = new Date(rawDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });

            // Handle image URL
            // Check if image data is nested as an array (multiple media) or single object.
            // Based on previous debugging, it was item.image?.url. Let's be robust.
            let imageUrl = attributes.image?.url; // For flat image object directly on attributes

            // If image is a relation (common in Strapi v4), it might be attributes.image.data.attributes.url
            if (!imageUrl && attributes.image?.data) {
                // Check if it's a single image or an array of images
                if (Array.isArray(attributes.image.data)) {
                    imageUrl = attributes.image.data[0]?.attributes?.url; // Take the first image if multiple
                } else {
                    imageUrl = attributes.image.data.attributes?.url; // Single image object
                }
            }


            return {
              id: item.id, // ID is usually directly on the item
              // The field name in Strapi is "Title" (capital T) or "title" (lowercase t)?
              // We'll try 'title' first, then 'Title'
              title: attributes.title || attributes.Title || 'Untitled Blog Post', 
              excerpt: attributes.excerpt || 'No excerpt available.', 
              date: formattedDate, 
              category: attributes.category || 'Uncategorized', 
              
              image: imageUrl 
                     ? `http://localhost:1337${imageUrl}` 
                     : `https://placehold.co/400x250/cccccc/333333?text=Image+Missing`,
            };
          })
          .filter(Boolean); // Remove any null entries that were skipped.

        setBlogPosts(transformedPosts);

      } catch (err) {
        setError(err);
        console.error("Failed to fetch blog posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []); // Empty dependency array means this effect runs once on component mount

  // Render loading, error, or blog posts
  if (loading) {
    return (
      <section id="blog" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="container mx-auto px-6">
          <p>Loading latest updates...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="blog" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} text-center text-red-500`}>
        <div className="container mx-auto px-6">
          <p>Error loading blog posts: {error.message}. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Latest <span className="text-green-600">Updates</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Stay informed with health tips, success stories, and upcoming events.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}>
                <img 
                  src={post.image} 
                  alt={post.title} // Ensure alt text is meaningful for accessibility
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-600 text-sm font-medium">{post.category}</span> 
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date}</span>
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {post.title} 
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {post.excerpt}
                  </p>
                  <a 
                    href="https://x.com/hashtag/MyKEMYCStory?src=hashtag_click" // Direct link to Twitter hashtag
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice for target="_blank"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))
          ) : (
            // Message displayed if no blog posts are found after loading
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center col-span-full`}>No blog posts available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
