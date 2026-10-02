import { ArrowLeft, AlertTriangle, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useState } from 'react';
import '../App.css';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addToCart, cartCount } = useShop();
  
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div style={{padding: '20px'}}>Product not found</div>;
  }

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const handlePay = () => {
    addToCart(product.id, quantity);
    navigate('/success');
  };

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="detail-container animate-slide-in">
      <div className="detail-header">
        <ArrowLeft size={24} onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
        <div 
          className="cart-icon" 
          onClick={() => navigate('/cart')} 
          style={{ cursor: 'pointer', position: 'relative' }}
        >
          <ShoppingCart size={24} color="var(--text-dark)" />
          {cartCount > 0 && <div className="cart-badge">{cartCount}</div>}
        </div>
      </div>

      <div className="detail-image">
        <img 
          src={product.image} 
          alt={product.name} 
        />
      </div>

      <div className="detail-content">
        <h1 className="detail-title">{product.name}</h1>
        
        {isOutOfStock ? (
           <div className="alert-box" style={{backgroundColor: '#FDE8E8', color: '#9B1C1C'}}>
             <AlertTriangle size={24} />
             <span>OUT OF STOCK! Check back later.</span>
           </div>
        ) : isLowStock ? (
          <div className="alert-box">
            <AlertTriangle size={24} />
            <span>LOW STOCK! Only {product.stock} left in {product.unit}, {product.locker}.</span>
          </div>
        ) : (
          <div className="alert-box" style={{backgroundColor: '#E8F5E9', borderColor: '#86EFAC', color: '#166534'}}>
            <span>In Stock: {product.stock} units available in {product.unit}, {product.locker}.</span>
          </div>
        )}

        <div className="price-section">
          <div className="price">
            ₹{product.price} <span>/ unit (Part Price)</span>
          </div>
          <div className="price-subtext">+ ₹450 Locker Service Fee applied at checkout.</div>
        </div>

        <div className="specs-section">
          <h3>Location</h3>
          <ul className="specs-list">
            <li>Storage Unit: {product.unit}</li>
            <li>Locker Number: {product.locker}</li>
          </ul>
        </div>
        
        <div className="specs-section">
          <h3>Specifications</h3>
          <ul className="specs-list">
            <li>Compatible with: {product.compat}</li>
            <li>Part Number: {product.partNo}</li>
          </ul>
        </div>
        
        {!isOutOfStock && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: 'auto' }}>
            <span style={{fontWeight: 600}}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
              <button 
                onClick={handleDecrement}
                style={{ padding: '8px 12px', backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ padding: '0 16px', fontWeight: 'bold' }}>{quantity}</span>
              <button 
                onClick={handleIncrement}
                style={{ padding: '8px 12px', backgroundColor: '#f3f4f6', color: '#374151' }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="pay-btn-container">
        <button 
          className="pay-btn"
          onClick={() => {
            addToCart(product.id, quantity);
            navigate('/cart');
          }}
          disabled={isOutOfStock}
          style={{ opacity: isOutOfStock ? 0.5 : 1 }}
        >
          {isOutOfStock ? "UNAVAILABLE" : `ADD TO CART`}
        </button>
      </div>
    </div>
  );
}
