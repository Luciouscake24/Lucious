import React, { useEffect, useState } from "react";
import "./Collections.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../config/api";
import { optimizeImage } from "../../utils/image";   // ⭐ NEW IMPORT

const Collections = () => {

  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  useEffect(() => {

    const fetchCollections = async () => {
      try {
        const res = await axios.get(`${API}/meta/collection`);
        console.log(res.data);
        setCollections(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCollections();

  }, []);

  return (
    <section className="collections">

      <h2>Shop Our Curated Collections Today!</h2>

      <p className="subtitle">
        Explore timeless favorites crafted with traditional recipes and flavors,
        perfect for any occasion.
      </p>

      <div className="collection-grid">

        {collections.length === 0 && (
          <p>No collections found</p>
        )}

        {collections.map((col) => (

          <div className="collection-card" key={col._id}>

            <img
              src={optimizeImage(col.image)}   // ⭐ OPTIMIZED IMAGE
              alt={col.name}
              loading="lazy"
              onError={(e)=>{
                e.target.src="/placeholder.png";
              }}
            />

            <div className="collection-overlay">

              <h3>{col.name}</h3>

              <p>
                Discover delicious {col.name.toLowerCase()} cakes crafted for your special moments.
              </p>

              <button
                onClick={() =>
                  navigate(`/shop?collection=${col.slug}`)
                }
              >
                Explore Now →
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Collections;