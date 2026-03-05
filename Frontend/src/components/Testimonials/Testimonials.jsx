import React from "react";
import "./Testimonials.css";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Priya Sharma",
    text: "The cake was absolutely delicious and beautifully designed. Delivery was on time and packaging was perfect!",
    img: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Rahul Verma",
    text: "Ordered a surprise cake for my wife. She loved it! The taste and presentation were amazing.",
    img: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Anjali Singh",
    text: "Best cake shop ever! Fresh, soft, and super tasty. Highly recommended for all occasions.",
    img: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>

      <div className="testimonial-row">
        {reviews.map((item, index) => (
          <div className="testimonial-card" key={index}>

            <img src={item.img} alt={item.name} />

            <div className="stars">
              <Star size={16} fill="gold" color="gold"/>
              <Star size={16} fill="gold" color="gold"/>
              <Star size={16} fill="gold" color="gold"/>
              <Star size={16} fill="gold" color="gold"/>
              <Star size={16} fill="gold" color="gold"/>
            </div>

            <p className="review-text">"{item.text}"</p>
            <h4>{item.name}</h4>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
