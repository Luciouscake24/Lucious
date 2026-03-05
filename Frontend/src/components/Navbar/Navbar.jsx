import React, { useEffect, useState, useContext, useRef } from "react";
import "./Navbar.css";
import { Search, Heart, ShoppingCart, User, Package } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../Data/Catalog";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../CartDrawer/CartDrawer";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef();

  const store = useContext(StoreContext) || {};
  const state = store.state || { cart: [] };
  const cart = state.cart || [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Live filter products
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-wrapper">

          <div className="logo">
            <span>LUCIOUS</span>CAKE
          </div>

          {/* 🔎 SEARCH BAR */}
          <div className="search-bar" ref={searchRef}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search cakes, flavours..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
            />

            {/* Search Results Dropdown */}
            {showResults && searchTerm && (
              <div className="search-results">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0,5).map((item) => (
                    <div
                      key={item.id}
                      className="search-item"
                      onClick={() => {
                        navigate(`/collection/${item.collectionId}`);
                        setShowResults(false);
                        setSearchTerm("");
                      }}
                    >
                      <img src={item.img} alt="" />
                      <span>{item.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="no-result">No cakes found 😢</p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="nav-actions">
            <div className="icon-box">
              <Heart size={20}/>
              <p>Wishlist</p>
            </div>

            <div
              className="icon-box cart"
              onClick={() => setOpenCart(true)}
              style={{ cursor: "pointer" }}
            >
              <ShoppingCart size={20}/>
              <p>Cart</p>
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </div>

            <div className="icon-box">
              <User size={20}/>
              <p>Login</p>
            </div>

            <button className="track-order">
              <Package size={18}/> Track Order
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer open={openCart} setOpen={setOpenCart} />
    </>
  );
};

export default Navbar;