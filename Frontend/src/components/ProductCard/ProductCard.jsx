import React from "react";
import { useNavigate } from "react-router-dom";
import { optimizeImage } from "../../utils/image";   // ⭐ IMAGE OPTIMIZER
import "./ProductCard.css";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  return (
    <div className="product-card">
      
      {/* Click image → product page */}

      <div
        className="img-box"
        onClick={() => navigate(`/product/${product._id}`)}
      >

        <img
          src={optimizeImage(product.image)}   // ⭐ OPTIMIZED IMAGE
          alt={product.name}
          loading="lazy"
          onError={(e)=>{
            e.target.src="/cake-placeholder.jpg";
          }}
        />

      </div>

      <div className="product-info">

        <h3>{product.name}</h3>

        {/* TAGS */}

        <div className="tags">

          {product.tags?.slice(0,2).map(tag => (
            <span key={tag}>{tag}</span>
          ))}

        </div>

        <p className="price">₹ {product.price}</p>

        <button className="add-btn">
          Add to Cart 🛒
        </button>

      </div>

    </div>
  );

};

export default ProductCard;