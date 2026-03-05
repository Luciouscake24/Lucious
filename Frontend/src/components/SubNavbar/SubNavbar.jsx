import React, { useState, useEffect } from "react";
import "./SubNavbar.css";
import CategoryModal from "../CategoryModal/CategoryModal";
import axios from "axios";

const SubNavbar = () => {

  const [categories,setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  /* 🔥 Fetch categories */
  useEffect(()=>{
    axios
      .get("http://localhost:5000/api/meta/category")
      .then(res => {
        console.log("Categories loaded:", res.data);
        setCategories(res.data);
      })
      .catch(err => console.log(err));
  },[]);

  return (
    <>
      <div className="subnav">
        <div className="subnav-wrapper">

          {categories.map((cat) => (
            <span
              key={cat._id}
              className="subnav-item"
              onClick={() => {
                console.log("Clicked:", cat);
                setSelectedCategory(cat);
              }}
            >
              {cat.name}
            </span>
          ))}

        </div>
      </div>

      {/* ⭐ Modal renders ONLY when category selected */}
      {selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          closeModal={() => setSelectedCategory(null)}
        />
      )}
    </>
  );
};

export default SubNavbar;