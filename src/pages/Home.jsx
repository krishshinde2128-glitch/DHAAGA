import { ShoppingCart, Search, Cog, Filter, Battery, Droplet, Zap, Wrench, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';
import '../App.css';

const categories = [
  { id: 1, name: 'BELTS', icon: <Cog size={28} strokeWidth={1.5} /> },
  { id: 2, name: 'FILTERS', icon: <Filter size={28} strokeWidth={1.5} /> },
  { id: 3, name: 'BEARINGS', icon: <Cog size={28} strokeWidth={1.5} /> },
  { id: 4, name: 'LUBRICANTS', icon: <Droplet size={28} strokeWidth={1.5} /> },
  { id: 5, name: 'SEALS', icon: <Battery size={28} strokeWidth={1.5} /> },
  { id: 6, name: 'ELECTRICAL', icon: <Zap size={28} strokeWidth={1.5} /> },
];

export default function Home() {
  const navigate = useNavigate();
  const { products, cartCount, addToCart } = useShop();
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredProducts = activeCategory 
    ? products.filter(p => p.categoryId === activeCategory)
    : products;

  const handleCategoryClick = (id) => {
    if (activeCategory === id) {
      setActiveCategory(null); // Toggle off
    } else {
      setActiveCategory(id); // Set active
    }
  };

  return (
    <div className="home-container animate-slide-in">
      <header className="header">
        <div className="logo" onClick={() => setActiveCategory(null)} style={{ cursor: 'pointer' }}>
          <img src="/dhaaga-logo-black.png" alt="DHAAGA Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <div 
          className="cart-icon" 
          onClick={() => navigate('/cart')} 
          style={{ cursor: 'pointer' }}
        >
          <ShoppingCart size={24} strokeWidth={1.5} color="var(--text-dark)" />
          {cartCount > 0 && <div className="cart-badge">{cartCount}</div>}
        </div>
      </header>

      <div className="location-pill">
        <MapPin size={14} color="var(--primary-green)" />
        <span>DHAAGA Station #04 (Active)</span>
        <div className="online-dot"></div>
      </div>

      <div className="search-bar">
        <Search size={20} color="#9CA3AF" />
        <input type="text" placeholder="Search for V-Belts, Filters, Bearings..." />
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div 
            key={cat.id} 
            className={`category-card ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.icon}
            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: '20px' }}>
        <h2 className="section-title">
          {activeCategory 
            ? `${categories.find(c => c.id === activeCategory)?.name} (Storage Unit ${filteredProducts[0]?.unit.split(' ')[1] || ''})` 
            : 'Available Parts across Units'}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No products found in this category.
          </div>
        ) : (
          <div className="products-list">
            {filteredProducts.map((prod) => (
              <div 
                key={prod.id} 
                className="product-card"
                onClick={() => navigate(`/product/${prod.id}`)}
              >
                <div className="product-image-container">
                  <img src={prod.image} alt={prod.name} />
                </div>
                <div className="product-info">
                  <div>
                    <div className="product-name">{prod.name}</div>
                    <div className="product-part-no">Part No: {prod.partNo}</div>
                    <div className="product-label" style={{marginTop: '4px'}}>
                      {prod.unit} • {prod.locker}
                    </div>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px'}}>
                    <span style={{fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500}}>Stock: {prod.stock}</span>
                    <button 
                      className="add-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(prod.id, 1);
                      }}
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
