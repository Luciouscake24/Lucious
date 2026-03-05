import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-text">
          <h1>
            Delicious Cakes <br/>
            <span>Delivered To Your Door</span>
          </h1>

          <p>
            Order freshly baked designer cakes for birthdays, anniversaries,
            weddings & every special moment.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Order Cake</button>
            <button className="secondary-btn">Customize Cake</button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=1200&auto=format&fit=crop" 
            alt="Cake"
          />

          {/* FLOATING CARDS */}
          <div className="floating-card card1">🎂 1000+ Cakes Delivered</div>
          <div className="floating-card card2">⭐ 5 Star Rated Bakers</div>
          <div className="floating-card card3">🚚 Same Day Delivery</div>
        </div>

      </div>

    </section>
  );
};

export default Hero;
