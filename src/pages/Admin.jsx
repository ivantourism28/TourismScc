import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import '../styles/Admin.css';

// ─── Asset Picker Input ───────────────────────────────────────────────────────
function ImageInput({ value, onChange, label = 'Image' }) {
  const { availableAssets } = useAdmin();
  const [showPicker, setShowPicker] = useState(false);

  const getImagePath = (filename) => `/src/assets/${filename}`;

  return (
    <div className="form-group">
      <label>{label}</label>
      <div className="image-input-row">
        <input
          type="text"
          placeholder="Paste image path or select from picker"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="or-divider">or</span>
        <button
          type="button"
          className="file-upload-btn"
          onClick={() => setShowPicker(!showPicker)}
        >
          {showPicker ? 'Close Picker' : 'Pick Image'}
        </button>
      </div>

      {showPicker && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '1rem',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '4px',
          maxHeight: '400px',
          overflowY: 'auto',
        }}>
          {availableAssets.map((asset) => (
            <div
              key={asset}
              onClick={() => {
                onChange(getImagePath(asset));
                setShowPicker(false);
              }}
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: '0.5rem',
                borderRadius: '4px',
                backgroundColor: value === getImagePath(asset) ? '#2a9d8f' : '#fff',
                border: value === getImagePath(asset) ? '2px solid #1a7d6f' : '1px solid #ddd',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (value !== getImagePath(asset)) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (value !== getImagePath(asset)) {
                  e.currentTarget.style.backgroundColor = '#fff';
                }
              }}
            >
              <img
                src={getImagePath(asset)}
                alt={asset}
                style={{
                  width: '100%',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '2px',
                  marginBottom: '0.3rem',
                }}
              />
              <span style={{
                fontSize: '0.7rem',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: value === getImagePath(asset) ? '#fff' : '#666',
              }}>
                {asset}
              </span>
            </div>
          ))}
        </div>
      )}

      {value && <img src={value} alt="preview" className="image-preview" />}
    </div>
  );
}

