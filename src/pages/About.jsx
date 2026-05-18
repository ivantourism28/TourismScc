import { useAdmin } from '../context/AdminContext';
import '../styles/About.css';

function About() {
  const { pageBgs } = useAdmin();
  const bg = pageBgs?.about?.image_url;
  const headerStyle = {
    backgroundImage: bg ? `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover', backgroundPosition: 'center',
  };
  return (
    <div className="about-page">
      <section className="about-header" style={headerStyle}>
        <div className="about-header-content">
          <h1>About San Carlos City Tourism</h1>
          <p>Learn more about our mission to showcase the beauty of San Carlos City</p>
        </div>
      </section>

      <div className="about-container">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At San Carlos City Tourism, our mission is to promote and celebrate the natural beauty, 
            cultural heritage, and warm hospitality of San Carlos City. We believe in creating authentic 
            travel experiences that connect visitors with the heart and soul of our destination.
          </p>
        </section>

        <section className="about-section alternate">
          <h2>Our Story</h2>
          <p>
            Founded with a passion for travel and community, San Carlos City Tourism began as a small 
            initiative to help travelers discover the hidden gems of our beloved city. Over the years, 
            we've grown into a comprehensive resource for anyone looking to experience San Carlos City 
            at its best.
          </p>
          <p>
            We work closely with local communities, businesses, and tourism operators to ensure that 
            every recommendation we make contributes to the sustainable development of our destination 
            while preserving its natural and cultural heritage.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose San Carlos City?</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <h3>🌿 Natural Beauty</h3>
              <p>Experience pristine waterfalls, scenic landscapes, and lush forests that take your breath away.</p>
            </div>
            <div className="reason-card">
              <h3>🏛️ Rich Culture</h3>
              <p>Immerse yourself in the traditions, heritage, and authentic local experiences of our people.</p>
            </div>
            <div className="reason-card">
              <h3>❤️ Warm Welcome</h3>
              <p>Experience the genuine hospitality and kindness of the San Carlos City community.</p>
            </div>
            <div className="reason-card">
              <h3>🎯 Adventure</h3>
              <p>From water sports to hiking, there are endless opportunities for adventure seekers.</p>
            </div>
            <div className="reason-card">
              <h3>🍲 Culinary Delights</h3>
              <p>Taste authentic local flavors and traditional dishes passed down through generations.</p>
            </div>
            <div className="reason-card">
              <h3>🤝 Sustainable Tourism</h3>
              <p>We promote responsible tourism that benefits local communities and preserves the environment.</p>
            </div>
          </div>
        </section>

        <section className="about-section alternate">
          <h2>Our Team</h2>
          <p>
            Our dedicated team consists of passionate travel enthusiasts, local guides, and tourism experts 
            who are committed to providing the best information and experiences for our visitors.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👨‍💼</div>
              <h4>John Santos</h4>
              <p>Founder & Chief Editor</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h4>Maria Cruz</h4>
              <p>Content Manager</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🔧</div>
              <h4>Carlos Miguel</h4>
              <p>Tour Guide Coordinator</p>
            </div>
          </div>
        </section>

        <section className="about-cta">
          <h2>Get in Touch</h2>
          <p>Have questions or want to learn more about San Carlos City? We'd love to hear from you!</p>
          <a href="/contact" className="btn btn-primary">Contact Us</a>
        </section>
      </div>
    </div>
  );
}

export default About;
