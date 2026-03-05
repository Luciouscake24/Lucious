import React from "react";
import "./Footer.css";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* COLUMN 1 */}
        <div className="footer-col">
          <h2 className="footer-logo"><span>LUCIOUS</span>CAKE</h2>
          <p>
            Freshly baked designer cakes delivered to your door.
            Celebrate every occasion with sweetness.
          </p>

          <div className="social-icons">
            <Facebook size={18}/>
            <Instagram size={18}/>
            <Twitter size={18}/>
          </div>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <a href="#">Home</a>
          <a href="#">Cakes</a>
          <a href="#">Custom Cake</a>
          <a href="#">Track Order</a>
          <a href="#">Contact</a>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h3>Categories</h3>
          <a href="#">Birthday Cakes</a>
          <a href="#">Wedding Cakes</a>
          <a href="#">Anniversary Cakes</a>
          <a href="#">Photo Cakes</a>
          <a href="#">Cup Cakes</a>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p><Phone size={16}/> +91 98765 43210</p>
          <p><Mail size={16}/> support@luciouscake.com</p>
          <p><MapPin size={16}/> Gurgaon, Haryana</p>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        © 2026 Lucious Cake. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
