import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/Gallery.css';

function Gallery() {
  const { gallery: galleryImages, pageBgs } = useAdmin();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const pageBg = pageBgs?.gallery?.image_url;
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${pageBg || ''})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-header" style={heroStyle}>
        <div className="gallery-header-content">
          <h1>PHOTO GALLERY</h1>
          <p>DISCOVER THE BEAUTY OF SAN CARLOS CITY</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-full">
        <div className="container">
          <h2>All Photos</h2>
          <p className="section-subtitle">Explore all the amazing moments captured in San Carlos City</p>

          <div className="gallery-grid">
            {galleryImages && galleryImages.length > 0 ? (
              galleryImages.map((image) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.title} />
                  <div className="gallery-overlay">
                    <p>{image.title}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-images">No images available</p>
            )}
          </div>

          {selectedImage && (
            <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
              <div className="gallery-modal-content">
                <button className="modal-close" onClick={() => setSelectedImage(null)}>×</button>
                <img src={selectedImage.url} alt={selectedImage.title} />
                <p>{selectedImage.title}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Gallery;
