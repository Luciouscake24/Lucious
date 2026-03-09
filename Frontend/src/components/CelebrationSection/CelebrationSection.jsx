import React, { useEffect, useState } from "react";
import "./CelebrationSection.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CelebrationSection = () => {
  const navigate = useNavigate();
  const [occasions, setOccasions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/meta/occasion")
      .then((res) => {
        setOccasions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleExplore = (slug) => {
    if (slug) {
      navigate(`/shop?occasion=${slug}`);
    } else {
      navigate("/shop");
    }
  };

  return (
    <section className="celebration">
      <h2>Celebrate Every Occasion </h2>

      <div className="celebration-row">
        {occasions.length === 0 && (
          <p className="empty-msg">No occasions available</p>
        )}

        {occasions.map((event) => (
          <div className="celebration-card" key={event._id}>
            
            <div className="celebration-img">
              <img src={event.image} alt={event.name} />
            </div>

            <div className="celebration-content">
              <h3>{event.name}</h3>

              <button onClick={() => handleExplore(event.slug)}>
                Explore Cakes →
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default CelebrationSection;