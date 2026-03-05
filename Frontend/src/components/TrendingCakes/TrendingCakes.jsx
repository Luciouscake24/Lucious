import React, { useEffect, useState } from "react";
import "./TrendingCakes.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TrendingCakes = () => {
  const navigate = useNavigate();
  const [collections,setCollections] = useState([]);

  /* 🔥 Fetch collections from backend */
  useEffect(()=>{
    axios
      .get("http://localhost:5000/api/meta/collection")
      .then(res => setCollections(res.data))
      .catch(err => console.log(err));
  },[]);

  /* ⭐ Filter only trending category collections */
  const trendingCollections = collections.filter(
    col => col.categorySlug === "trending"
  );

  return (
    <section className="trending">
      <h2>Trending Cakes</h2>

      <div className="trending-row">
        {trendingCollections.map(col => (
          <div className="trend-card" key={col._id}>

            {/* Cloudinary image */}
            <img src={col.image} alt={col.name} />

            <h3>{col.name}</h3>

            <button
              className="view-btn"
              onClick={() => navigate(`/shop?collection=${col.slug}`)}
            >
              View Cakes →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingCakes;