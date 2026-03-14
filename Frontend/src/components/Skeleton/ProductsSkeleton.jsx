import React from "react";
import "./ProductsSkeleton.css";

const ProductSkeleton = () => {

  return (

    <div className="product-card skeleton">

      <div className="skeleton-img"></div>

      <div className="skeleton-text title"></div>

      <div className="skeleton-text price"></div>

      <div className="skeleton-btn"></div>

    </div>

  );

};

export default ProductSkeleton;