import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import '../App.css';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, products, updateCartQty, getCartTotal } = useShop();

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return { ...product, qty };
  });

  const subtotal = getCartTotal();
  const lockerFee = cartItems.length > 0 ? 450 : 0;
  const total = subtotal + lockerFee;

  return (
    <div className="detail-container animate-slide-in">
      <div className="detail-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <ArrowLeft size={24} onClick={() => navigate(-1)} style={{cursor: 'pointer'}} />
        <h1 style={{ fontSize: '18px', fontWeight: '700', marginLeft: '16px' }}>Your Cart</h1>
        <div style={{ flex: 1 }}></div>
      </div>

      <div className="detail-content" style={{ backgroundColor: '#F8FAF9', padding: '16px', overflowY: 'auto', borderRadius: 0, boxShadow: 'none' }}>
        {cartItems.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
            <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>Your cart is empty.</p>
            <button 
              onClick={() => navigate('/')}
              style={{ marginTop: '24px', backgroundColor: 'var(--primary-green)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: '600' }}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                padding: '12px',
                display: 'flex',
                gap: '12px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ 
                  width: '70px', height: '70px', 
                  backgroundColor: '#f3f4f6', 
                  borderRadius: '8px',
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '14px', color: 'var(--text-dark)' }}>{item.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>₹{item.price} / unit</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => updateCartQty(item.id, item.qty - 1)}
                        style={{ padding: '4px 8px', backgroundColor: '#f9fafb', color: '#374151' }}
                      >
                        {item.qty === 1 ? <Trash2 size={14} color="var(--red-text)" /> : <Minus size={14} />}
                      </button>
                      <span style={{ padding: '0 12px', fontSize: '13px', fontWeight: '600' }}>{item.qty}</span>
                      <button 
                        onClick={() => {
                          if (item.qty < item.stock) updateCartQty(item.id, item.qty + 1);
                        }}
                        style={{ padding: '4px 8px', backgroundColor: '#f9fafb', color: '#374151', opacity: item.qty >= item.stock ? 0.5 : 1 }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="pay-btn-container" style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>
            <span>Parts Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '14px', color: 'var(--text-muted)' }}>
            <span>Locker Service Fee</span>
            <span>₹{lockerFee}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>
            <span>Total Paid by Farmer</span>
            <span>₹{total}</span>
          </div>
          <button 
            className="pay-btn"
            onClick={() => navigate('/success')}
          >
            PAY ₹{total} & GET LOCKER OTP
          </button>
        </div>
      )}
    </div>
  );
}
