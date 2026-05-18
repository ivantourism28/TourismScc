import { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/TouristMap.css';
import { useAdmin } from '../context/AdminContext';

// Fix Leaflet's default marker icon broken by bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Center of San Carlos City
const SAN_CARLOS_CENTER = [10.4928, 123.4142];

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance.toFixed(2);
}

// Fetch route from OSRM (Open Source Routing Machine)
async function fetchRoute(startLat, startLng, endLat, endLng) {
  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`
    );
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coordinates = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      const distanceKm = (route.distance / 1000).toFixed(2);
      const durationMin = Math.round(route.duration / 60);
      
      return {
        coordinates,
        distance: distanceKm,
        duration: durationMin,
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching route:', error);
    return null;
  }
}

// Inner component — has access to the map instance via useMap()
function MapController({ target, spots, userLocation, onRouteUpdate }) {
  const map = useMap();
  const markerRefs = useRef({});
  const [route, setRoute] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    if (!target) return;
    const { coordinates, id } = target;
    // Fly smoothly to the location then open its popup
    map.flyTo(coordinates, 16, { duration: 1.2 });
    setTimeout(() => {
      const marker = markerRefs.current[id];
      if (marker) marker.openPopup();
    }, 1300);
  }, [target, map]);

  const handleShowRoute = async (destination) => {
    if (!userLocation) {
      alert('Location access required to show route');
      return;
    }

    setLoadingRoute(true);
    setRoute(null);

    const routeData = await fetchRoute(
      userLocation[0],
      userLocation[1],
      destination.coordinates[0],
      destination.coordinates[1]
    );

    if (routeData) {
      setRoute(routeData);
      onRouteUpdate?.(routeData);
      // Fit the map to the route
      const bounds = L.latLngBounds(routeData.coordinates);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      alert('Could not find a route to this destination');
    }

    setLoadingRoute(false);
  };

  return (
    <>
      {/* Show user's current location */}
      {userLocation && (
        <CircleMarker
          center={userLocation}
          radius={8}
          fillColor="#3b82f6"
          color="#1e40af"
          weight={3}
          opacity={0.8}
          fillOpacity={0.7}
        >
          <Popup>
            <div className="map-popup">
              <h3>📍 Your Location</h3>
              <p>You are here</p>
            </div>
          </Popup>
        </CircleMarker>
      )}

      {/* Display route polyline */}
      {route && route.coordinates && (
        <Polyline
          positions={route.coordinates}
          color="#ef4444"
          weight={4}
          opacity={0.8}
          dashArray="5, 5"
        />
      )}

      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={spot.coordinates}
          ref={(ref) => { markerRefs.current[spot.id] = ref; }}
        >
          <Popup minWidth={240}>
            <div className="map-popup">
              <img src={spot.image} alt={spot.name} className="map-popup-image" />
              <div className="map-popup-body">
                <h3>{spot.name}</h3>
                <p className="map-popup-location">📍 {spot.location}</p>
                <p>{spot.description}</p>
                {userLocation && (
                  <div className="map-popup-distance">
                    <strong>📏 Distance from you:</strong>
                    <div className="distance-value">
                      {calculateDistance(userLocation[0], userLocation[1], spot.coordinates[0], spot.coordinates[1])} km
                    </div>
                  </div>
                )}
                
                {route && route.distance && (
                  <div className="map-popup-route">
                    <strong>🛣️ Route Details:</strong>
                    <div className="route-info">
                      <div className="route-distance">📏 {route.distance} km</div>
                      <div className="route-duration">⏱️ ~{route.duration} min</div>
                    </div>
                  </div>
                )}

                {userLocation && (
                  <button
                    className={`btn-get-route ${loadingRoute ? 'loading' : ''}`}
                    onClick={() => handleShowRoute(spot)}
                    disabled={loadingRoute}
                  >
                    {loadingRoute ? 'Finding route...' : route ? 'Update Route' : 'Get Directions'}
                  </button>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

function TouristMap() {
  const { destinations } = useAdmin();
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [currentRoute, setCurrentRoute] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLocationError('');
        },
        (error) => {
          console.log('Geolocation error:', error.message);
          setLocationError('Location access denied. Showing map without distance and routes.');
        }
      );
    } else {
      setLocationError('Geolocation not supported by your browser.');
    }
  }, []);

  // Only show destinations that have valid coordinates
  const spots = destinations
    .filter((d) => d.lat && d.lng)
    .map((d) => ({ ...d, coordinates: [parseFloat(d.lat), parseFloat(d.lng)] }));

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [target, setTarget] = useState(null);

  function handleInput(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.trim() === '') {
      setSuggestions([]);
      return;
    }
    const filtered = spots.filter((s) =>
      s.name.toLowerCase().includes(val.toLowerCase())
    );
    setSuggestions(filtered);
  }

  function handleSelect(spot) {
    setQuery(spot.name);
    setSuggestions([]);
    setTarget({ ...spot, _ts: Date.now() });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
  }

  function handleRouteUpdate(route) {
    setCurrentRoute(route);
  }

  return (
    <section className="tourist-map-section">
      <div className="tourist-map-header">
        <h2>Tourist Spots Map</h2>
        <p>Explore the locations of San Carlos City's top attractions</p>
        {userLocation && <p className="location-enabled">📍 Your location detected - distances and routes available</p>}
        {locationError && <p className="location-error">{locationError}</p>}
      </div>

      {/* Search bar */}
      <div className="map-search-wrapper">
        <div className="map-search-box">
          <span className="map-search-icon">🔍</span>
          <input
            type="text"
            className="map-search-input"
            placeholder="Search a tourist spot..."
            value={query}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <button
              className="map-search-clear"
              onClick={() => { setQuery(''); setSuggestions([]); }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {suggestions.length > 0 && (
          <ul className="map-suggestions">
            {suggestions.map((spot) => (
              <li
                key={spot.id}
                className="map-suggestion-item"
                onClick={() => handleSelect(spot)}
              >
                <span className="suggestion-pin">📍</span>
                {spot.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="tourist-map-wrapper">
        <MapContainer
          center={SAN_CARLOS_CENTER}
          zoom={13}
          scrollWheelZoom={false}
          className="tourist-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController target={target} spots={spots} userLocation={userLocation} onRouteUpdate={handleRouteUpdate} />
        </MapContainer>
      </div>

      {currentRoute && (
        <div className="route-summary">
          <div className="route-summary-content">
            <h3>📍 Active Route</h3>
            <div className="route-summary-details">
              <div className="summary-item">
                <span className="summary-label">Distance:</span>
                <span className="summary-value">{currentRoute.distance} km</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Estimated Time:</span>
                <span className="summary-value">~{currentRoute.duration} minutes</span>
              </div>
            </div>
            <button className="btn-close-route" onClick={() => setCurrentRoute(null)}>Clear Route</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TouristMap;
