import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { optimizeImage } from "../../utils/image";
import "./ProductCard.css";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);

  const [showOptions,setShowOptions] = useState(false);
  const [adding,setAdding] = useState(false);
  const [toast,setToast] = useState(false);

  const handleAddToCart = () => {

    setAdding(true);

    setTimeout(()=>{

      dispatch({
        type:"ADD_TO_CART",
        payload:product
      });

      setAdding(false);
      setShowOptions(false);
      setToast(true);

      setTimeout(()=>{
        setToast(false);
      },2000);

    },500);

  };

  return (
    <>
      <div className="product-card">

        <div
          className="img-box"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            src={optimizeImage(product.image)}
            alt={product.name}
            loading="lazy"
            onError={(e)=>{
              e.target.src="/cake-placeholder.jpg";
            }}
          />
        </div>

        <div className="product-info">

          <h3>{product.name}</h3>

          <div className="tags">
            {product.tags?.slice(0,2).map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <p className="price">₹ {product.price}</p>

          <button
            className="add-btn"
            onClick={()=>setShowOptions(true)}
          >
            Add to Cart 🛒
          </button>

        </div>

      </div>


      {/* OPTIONS MODAL */}

      {showOptions && (

        <div className="product-modal">

          <div className="modal-box">

            <h2>{product.name}</h2>

            <label>Weight</label>
            <select>
              <option>500g</option>
              <option>1kg</option>
              <option>1.5kg</option>
            </select>

            <label>Flavour</label>
            <select>
              <option>Chocolate</option>
              <option>Vanilla</option>
              <option>Butterscotch</option>
            </select>

            <label>Delivery Date</label>
            <input type="date"/>

            <label>Delivery Slot</label>
            <select>
              <option>10AM - 1PM</option>
              <option>1PM - 4PM</option>
              <option>4PM - 7PM</option>
            </select>

            <label>Cake Message</label>
            <input type="text" placeholder="Happy Birthday..." />

            <button
              className="confirm-btn"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : "Confirm Add to Cart"}
            </button>

            <button
              className="close-btn"
              onClick={()=>setShowOptions(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}


      {/* SUCCESS MESSAGE */}

      {toast && (
        <div className="cart-toast">
          ✔ Item added to cart
        </div>
      )}

    </>
  );
};

export default ProductCard;