// ─── DESTINATIONS TAB ────────────────────────────────────────────────────────
function DestinationsTab() {
  const { destinations, addDestination, updateDestination, deleteDestination } = useAdmin();
  const empty = { name: '', location: '', description: '', image: '', activities: '', openingHours: '', rating: '', lat: '', lng: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }

  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(d) {
    setForm({ ...d, activities: Array.isArray(d.activities) ? d.activities.join(', ') : d.activities });
    setEditId(d.id);
    setShowForm(true);
  }
  function cancel() { setShowForm(false); setEditId(null); }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    if (editId) await updateDestination(editId, form);
    else await addDestination(form);
    setSaving(false);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Destinations <span className="count-badge">{destinations.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Destination</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Destination' : 'New Destination'}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Name *</label>
              <input required value={form.name} onChange={(e) => set('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Location *</label>
              <input required value={form.location} onChange={(e) => set('location', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Description *</label>
            <textarea required rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Activities (comma-separated)</label>
              <input value={form.activities} onChange={(e) => set('activities', e.target.value)} placeholder="Hiking, Swimming, Photography" />
            </div>
            <div className="form-group">
              <label>Opening Hours</label>
              <input value={form.openingHours} onChange={(e) => set('openingHours', e.target.value)} placeholder="8:00 AM - 5:00 PM" />
            </div>
            <div className="form-group form-group-sm">
              <label>Rating (0–5)</label>
              <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => set('rating', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Latitude</label>
              <input type="number" step="any" placeholder="e.g. 10.4928" value={form.lat} onChange={(e) => set('lat', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input type="number" step="any" placeholder="e.g. 123.4142" value={form.lng} onChange={(e) => set('lng', e.target.value)} />
            </div>
            <div className="form-group form-group-sm" style={{ justifyContent: 'flex-end' }}>
              <a href="https://www.latlong.net/" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.78rem', color: '#2a9d8f', marginTop: 'auto', paddingBottom: '0.5rem' }}>
                🌐 Find coordinates
              </a>
            </div>
          </div>
          <ImageInput value={form.image} onChange={(v) => set('image', v)} />
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Destination'}
            </button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Name</th><th>Location</th><th>Coordinates</th><th>Rating</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {destinations.map((d) => (
              <tr key={d.id}>
                <td>{d.image && <img src={d.image} alt={d.name} className="table-thumb" />}</td>
                <td>{d.name}</td>
                <td>{d.location}</td>
                <td style={{ fontSize: '0.78rem', color: '#888' }}>
                  {d.lat && d.lng ? `${parseFloat(d.lat).toFixed(4)}, ${parseFloat(d.lng).toFixed(4)}` : '—'}
                </td>
                <td>⭐ {d.rating}</td>
                <td className="action-cell">
                  <button className="btn-edit" onClick={() => openEdit(d)}>Edit</button>
                  <button className="btn-delete" onClick={() => { if (confirm(`Delete "${d.name}"?`)) deleteDestination(d.id); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── BLOG POSTS TAB ──────────────────────────────────────────────────────────
function BlogTab() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useAdmin();
  const empty = { title: '', author: '', date: '', category: '', excerpt: '', content: '', image: '', featured: false };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }
  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(p) { setForm(p); setEditId(p.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    if (editId) await updateBlogPost(editId, form);
    else await addBlogPost(form);
    setSaving(false);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Articles <span className="count-badge">{blogPosts.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Article</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Article' : 'New Article'}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Title *</label>
              <input required value={form.title} onChange={(e) => set('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Author *</label>
              <input required value={form.author} onChange={(e) => set('author', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Travel Guide, Adventure…" />
            </div>
            <div className="form-group form-group-sm featured-check">
              <label>
                <input type="checkbox" checked={form.featured} onChange={(e) => set('featured', e.target.checked)} />
                &nbsp;Featured
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Excerpt</label>
            <textarea rows={2} value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <textarea required rows={5} value={form.content} onChange={(e) => set('content', e.target.value)} />
          </div>
          <ImageInput value={form.image} onChange={(v) => set('image', v)} />
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Article'}
            </button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Title</th><th>Author</th><th>Category</th><th>Featured</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {blogPosts.map((p) => (
              <tr key={p.id}>
                <td>{p.image && <img src={p.image} alt={p.title} className="table-thumb" />}</td>
                <td>{p.title}</td>
                <td>{p.author}</td>
                <td>{p.category}</td>
                <td>{p.featured ? '✅' : '—'}</td>
                <td className="action-cell">
                  <button className="btn-edit" onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn-delete" onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteBlogPost(p.id); }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── GALLERY TAB ─────────────────────────────────────────────────────────────
function GalleryTab() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useAdmin();
  const empty = { title: '', url: '' };
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function set(field, val) { setForm((f) => ({ ...f, [field]: val })); }
  function openAdd() { setForm(empty); setEditId(null); setShowForm(true); }
  function openEdit(g) { setForm(g); setEditId(g.id); setShowForm(true); }
  function cancel() { setShowForm(false); setEditId(null); }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    if (editId) await updateGalleryItem(editId, form);
    else await addGalleryItem(form);
    setSaving(false);
    setShowForm(false);
    setEditId(null);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Gallery <span className="count-badge">{gallery.length}</span></h2>
        <button className="btn-add" onClick={openAdd}>+ Add Photo</button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={submit}>
          <h3>{editId ? 'Edit Photo' : 'New Photo'}</h3>
          <div className="form-group">
            <label>Title *</label>
            <input required value={form.title} onChange={(e) => set('title', e.target.value)} />
          </div>
          <ImageInput value={form.url} onChange={(v) => set('url', v)} label="Photo" />
          <div className="form-actions">
            <button type="submit" className="btn-save" disabled={saving}>
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Photo'}
            </button>
            <button type="button" className="btn-cancel" onClick={cancel}>Cancel</button>
          </div>
        </form>
      )}

      <div className="gallery-admin-grid">
        {gallery.map((g) => (
          <div key={g.id} className="gallery-admin-card">
            {g.url && <img src={g.url} alt={g.title} />}
            <div className="gallery-admin-info">
              <span>{g.title}</span>
              <div className="action-cell">
                <button className="btn-edit" onClick={() => openEdit(g)}>Edit</button>
                <button className="btn-delete" onClick={() => { if (confirm(`Delete "${g.title}"?`)) deleteGalleryItem(g.id); }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PAGE BACKGROUNDS TAB ────────────────────────────────────────────────────
function PageBgsTab() {
  const { pageBgs, updatePageBg, resetPageBg, availableAssets } = useAdmin();
  const [applied, setApplied] = useState({});
  const [showPickers, setShowPickers] = useState({});

  const getImagePath = (filename) => `/src/assets/${filename}`;

  function handleImageSelect(pageId, imageUrl) {
    updatePageBg(pageId, imageUrl);
    setApplied((a) => ({ ...a, [pageId]: true }));
    setTimeout(() => setApplied((a) => ({ ...a, [pageId]: false })), 3000);
  }

  return (
    <div className="tab-content">
      <div className="tab-toolbar">
        <h2>Page Backgrounds</h2>
      </div>
      <p style={{ color: '#666', marginTop: '-0.5rem' }}>
        Select an image from your local assets to set the header background for each page. Changes save instantly.
      </p>

      <div className="pagebg-grid">
        {Object.entries(pageBgs).map(([pageId, row]) => {
          const image = row?.image_url || '';
          const label = row?.label || pageId;
          return (
            <div key={pageId} className="pagebg-card">
              <div
                className="pagebg-preview"
                style={{
                  backgroundImage: image
                    ? `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)), url(${image})`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="pagebg-label">{label}</span>
                {applied[pageId] && <span className="pagebg-applied-badge">✓ Applied</span>}
              </div>

              <div className="pagebg-controls">
                <button
                  type="button"
                  className="file-upload-btn"
                  onClick={() => setShowPickers((s) => ({ ...s, [pageId]: !s[pageId] }))}
                >
                  {showPickers[pageId] ? 'Close Picker' : 'Pick Image'}
                </button>
                <div className="pagebg-actions">
                  {image && (
                    <button className="btn-cancel" onClick={() => resetPageBg(pageId)}>Reset</button>
                  )}
                </div>
              </div>

              {showPickers[pageId] && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  padding: '1rem',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '4px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}>
                  {availableAssets.map((asset) => (
                    <div
                      key={asset}
                      onClick={() => {
                        handleImageSelect(pageId, getImagePath(asset));
                        setShowPickers((s) => ({ ...s, [pageId]: false }));
                      }}
                      style={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        padding: '0.3rem',
                        borderRadius: '4px',
                        backgroundColor: image === getImagePath(asset) ? '#2a9d8f' : '#fff',
                        border: image === getImagePath(asset) ? '2px solid #1a7d6f' : '1px solid #ddd',
                        transition: 'all 0.2s',
                      }}
                    >
                      <img
                        src={getImagePath(asset)}
                        alt={asset}
                        style={{
                          width: '100%',
                          height: '60px',
                          objectFit: 'cover',
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PASSWORD MODAL ──────────────────────────────────────────────────────────
function PasswordModal({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password

  function handleSubmit(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('adminAuth', 'true');
      onSuccess();
    } else {
      setError('Incorrect password. Try again.');
      setPassword('');
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        maxWidth: '400px',
        width: '90%',
      }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>🔐 Admin Panel</h2>
        <p style={{ color: '#666', marginBottom: '1.5rem' }}>Enter the admin password to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: error ? '2px solid #e74c3c' : '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              marginBottom: '0.5rem',
              boxSizing: 'border-box',
            }}
            autoFocus
          />
          {error && <p style={{ color: '#e74c3c', fontSize: '0.9rem', margin: '0.5rem 0 1rem' }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#2a9d8f',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Unlock Admin Panel
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN PAGE ─────────────────────────────────────────────────────────
const TABS = ['Destinations', 'Articles', 'Gallery', 'Page Backgrounds'];

function Admin() {
  const { loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('Destinations');
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('adminAuth') === 'true');

  if (!isAuthenticated) {
    return <PasswordModal onSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-header"><h1>⚙️ Admin Dashboard</h1></div>
        <div style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>Loading data from Supabase…</div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>⚙️ Admin Dashboard</h1>
        <p>All changes save directly to Supabase — no page refresh needed</p>
      </div>

      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`admin-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="admin-body">
        {activeTab === 'Destinations'     && <DestinationsTab />}
        {activeTab === 'Articles'         && <BlogTab />}
        {activeTab === 'Gallery'          && <GalleryTab />}
        {activeTab === 'Page Backgrounds' && <PageBgsTab />}
      </div>
    </div>
  );
}

export default Admin;
