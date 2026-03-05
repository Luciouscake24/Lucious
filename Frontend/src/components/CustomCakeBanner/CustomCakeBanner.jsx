import React from "react";
import "./CustomCakeBanner.css";
import { UploadCloud } from "lucide-react";

const CustomCakeBanner = () => {
  return (
    <section className="custom-banner">

      <div className="custom-container">

        <div className="custom-text">
          <h2>Design Your Dream Cake 🎂</h2>
          <p>
            Have a reference image? Upload it and our expert bakers
            will create the perfect cake for your special day.
          </p>

          <div className="custom-buttons">
            <button className="upload-btn">
              <UploadCloud size={18}/> Upload Design
            </button>

            <button className="consult-btn">
              Talk to Designer
            </button>
          </div>
        </div>

        <div className="custom-image">
          <img
            src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=1200"
            alt="Custom Cake"
          />
        </div>

      </div>

    </section>
  );
};

export default CustomCakeBanner;
