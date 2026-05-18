import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/Gallery.css';

function Gallery({ limit }) {
  const { gallery: galleryImages } = useAdmin();
  const [selectedImage, setSelectedImage] = useState(null);
  
  const displayedImages = limit ? galleryImages.slice(0, limit) : galleryImages;

  return (
    <section className="gallery">
      <div className="gallery-container">
        <h2>Photo Gallery</h2>
        <p className="gallery-subtitle">Explore the beauty of San Carlos City</p>

        <div className="gallery-grid">
          {displayedImages.map((image) => (
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
          ))}
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
  );
}

export default Gallery;
