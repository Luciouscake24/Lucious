import "./CategoryModal.css";
import { X, ShoppingCart, ArrowLeft } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import API from "../../config/api";
import { optimizeImage } from "../../utils/image";

const CategoryModal = ({ category, closeModal }) => {

  const { dispatch } = useContext(StoreContext);

  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  /* 🔥 SECOND MODAL STATE */
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const [options, setOptions] = useState({
    weight: "500g",
    flavour: "chocolate",
    date: "",
    slot: "10AM - 1PM",
    message: ""
  });

  const [adding, setAdding] = useState(false);

  /* BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /* LOCK WHEN INNER MODAL OPENS */
  useEffect(() => {
    if (showProductModal) {
      document.body.style.overflow = "hidden";
    }
  }, [showProductModal]);

  /* FETCH DATA */
  useEffect(() => {
    axios.get(`${API}/meta/collection`)
      .then(res => setCollections(res.data))
      .catch(() => {});

    axios.get(`${API}/product/list`)
      .then(res => setProducts(res.data))
      .catch(() => {});
  }, []);

  if (!category) return null;

  /* FILTER COLLECTIONS */
  const categoryCollections = collections.filter(col =>
    col.categoryIds?.some(id => id.toString() === category._id)
  );

  /* FILTER PRODUCTS */
  let collectionProducts = [];

  if (selectedCollection) {
    collectionProducts = products.filter(
      p =>
        p.collectionId === selectedCollection._id ||
        p.collectionSlug === selectedCollection.slug
    );

    collectionProducts = collectionProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "low") {
      collectionProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      collectionProducts.sort((a, b) => b.price - a.price);
    }
  }

  /* ✅ CONFIRM ADD */
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
          ...selectedProduct,
          weight: options.weight,
          flavour: options.flavour,
          deliveryDate: options.date,
          deliverySlot: options.slot,
          message: options.message
        }
      });

      setAdding(false);
      setShowProductModal(false);

    }, 400);
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="category-modal-overlay" onClick={closeModal}>
        
        <div
          className="category-modal-container"
          onClick={(e) => e.stopPropagation()}
        >

          {/* HEADER */}
          <div className="category-modal-header">

            {selectedCollection && (
              <ArrowLeft
                className="category-modal-icon"
                onClick={() => setSelectedCollection(null)}
              />
            )}

            <h2 className="category-modal-title">
              {selectedCollection ? selectedCollection.name : category.name}
            </h2>

            <X
              onClick={closeModal}
              className="category-modal-icon"
            />
          </div>

          {/* COLLECTION VIEW */}
          {!selectedCollection && (
            <div className="category-modal-grid">

              {categoryCollections.length === 0 && (
                <p>No collections found</p>
              )}

              {categoryCollections.map((col) => (
                <div
                  className="category-card"
                  key={col._id}
                  onClick={() => setSelectedCollection(col)}
                >
                  <img
                    className="category-card-img"
                    src={optimizeImage(col.image)}
                    alt={col.name}
                    loading="lazy"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />

                  <h3 className="category-card-title">{col.name}</h3>

                  <button className="category-card-btn">
                    View Cakes
                  </button>
                </div>
              ))}

            </div>
          )}

          {/* PRODUCTS VIEW */}
          {selectedCollection && (
            <>
              <div className="category-modal-controls">

                <input
                  className="category-modal-input"
                  type="text"
                  placeholder="Search cakes..."
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  className="category-modal-select"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="default">Sort</option>
                  <option value="low">Price Low → High</option>
                  <option value="high">Price High → Low</option>
                </select>

              </div>

              <div className="category-modal-grid">

                {collectionProducts.length === 0 && (
                  <p>No cakes found</p>
                )}

                {collectionProducts.map((cake) => (
                  <div className="category-card" key={cake._id}>

                    <img
                      className="category-card-img"
                      src={optimizeImage(cake.image)}
                      alt={cake.name}
                    />

                    <h3 className="category-card-title">{cake.name}</h3>
                    <p className="category-card-price">₹{cake.price}</p>

                    <button
                      className="category-card-btn"
                      onClick={() => {
                        setSelectedProduct(cake);
                        setShowProductModal(true);
                      }}
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>

                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </div>

      {/* 🔥 SECOND MODAL */}
      {showProductModal && selectedProduct && createPortal(

        <div
          className="product-modal"
          onClick={() => setShowProductModal(false)}
        >

          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowProductModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">

              <img
                src={optimizeImage(selectedProduct.image)}
                alt=""
              />

              <div>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-price">₹{selectedProduct.price}</p>
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

export default CategoryModal;