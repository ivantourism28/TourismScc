import { useState } from 'react';
import BlogCard from '../components/BlogCard';
import { useAdmin } from '../context/AdminContext';
import '../styles/Blog.css';

function Blog() {
  const { blogPosts, pageBgs } = useAdmin();
  const bg = pageBgs?.blog?.image_url;
  const headerStyle = bg
    ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="blog-page">
      <section className="blog-header" style={headerStyle}>
        <div className="blog-header-content">
          <h1>San Carlos City Blog</h1>
          <p>Travel guides, tips, and stories from San Carlos City</p>
        </div>
      </section>

      <div className="blog-container">
        <div className="blog-sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Recent Posts</h3>
            <ul className="recent-posts">
              {blogPosts.slice(0, 5).map(post => (
                <li key={post.id}>
                  <a href={`#post-${post.id}`}>{post.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section newsletter">
            <h3>Subscribe to Newsletter</h3>
            <p>Get travel tips and updates delivered to your inbox</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="blog-content">
          <div className="posts-header">
            <h2>{selectedCategory === 'All' ? 'All Articles' : selectedCategory}</h2>
            <p>{filteredPosts.length} articles found</p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blog-posts-grid">
              {filteredPosts.map(post => (
                <div key={post.id} id={`post-${post.id}`}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="no-posts">
              <p>No articles found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
