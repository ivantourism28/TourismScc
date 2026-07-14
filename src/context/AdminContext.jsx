import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, uploadImage } from '../lib/supabase';

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
  'monteagundo.jpg',
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

  // Normalize from snake_case (DB) to camelCase (app)
  function toApp(row) {
    if (!row) return row;
    return {
      id: row.id,
      name: row.name,
      title: row.title,
      location: row.location,
      description: row.description,
      image: row.image_url,
      imageUrl: row.image_url,
      url: row.url || row.image_url,
      activities: row.activities || [],
      openingHours: row.opening_hours,
      rating: row.rating,
      lat: row.lat,
      lng: row.lng,
      author: row.author,
      date: row.date,
      category: row.category,
      excerpt: row.excerpt,
      content: row.content,
      featured: row.featured,
    };
  }

  // Normalize from camelCase (app) to snake_case (DB)
  function toDB(obj, type = 'destination') {
    const base = {};
    
    // Common fields
    if (obj.name) base.name = obj.name;
    if (obj.title) base.title = obj.title;
    if (obj.location) base.location = obj.location;
    if (obj.description) base.description = obj.description;
    
    // Image field (handle different property names)
    const imageUrl = obj.image || obj.imageUrl || obj.url;
    if (imageUrl) base.image_url = imageUrl;
    
    // Destination-specific fields
    if (type === 'destination') {
      if (obj.activities) {
        base.activities = Array.isArray(obj.activities) 
          ? obj.activities 
          : obj.activities?.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (obj.openingHours) base.opening_hours = obj.openingHours;
      if (obj.rating) base.rating = parseFloat(obj.rating) || null;
      if (obj.lat) base.lat = parseFloat(obj.lat) || null;
      if (obj.lng) base.lng = parseFloat(obj.lng) || null;
    }
    
    // Blog post-specific fields
    if (type === 'blog') {
      if (obj.author) base.author = obj.author;
      if (obj.date) base.date = obj.date;
      if (obj.category) base.category = obj.category;
      if (obj.excerpt) base.excerpt = obj.excerpt;
      if (obj.content) base.content = obj.content;
      base.featured = !!obj.featured;
    }
    
    // Gallery only needs title and image_url (already set above)
    
    return base;
  }

  // Load all data from Supabase on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [destRes, blogRes, galleryRes, bgRes] = await Promise.all([
          supabase.from('destinations').select('*').order('id', { ascending: false }),
          supabase.from('blog_posts').select('*').order('id', { ascending: false }),
          supabase.from('gallery').select('*').order('id', { ascending: false }),
          supabase.from('page_backgrounds').select('*'),
        ]);

        if (destRes.error) console.error('Destinations load error:', destRes.error);
        else setDestinations((destRes.data || []).map(toApp));

        if (blogRes.error) console.error('Blog posts load error:', blogRes.error);
        else setBlogPosts((blogRes.data || []).map(toApp));

        if (galleryRes.error) console.error('Gallery load error:', galleryRes.error);
        else setGallery((galleryRes.data || []).map(toApp));

        if (bgRes.error) console.error('Page backgrounds load error:', bgRes.error);
        else {
          const bgMap = { ...DEFAULT_PAGE_BGS };
          (bgRes.data || []).forEach(row => {
            if (row.page_id) {
              bgMap[row.page_id] = { page_id: row.page_id, label: bgMap[row.page_id]?.label || row.page_id, image_url: row.image_url };
            }
          });
          setPageBgs(bgMap);
        }
      } catch (err) {
        console.error('Error loading from Supabase:', err);
        setPageBgs(DEFAULT_PAGE_BGS);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Destinations CRUD
  async function addDestination(item) {
    try {
      const payload = toDB(item, 'destination');
      console.log('Adding destination:', payload);
      const { data, error } = await supabase.from('destinations').insert([payload]).select();
      if (error) {
        console.error('Add destination error:', error);
        alert(`Error adding destination: ${error.message}`);
        throw error;
      }
      if (data && data.length > 0) {
        const newItem = toApp(data[0]);
        console.log('Destination added:', newItem);
        setDestinations(prev => [newItem, ...prev]);
      }
    } catch (err) {
      console.error('Exception in addDestination:', err);
      throw err;
    }
  }

  async function updateDestination(id, item) {
    try {
      const payload = toDB(item, 'destination');
      console.log('Updating destination:', id, payload);
      const { data, error } = await supabase.from('destinations').update(payload).eq('id', id).select();
      if (error) {
        console.error('Update destination error:', error);
        alert(`Error updating destination: ${error.message}`);
        throw error;
      }
      if (data && data.length > 0) {
        const updated = toApp(data[0]);
        console.log('Destination updated:', updated);
        setDestinations(prev => prev.map(d => d.id === id ? updated : d));
      }
    } catch (err) {
      console.error('Exception in updateDestination:', err);
      throw err;
    }
  }

  async function deleteDestination(id) {
    try {
      console.log('Deleting destination:', id);
      const { error } = await supabase.from('destinations').delete().eq('id', id);
      if (error) {
        console.error('Delete destination error:', error);
        alert(`Error deleting destination: ${error.message}`);
        throw error;
      }
      console.log('Destination deleted:', id);
      setDestinations(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error('Exception in deleteDestination:', err);
      throw err;
    }
  }

  // Blog Posts CRUD
  async function addBlogPost(item) {
    try {
      const payload = toDB(item, 'blog');
      console.log('Adding blog post:', payload);
      const { data, error } = await supabase.from('blog_posts').insert([payload]).select();
      if (error) {
        console.error('Add blog post error:', error);
        alert(`Error adding blog post: ${error.message}`);
        throw error;
      }
      if (data && data.length > 0) {
        const newItem = toApp(data[0]);
        console.log('Blog post added:', newItem);
        setBlogPosts(prev => [newItem, ...prev]);
      }
    } catch (err) {
      console.error('Exception in addBlogPost:', err);
      throw err;
    }
  }

  async function updateBlogPost(id, item) {
    try {
      const payload = toDB(item, 'blog');
      console.log('Updating blog post:', id, payload);
      const { data, error } = await supabase.from('blog_posts').update(payload).eq('id', id).select();
      if (error) {
        console.error('Update blog post error:', error);
        alert(`Error updating blog post: ${error.message}`);
        throw error;
      }
      if (data && data.length > 0) {
        const updated = toApp(data[0]);
        console.log('Blog post updated:', updated);
        setBlogPosts(prev => prev.map(p => p.id === id ? updated : p));
      }
    } catch (err) {
      console.error('Exception in updateBlogPost:', err);
      throw err;
    }
  }

  async function deleteBlogPost(id) {
    try {
      console.log('Deleting blog post:', id);
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) {
        console.error('Delete blog post error:', error);
        alert(`Error deleting blog post: ${error.message}`);
        throw error;
      }
      console.log('Blog post deleted:', id);
      setBlogPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Exception in deleteBlogPost:', err);
      throw err;
    }
  }

  // Gallery CRUD
  async function addGalleryItem(item) {
    const payload = toDB(item);
    const { data, error } = await supabase.from('gallery').insert([payload]).select();
    if (error) { console.error('Add gallery error:', error); return; }
    if (data) setGallery(prev => [toApp(data[0]), ...prev]);
  }

  async function updateGalleryItem(id, item) {
    const payload = toDB(item);
    const { data, error } = await supabase.from('gallery').update(payload).eq('id', id).select();
    if (error) { console.error('Update gallery error:', error); return; }
    if (data) setGallery(prev => prev.map(g => g.id === id ? toApp(data[0]) : g));
  }

  async function deleteGalleryItem(id) {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) { console.error('Delete gallery error:', error); return; }
    setGallery(prev => prev.filter(g => g.id !== id));
  }

  // Page Backgrounds
  async function updatePageBg(pageId, imageUrl) {
    const { error } = await supabase.from('page_backgrounds')
      .upsert({ page_id: pageId, image_url: imageUrl }, { onConflict: 'page_id' });
    if (error) { console.error('Update page bg error:', error); return; }
    setPageBgs(prev => ({ ...prev, [pageId]: { ...prev[pageId], image_url: imageUrl } }));
  }

  async function resetPageBg(pageId) {
    const { error } = await supabase.from('page_backgrounds').delete().eq('page_id', pageId);
    if (error) { console.error('Reset page bg error:', error); return; }
    setPageBgs(prev => ({ ...prev, [pageId]: { ...prev[pageId], image_url: null } }));
  }

  return (
    <AdminContext.Provider value={{
      loading,
      destinations, addDestination, updateDestination, deleteDestination,
      blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
      gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem,
      pageBgs, updatePageBg, resetPageBg,
      availableAssets: AVAILABLE_ASSETS,
      uploadImage, // Export uploadImage for use in Admin.jsx
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
