import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { StoreContext } from "../../context/StoreContext";
import { optimizeImage } from "../../utils/image";
import "./ProductCard.css";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();
  const { dispatch } = useContext(StoreContext);

  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const [options, setOptions] = useState({
    weight: "500g",
    flavour: "chocolate",
    date: "",
    slot: "10AM - 1PM",
    message: ""
  });

  /* LOCK BODY SCROLL */
  useEffect(() => {
    if (showModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showModal]);

  const confirmAdd = () => {

    if (!options.date) {
      alert("Select delivery date");
      return;
    }

    setAdding(true);

    setTimeout(() => {

      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...product,
          weight: options.weight,
          flavour: options.flavour,
          deliveryDate: options.date,
          deliverySlot: options.slot,
          message: options.message
        }
      });

      setAdding(false);
      setShowModal(false);

    }, 400);
  };

  return (
    <>
      <div className="product-card">

        {/* IMAGE */}
        <div
          className="img-box"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            src={optimizeImage(product.image)}
            alt={product.name}
          />
        </div>

        {/* INFO */}
        <div className="product-info">

          <h3>{product.name}</h3>
          <p className="price">₹{product.price}</p>

          <button
            className="add-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
          >
            Add to Cart 🛒
          </button>

        </div>

      </div>

      {/* 🔥 MODAL USING PORTAL */}

      {showModal && createPortal(

        <div
          className="product-modal"
          onClick={() => setShowModal(false)}
        >

          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">

              <img
                src={optimizeImage(product.image)}
                alt=""
              />

              <div>
                <h2>{product.name}</h2>
                <p className="modal-price">₹{product.price}</p>
              </div>

            </div>

            {/* WEIGHT */}
            <label>Choose Weight</label>
            <div className="option-row">
              {["500g", "1kg", "1.5kg"].map(w => (
                <button
                  key={w}
                  className={`option-pill ${options.weight === w ? "active" : ""}`}
                  onClick={() => setOptions({ ...options, weight: w })}
                >
                  {w}
                </button>
              ))}
            </div>

            {/* FLAVOUR */}
            <label>Flavour</label>
            <div className="option-row">
              {["chocolate", "vanilla", "butterscotch"].map(f => (
                <button
                  key={f}
                  className={`option-pill ${options.flavour === f ? "active" : ""}`}
                  onClick={() => setOptions({ ...options, flavour: f })}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* DATE */}
            <label>Delivery Date</label>
            <input
              type="date"
              className="modal-input"
              onChange={(e) =>
                setOptions({ ...options, date: e.target.value })
              }
            />

            {/* SLOT */}
            <label>Delivery Slot</label>
            <select
              className="modal-input"
              onChange={(e) =>
                setOptions({ ...options, slot: e.target.value })
              }
            >
              <option>10AM - 1PM</option>
              <option>1PM - 4PM</option>
              <option>4PM - 7PM</option>
            </select>

            {/* MESSAGE */}
            <label>Cake Message</label>
            <input
              className="modal-input"
              placeholder="Happy Birthday..."
              onChange={(e) =>
                setOptions({ ...options, message: e.target.value })
              }
            />

            <button
              className="confirm-btn"
              onClick={confirmAdd}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>

          </div>
        </div>,

        document.body
      )}
    </>
  );
};

export default ProductCard;