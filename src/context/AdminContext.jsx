import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

// Available local assets
const AVAILABLE_ASSETS = [
  'alinsyawanfalls.jpg',
  'Anahaw River and Paliran Falls.jpg',
  'boulevard.jpg',
  'Broce Ancestral House.jpeg',
  'cabagtasantribe.jpg',
  'centermall.jpg',
  'cityhall.jpg',
  'codcodriceterraces.jpg',
  'ecozone.jpeg',
  'fountain.jpg',
  'guiobcave.jpg',
  'hero.png',
  'Image1.jpg',
  'lapuscave.jpg',
  'magoonfalls.jpg',
  'Mayana Peak.jpg',
  'mayanapeak.jpg',
  'mayanapeak1.jpg',
  'Memorial Tree Park.png',
  'Monte Agundo Retreat Center.jpg',
  'monteagudo.jpg',
  'Old Sugar Central Compound.png',
  'Pano-ilan Pottery.png',
  'park marina.jpg',
  'parkmarina.jpg',
  'peoplespark.jpg',
  'punodviewdeck.jpg',
  'react.svg',
  'San Carlos Chocolatet Hills.jpg',
  'sancarloscathedral.jpg',
  'SCBD Nursery.png',
  'scclogo1.png',
  'Sebatche Cave.jpg',
  'sipawayisland.jpg',
  'Tourismlogo1.1.png',
  'vite.svg',
];

export function AdminProvider({ children }) {
  const [destinations, setDestinations] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [pageBgs, setPageBgs] = useState({});
  const [loading, setLoading] = useState(true);

  // Default page backgrounds structure
  const DEFAULT_PAGE_BGS = {
    home: { page_id: 'home', label: 'Home', image_url: null },
    blog: { page_id: 'blog', label: 'Blog', image_url: null },
    destinations: { page_id: 'destinations', label: 'Destinations', image_url: null },
    about: { page_id: 'about', label: 'About', image_url: null },
    contact: { page_id: 'contact', label: 'Contact', image_url: null },
    gallery: { page_id: 'gallery', label: 'Photo Gallery', image_url: null },
  };

  // Load all data from localStorage on mount
  useEffect(() => {
    try {
      const savedDestinations = localStorage.getItem('destinations');
      const savedBlogPosts = localStorage.getItem('blogPosts');
      const savedGallery = localStorage.getItem('gallery');
      const savedPageBgs = localStorage.getItem('pageBgs');

      if (savedDestinations) setDestinations(JSON.parse(savedDestinations));
      if (savedBlogPosts) setBlogPosts(JSON.parse(savedBlogPosts));
      if (savedGallery) setGallery(JSON.parse(savedGallery));
      
      // Initialize pageBgs with defaults if not in localStorage
      if (savedPageBgs) {
        const saved = JSON.parse(savedPageBgs);
        // Merge saved data with defaults to include new pages
        setPageBgs({ ...DEFAULT_PAGE_BGS, ...saved });
      } else {
        setPageBgs(DEFAULT_PAGE_BGS);
        localStorage.setItem('pageBgs', JSON.stringify(DEFAULT_PAGE_BGS));
      }
    } catch (err) {
      console.error('Error loading from localStorage:', err);
      // Set defaults on error
      setPageBgs(DEFAULT_PAGE_BGS);
    } finally {
      setLoading(false);
    }
  }, []);

  // Destinations CRUD
  function addDestination(item) {
    const newItem = {
      id: Date.now(),
      name: item.name,
      location: item.location,
      description: item.description,
      image: item.image,
      activities: Array.isArray(item.activities)
        ? item.activities
        : item.activities?.split(',').map(a => a.trim()).filter(Boolean) ?? [],
      openingHours: item.openingHours,
      rating: parseFloat(item.rating) || null,
      lat: parseFloat(item.lat) || null,
      lng: parseFloat(item.lng) || null,
    };
    const updated = [...destinations, newItem];
    setDestinations(updated);
    localStorage.setItem('destinations', JSON.stringify(updated));
  }

  function updateDestination(id, item) {
    const updated = destinations.map(d =>
      d.id === id ? {
        ...d,
        name: item.name,
        location: item.location,
        description: item.description,
        image: item.image,
        activities: Array.isArray(item.activities)
          ? item.activities
          : item.activities?.split(',').map(a => a.trim()).filter(Boolean) ?? [],
        openingHours: item.openingHours,
        rating: parseFloat(item.rating) || null,
        lat: parseFloat(item.lat) || null,
        lng: parseFloat(item.lng) || null,
      } : d
    );
    setDestinations(updated);
    localStorage.setItem('destinations', JSON.stringify(updated));
  }

  function deleteDestination(id) {
    const updated = destinations.filter(d => d.id !== id);
    setDestinations(updated);
    localStorage.setItem('destinations', JSON.stringify(updated));
  }

  // Blog Posts CRUD
  function addBlogPost(item) {
    const newItem = {
      id: Date.now(),
      title: item.title,
      author: item.author,
      date: item.date || null,
      category: item.category,
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
      featured: !!item.featured,
    };
    const updated = [...blogPosts, newItem];
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  }

  function updateBlogPost(id, item) {
    const updated = blogPosts.map(p =>
      p.id === id ? {
        ...p,
        title: item.title,
        author: item.author,
        date: item.date || null,
        category: item.category,
        excerpt: item.excerpt,
        content: item.content,
        image: item.image,
        featured: !!item.featured,
      } : p
    );
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  }

  function deleteBlogPost(id) {
    const updated = blogPosts.filter(p => p.id !== id);
    setBlogPosts(updated);
    localStorage.setItem('blogPosts', JSON.stringify(updated));
  }

  // Gallery CRUD
  function addGalleryItem(item) {
    const newItem = {
      id: Date.now(),
      title: item.title,
      url: item.url,
    };
    const updated = [...gallery, newItem];
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  }

  function updateGalleryItem(id, item) {
    const updated = gallery.map(g =>
      g.id === id ? { ...g, title: item.title, url: item.url } : g
    );
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  }

  function deleteGalleryItem(id) {
    const updated = gallery.filter(g => g.id !== id);
    setGallery(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  }

  // Page Backgrounds
  function updatePageBg(pageId, imageUrl) {
    const updated = { ...pageBgs, [pageId]: { ...pageBgs[pageId], image_url: imageUrl } };
    setPageBgs(updated);
    localStorage.setItem('pageBgs', JSON.stringify(updated));
  }

  function resetPageBg(pageId) {
    const updated = { ...pageBgs, [pageId]: { ...pageBgs[pageId], image_url: null } };
    setPageBgs(updated);
    localStorage.setItem('pageBgs', JSON.stringify(updated));
  }

  return (
    <AdminContext.Provider value={{
      loading,
      destinations, addDestination, updateDestination, deleteDestination,
      blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
      gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem,
      pageBgs, updatePageBg, resetPageBg,
      availableAssets: AVAILABLE_ASSETS,
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
  return ctx;
}
