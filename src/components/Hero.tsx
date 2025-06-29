import React from 'react';
import './hero.css';

/**
 * Hero section component.
 */
const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Our Platform</h1>
        <p className="hero-subtitle">Build. Launch. Grow.</p>
        <a href="#get-started" className="hero-button">
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
