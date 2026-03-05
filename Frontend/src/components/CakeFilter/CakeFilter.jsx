import React, { useState } from "react";
import "./CakeFilter.css";
import {
  CakeSlice,
  Sparkles,
  Gift,
  Package,
  Crown,
  Heart,
  CupSoda,
  Image
} from "lucide-react";

const categories = [
  { name: "Customized", icon: <Sparkles size={28}/> },
  { name: "Fresh Arrivals", icon: <CakeSlice size={28}/> },
  { name: "Surprise Box", icon: <Gift size={28}/> },
  { name: "Combos", icon: <Package size={28}/> },
  { name: "Premium", icon: <Crown size={28}/> },
  { name: "Heart Shape", icon: <Heart size={28}/> },
  { name: "Cup Cake", icon: <CupSoda size={28}/> },
  { name: "Photo Cake", icon: <Image size={28}/> }
];

const CakeFilter = () => {
  const [active, setActive] = useState("Customized");

  return (
    <section className="cake-filter">
      <h2>Browse By Category</h2>

      <div className="filter-row">
        {categories.map((item) => (
          <div
            key={item.name}
            className={`filter-card ${active === item.name ? "active" : ""}`}
            onClick={() => setActive(item.name)}
          >
            {item.icon}
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CakeFilter;
