import React, { useEffect, useState } from "react";
import "./TrendingCakes.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../config/api";
import { optimizeImage } from "../../utils/image";
import ProductSkeleton from "../Skeleton/ProductsSkeleton";

const TrendingCakes = () => {

  const navigate = useNavigate();

  const [collections,setCollections] = useState([]);
  const [loading,setLoading] = useState(true);

  /* 🔥 Fetch collections from backend */

  useEffect(()=>{

    axios
      .get(`${API}/meta/collection`)
      .then(res => {

        setCollections(res.data);
        setLoading(false);

      })
      .catch(err => {

        console.log(err);
        setLoading(false);

      });

  },[]);

  /* ⭐ Filter only trending category collections */

  const trendingCollections = collections.filter(
    col => col.categorySlug === "trending"
  );

  return (

    <section className="trending">

      <h2>Trending Cakes</h2>

      <div className="trending-row">

        {loading ? (

          Array.from({length:4}).map((_,i)=>(
            <ProductSkeleton key={i}/>
          ))

        ) : trendingCollections.length === 0 ? (

          <p>No trending cakes available</p>

        ) : (

          trendingCollections.map(col => (

            <div className="trend-card" key={col._id}>

              {/* Optimized Cloudinary image */}

              <img
                src={optimizeImage(col.image)}
                alt={col.name}
                loading="lazy"
                onError={(e)=>{
                  e.target.src="/cake-placeholder.jpg";
                }}
              />

              <h3>{col.name}</h3>

              <button
                className="view-btn"
                onClick={() => navigate(`/shop?collection=${col.slug}`)}
              >
                View Cakes →
              </button>

            </div>

          ))

        )}

      </div>

    </section>

  );

};

export default TrendingCakes;