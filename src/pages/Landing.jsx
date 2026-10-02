import React from 'react';
import { Wrench, Clock, ShieldCheck, MapPin, Smartphone, Cog, Filter, Battery, Droplet, Zap } from 'lucide-react';
import './Landing.css';

export default function Landing({ onStartDemo }) {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-logo">
          <img src="/dhaaga-logo.png" alt="DHAAGA Logo" style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
        </div>

      </nav>

      <header className="landing-hero">
        <div className="floating-icons">
          <Cog className="float-icon icon-1" size={48} strokeWidth={1} />
          <Filter className="float-icon icon-2" size={36} strokeWidth={1} />
          <Droplet className="float-icon icon-3" size={40} strokeWidth={1} />
          <Battery className="float-icon icon-4" size={32} strokeWidth={1} />
          <Zap className="float-icon icon-5" size={54} strokeWidth={1} />
        </div>
        
        <div className="hero-content">
          <h1>DHAAGA: <br/><span className="highlight">Gaon ka Godown</span></h1>
          <p>DHAAGA provides 24/7 automated smart lockers for agricultural spare parts. Get back to the field faster with zero wait times.</p>
          <div className="hero-actions">
            <button className="btn-primary large" onClick={onStartDemo}>
              <Smartphone size={20} />
              Launch App Prototype
            </button>
          </div>
        </div>
        <div className="hero-image">
          {/* Abstract representation of a locker or farm */}
          <div className="abstract-locker">
            <div className="locker-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className={`locker-box ${i === 4 ? 'active' : ''}`}>
                  {i === 4 && <div className="otp-glow">1234</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="brands-marquee">
        <div className="marquee-content">
          <span>JOHN DEERE</span> <span className="dot">•</span>
          <span>MAHINDRA</span> <span className="dot">•</span>
          <span>MASSEY FERGUSON</span> <span className="dot">•</span>
          <span>SONALIKA</span> <span className="dot">•</span>
          <span>KUBOTA</span> <span className="dot">•</span>
          <span>NEW HOLLAND</span> <span className="dot">•</span>
          <span>SWARAJ</span> <span className="dot">•</span>
          {/* Duplicate for infinite scroll */}
          <span>JOHN DEERE</span> <span className="dot">•</span>
          <span>MAHINDRA</span> <span className="dot">•</span>
          <span>MASSEY FERGUSON</span> <span className="dot">•</span>
          <span>SONALIKA</span> <span className="dot">•</span>
          <span>KUBOTA</span> <span className="dot">•</span>
          <span>NEW HOLLAND</span> <span className="dot">•</span>
          <span>SWARAJ</span>
        </div>
      </div>

      <section className="landing-facts">
        <div className="fact-card">
          <div className="fact-icon"><Clock size={32} /></div>
          <h3>24/7 Availability</h3>
          <p>Farming doesn't stop, and neither do we. Pick up your essential parts at any hour, day or night.</p>
        </div>
        <div className="fact-card">
          <div className="fact-icon"><MapPin size={32} /></div>
          <h3>Hyper-Local Lockers</h3>
          <p>Strategically placed storage units across cooperative centers, organized by category.</p>
        </div>
        <div className="fact-card">
          <div className="fact-icon"><ShieldCheck size={32} /></div>
          <h3>Secure OTP Access</h3>
          <p>Every transaction generates a secure, one-time passcode to open your specific part locker.</p>
        </div>
      </section>

      <section className="landing-how-it-works">
        <div className="how-content">
          <h2>Simple. Fast. Reliable.</h2>
          <p className="how-subtitle">Get back to farming in three easy steps.</p>
          <div className="steps-container">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3>Select Part</h3>
              <p>Browse our live inventory on the web app and find the exact part you need for your tractor.</p>
            </div>
            <div className="step-line"></div>
            <div className="step-card">
              <div className="step-number">2</div>
              <h3>Get Secure OTP</h3>
              <p>Checkout instantly. We will generate a unique, secure one-time passcode for your locker.</p>
            </div>
            <div className="step-line"></div>
            <div className="step-card">
              <div className="step-number">3</div>
              <h3>Pickup 24/7</h3>
              <p>Drive to the nearest DHAAGA station, punch in your OTP, and grab your part immediately.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats">
        <div className="stat-box">
          <h3>100+</h3>
          <p>Active Smart Lockers</p>
        </div>
        <div className="stat-box">
          <h3>50k+</h3>
          <p>Parts Delivered</p>
        </div>
        <div className="stat-box">
          <h3>Zero</h3>
          <p>Wait Time</p>
        </div>
      </section>
      
      <footer className="landing-footer">
        <h2>Ready to see how it works?</h2>
        <button className="btn-primary large" onClick={onStartDemo}>
          Interact with Prototype
        </button>
      </footer>
    </div>
  );
}
