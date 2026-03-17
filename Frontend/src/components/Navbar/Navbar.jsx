import React, { useEffect, useState, useContext, useRef } from "react";
import "./Navbar.css";
import { Search, Heart, ShoppingCart, User, Package, LogOut } from "lucide-react";
import { StoreContext } from "../../context/StoreContext";
import { products } from "../../Data/Catalog";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../CartDrawer/CartDrawer";
import AuthModal from "../../components/AuthModal/AuthModal";

const Navbar = () => {

  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openAuth,setOpenAuth] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [showAccountMenu,setShowAccountMenu] = useState(false);

  const navigate = useNavigate();
  const searchRef = useRef();
  const accountRef = useRef();

  const store = useContext(StoreContext) || {};
  const state = store.state || { cart: [] };
  const cart = state.cart || [];

  /* CHECK LOGIN */
  useEffect(()=>{
    const token = sessionStorage.getItem("token");
    setIsLoggedIn(!!token);
  },[]);

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* CLOSE SEARCH DROPDOWN */
  useEffect(() => {
    const handleClickOutside = (e) => {

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }

      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  const cartCount = cart.reduce((total,item)=> total + item.quantity,0);

  /* SEARCH FILTER */
  const filteredProducts = products.filter((item)=>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* LOGOUT */
  const handleLogout = ()=>{
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-wrapper">

          <div className="logo">
            <span>LUCIOUS</span>CAKE
          </div>

          {/* SEARCH */}
          <div className="search-bar" ref={searchRef}>
            <Search size={18} />

            <input
              type="text"
              placeholder="Search cakes, flavours..."
              value={searchTerm}
              onChange={(e)=>{
                setSearchTerm(e.target.value);
                setShowResults(true);
              }}
            />

            {showResults && searchTerm && (
              <div className="search-results">

                {filteredProducts.length > 0 ? (

                  filteredProducts.slice(0,5).map((item)=>(
                    <div
                      key={item.id}
                      className="search-item"
                      onClick={()=>{
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

          {/* ACTIONS */}
          <div className="nav-actions">

            {/* WISHLIST */}
            <div className="icon-box">
              <Heart size={20}/>
              <p>Wishlist</p>
            </div>

            {/* CART */}
            <div
              className="icon-box cart"
              onClick={()=>setOpenCart(true)}
            >
              <ShoppingCart size={20}/>
              <p>Cart</p>

              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </div>

            {/* LOGIN OR ACCOUNT */}
            {!isLoggedIn ? (

              <div
                className="icon-box"
                onClick={()=>setOpenAuth(true)}
              >
                <User size={20}/>
                <p>Login</p>
              </div>

            ) : (

              <div
                className="icon-box account"
                ref={accountRef}
                onClick={()=>setShowAccountMenu(!showAccountMenu)}
              >
                <User size={20}/>
                <p>Account</p>

                {showAccountMenu && (

                  <div className="account-dropdown">

                    <div onClick={()=>navigate("/profile")}>
                      My Profile
                    </div>

                    <div onClick={()=>navigate("/my-orders")}>
                      My Orders
                    </div>

                    <div>
                      Wishlist
                    </div>

                    <div
                      className="logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>

                  </div>

                )}

              </div>

            )}


          </div>
        </div>
      </nav>

      <CartDrawer open={openCart} setOpen={setOpenCart} />

      <AuthModal open={openAuth} setOpen={setOpenAuth}/>

    </>
  );
};

export default Navbar;