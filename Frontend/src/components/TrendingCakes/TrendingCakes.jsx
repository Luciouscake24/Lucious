import React, { useEffect, useState } from "react";
import "./TrendingCakes.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../config/api";
import { optimizeImage } from "../../utils/image";
import ProductSkeleton from "../Skeleton/ProductsSkeleton";

const TrendingCakes = () => {

  const navigate = useNavigate();

  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchTrending = async () => {
      try {

        const res = await axios.get(`${API}/trending`);
        // OR → `${API}/product/trending`

        setCakes(res.data);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();

  }, []);

  return (

    <section className="trending">

      <h2>Trending Cakes</h2>

      <div className="trending-row">

        {loading ? (

          Array.from({ length: 10 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))

        ) : cakes.length === 0 ? (

          <p>No trending cakes available</p>

        ) : (

          cakes.slice(0, 10).map((cake) => (  // 🔥 LIMIT HERE

            <div className="trend-card" key={cake._id}>

              <img
                src={optimizeImage(cake.image)}
                alt={cake.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/cake-placeholder.jpg";
                }}
              />

              <h3>{cake.name}</h3>

              <span className="badge">🔥 Trending</span>

              <button
                className="view-btn"
                onClick={() => navigate(`/product/${cake._id}`)}
              >
                View Cake →
              </button>

            </div>

          ))

        )}

      </div>

    </section>

  );

};

export default TrendingCakes;