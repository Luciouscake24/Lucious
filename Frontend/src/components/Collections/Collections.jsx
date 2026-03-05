import React, { useEffect, useState } from "react";
import "./Collections.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Collections = () => {

  const navigate = useNavigate();
  const [categories,setCategories] = useState([]);

  /* 🔥 Fetch categories from backend */
  useEffect(()=>{
    axios
      .get("http://localhost:5000/api/meta/category")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  },[]);

  return (
    <section className="collections">
      <h2>Shop Our Curated Collections Today!</h2>

      <p className="subtitle">
        Explore timeless favorites crafted with traditional recipes and flavors,
        perfect for any occasion.
      </p>

      <div className="collection-grid">
        {categories.map((cat) => (
          <div className="collection-card" key={cat._id}>

            <img src={cat.image} alt={cat.name} />

            <div className="collection-overlay">
              <h3>{cat.name}</h3>

              <p>
                Discover delicious {cat.name.toLowerCase()} crafted for your
                special moments.
              </p>

              <button
                onClick={() =>
                  navigate(`/shop?category=${cat.slug}`)
                }
              >
                <span>Explore Now →</span>
              </button>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;