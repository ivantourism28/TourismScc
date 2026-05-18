import { useAdmin } from '../context/AdminContext';
import DestinationCard from '../components/DestinationCard';
import TouristMap from '../components/TouristMap';
import '../styles/Destinations.css';

function Destinations() {
  const { destinations, pageBgs } = useAdmin();
  const bg = pageBgs?.destinations?.image_url;
  const headerStyle = {
    backgroundImage: bg ? `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundSize: 'cover', backgroundPosition: 'center',
  };
  return (
    <div className="destinations-page">
      <section className="destinations-header" style={headerStyle}>
        <div className="destinations-header-content">
          <h1>Explore San Carlos City</h1>
          <p>Discover the amazing attractions and destinations waiting for you</p>
        </div>
      </section>

      <div className="destinations-container">
        <div className="destinations-info">
          <h2>Popular Attractions</h2>
          <p>San Carlos City is home to a variety of attractions that showcase the natural beauty and cultural heritage of the region. Whether you're interested in outdoor adventures, cultural experiences, or simply relaxing in nature, you'll find something to suit your interests.</p>
        </div>

        <div className="destinations-grid">
          {destinations.map(destination => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>

      <TouristMap />

      <section className="destination-tips">
        <div className="container">
          <h2>Travel Tips for San Carlos City</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🗺️</div>
              <h3>Best Time to Visit</h3>
              <p>Visit during the dry season (November to May) for the best weather and outdoor activities.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚗</div>
              <h3>Getting Around</h3>
              <p>Rent a car or hire a local guide to explore all the attractions at your own pace.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🏨</div>
              <h3>Accommodation</h3>
              <p>Choose from various lodging options ranging from budget-friendly to luxury resorts.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🍽️</div>
              <h3>Local Cuisine</h3>
              <p>Don't miss the local dishes and specialties that reflect the region's unique flavors.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Destinations;
