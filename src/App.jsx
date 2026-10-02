import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';
import Cart from './pages/Cart';
import Landing from './pages/Landing';

function App() {
  const [showDemo, setShowDemo] = useState(false);

  if (!showDemo) {
    return <Landing onStartDemo={() => setShowDemo(true)} />;
  }

  return (
    <div className="demo-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      padding: '20px', 
      background: 'linear-gradient(135deg, #082F15 0%, #1A8245 100%)',
      position: 'relative'
    }}>
      <button 
        onClick={() => setShowDemo(false)}
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
      >
        ← Back to Website
      </button>
      <div className="phone-mockup">
        <div className="notch"></div>
        <div className="phone-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
