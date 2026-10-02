import { Check, ArrowLeft, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useEffect, useState } from 'react';
import '../App.css';

export default function Success() {
  const navigate = useNavigate();
  const { checkout, cart, lastOrder, products } = useShop();
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Generate random OTP on mount
    const randomOtp = Math.floor(1000 + Math.random() * 9000);
    setOtp(randomOtp.toString());
    
    // Only checkout if there are items in the cart
    if (Object.keys(cart).length > 0) {
      checkout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use lastOrder to display instructions because cart is cleared
  const orderItems = Object.entries(lastOrder).map(([id, qty]) => {
    const product = products.find(p => p.id === parseInt(id));
    return { ...product, qty };
  });

  return (
    <div className="success-container animate-slide-in" style={{ padding: '20px', height: 'auto', minHeight: '100vh', justifyContent: 'flex-start' }}>
      <div className="detail-header" style={{ width: '100%', marginBottom: '24px' }}>
        <ArrowLeft size={24} onClick={() => navigate('/')} style={{cursor: 'pointer'}} />
      </div>

      <div className="success-icon" style={{ marginTop: '24px' }}>
        <Check size={48} strokeWidth={3} />
      </div>
      
      <h1 className="success-title">Payment Successful!</h1>

      <div className="otp-box" style={{ marginBottom: '24px' }}>
        <div className="otp-label">YOUR MASTER OTP:</div>
        <div className="otp-code" style={{ marginBottom: '8px' }}>{otp}</div>
        <div className="otp-instruction">
          Use this OTP for all your locker pickups. Valid for 15 minutes.
        </div>
      </div>

      <div style={{ width: '100%', textAlign: 'left' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '16px', color: 'var(--text-dark)' }}>Pickup Locations</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {orderItems.map((item, index) => (
            <div key={index} style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)',
              display: 'flex',
              gap: '12px'
            }}>
              <div style={{ color: 'var(--primary-green)', marginTop: '2px' }}>
                <MapPin size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>
                  {item.unit} • {item.locker}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                  {item.qty}x {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
