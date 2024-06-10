import React, { useState } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS library
import './subscribe.css'; // Import CSS file for styling


const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false); // Define setSubscribed state
  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    arrows: false,
};

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email.trim() !== '') {
      try {
        // Fetch a single news article
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&pageSize=1&apiKey=0bd0b77b3e11497b81a2b732ee211ce2');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();

        // Extract the first news article
        const newsArticle = data.articles[0];
        let x=newsArticle.title
        let y=newsArticle.content
        let a=newsArticle.publishedAt
        let z=newsArticle.description
        let b=newsArticle.author
        // Send email using EmailJS
        await emailjs.send(
          'service_r3uk1qa', // Your EmailJS service ID
          'template_o0wu5bl', // Your updated EmailJS template ID
          { 
            email: email,
            published:a,
              title: x,
              content: y,
              des :z,
              author:b

          },
          'dod57Vx-U9C9lIH0U' // Your EmailJS user ID
        );
        console.log('Email sent successfully');
        setSubscribed(true);
      } catch (error) {
        console.error('Error sending email:', error);
        setSubscribed(false);
      }
    } else {
      alert('Please enter a valid email address.');
      setSubscribed(false);
    }
  };

  return (
    <div>
    <><div className="subscribe-container">
      
      <h2>Subscribe to Our Newsletter</h2>
      {subscribed ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
            required // HTML5 form validation
          />
          <button type="submit">Subscribe</button>
        </form>
      )}
      
    </div><div className="service-card-content">
    <br></br>
        <h3 className='text-center'>Stay Updated</h3>
        <p>Subscribe to our newsletter to receive the latest news, updates, and exclusive offers straight to your inbox.</p>
  <ul>
    <li>Be the first to know about new product launches.</li>
    <li>Get exclusive discounts and promotions.</li>
    <li>Receive helpful tips and guides related to our products or services.</li>
    <li>Stay informed about industry trends and developments.</li>
    <li>Access subscriber-only content and resources.</li>
  </ul>
  <p>Join our community of subscribers today!</p>
      </div></>
      </div>
  );
};

export default Subscribe;
