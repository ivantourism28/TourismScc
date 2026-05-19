import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
    <div className="header-container">
         <div className="logo">
        <Link to="/" className="logo-link">
            <img src="/assets/Tourismlogo1.1.png" alt="Tourismlogo" className="logo-img" />
            <img src="/assets/scclogo1.png" alt="scclogo" className="logo-img" />
            <span>Turismo San Carlos</span>
        </Link>
        </div>
        
        <button className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/destinations" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Destinations
          </Link>
          <Link to="/gallery" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Photo Gallery
          </Link>
          <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Blog
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          <a
            href="https://vamosmobile.app/turismo/directory.php"
            className="nav-link nav-link-directory"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            Tourism Directory
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
