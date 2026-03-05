import React from "react";
import "./Features.css";
import { Truck, CakeSlice, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Truck size={36}/>,
    title: "Same Day Delivery",
    desc: "Get your cakes delivered fresh on the same day."
  },
  {
    icon: <CakeSlice size={36}/>,
    title: "Freshly Baked",
    desc: "Every cake is baked after you place the order."
  },
  {
    icon: <Sparkles size={36}/>,
    title: "Hygienic Kitchen",
    desc: "Prepared with highest hygiene & safety standards."
  },
  {
    icon: <ShieldCheck size={36}/>,
    title: "Secure Payments",
    desc: "Safe & trusted online payment methods."
  },
  {
    icon: <PhoneCall size={36}/>,
    title: "24/7 Support",
    desc: "We are here to help anytime you need."
  }
];

const Features = () => {
  return (
    <section className="features">
      <h2>Why Choose Us</h2>

      <div className="features-row">
        {features.map((item, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
