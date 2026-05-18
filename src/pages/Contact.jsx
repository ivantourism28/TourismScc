import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/Contact.css';

function Contact() {
  const { pageBgs } = useAdmin();
  const bg = pageBgs?.contact?.image_url;
  const headerStyle = bg
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-page">
      <section className="contact-header" style={headerStyle}>
        <div className="contact-header-content">
          <h1>Contact Us</h1>
          <p>Get in touch with San Carlos City Tourism</p>
        </div>
      </section>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Information</h2>
          
          <div className="info-item">
            <h3>📧 Email</h3>
            <p>info@sancarlosblog.com</p>
            <p>inquiries@sancarlosblog.com</p>
          </div>

          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>+63 (0) 123-456-7890</p>
            <p>+63 (0) 987-654-3210</p>
          </div>

          <div className="info-item">
            <h3>📍 Address</h3>
            <p>San Carlos City</p>
            <p>Negros Occidental, Philippines</p>
          </div>

          <div className="info-item">
            <h3>⏰ Office Hours</h3>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Saturday - Sunday: 8:00 AM - 5:00 PM</p>
          </div>

          <div className="info-item">
            <h3>🌐 Follow Us</h3>
            <div className="social-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          
          {submitted && (
            <div className="success-message">
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <section className="contact-faq">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>How do I book a tour?</h4>
              <p>You can contact us directly via email or phone to book a customized tour of San Carlos City.</p>
            </div>
            <div className="faq-item">
              <h4>What's the best time to visit?</h4>
              <p>The dry season (November to May) is ideal, but San Carlos City is beautiful year-round.</p>
            </div>
            <div className="faq-item">
              <h4>Do you offer group discounts?</h4>
              <p>Yes! Contact us for special group rates and customized itineraries.</p>
            </div>
            <div className="faq-item">
              <h4>Are there accessibility options?</h4>
              <p>We work to ensure all our attractions are accessible. Please let us know your needs in advance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
