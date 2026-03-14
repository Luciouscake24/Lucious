import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import API from "../../config/api";
import { optimizeImage } from "../../utils/image";

const Products = () => {

  const store = useContext(StoreContext) || {};
  const state = store.state || { cart: [] };
  const dispatch = store.dispatch || (() => {});
  const cart = state.cart || [];

  const [products,setProducts] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState(null);
  const [adding,setAdding] = useState(false);

  const [options,setOptions] = useState({
    weight:"500g",
    flavour:"Chocolate",
    date:"",
    slot:"",
    message:""
  });

  useEffect(()=>{

    axios
      .get(`${API}/product/bestsellers`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  },[]);

  const getQty = (id)=>{
    const item = cart.find(p => p._id === id);
    return item ? item.quantity : 0;
  };

  const openModal = (product)=>{
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmAdd = ()=>{

    if(!selectedProduct) return;

    setAdding(true);

    setTimeout(()=>{

      dispatch({
        type:"ADD_TO_CART",
        payload:{
          ...selectedProduct,
          ...options
        }
      });

      setAdding(false);
      setShowModal(false);

    },400);
  };

  return (

    <section className="products">

      <h2>Bestseller Cakes</h2>

      <div className="product-row">

        {products.map((item) => (

          <div className="product-card" key={item._id}>

            <div className="product-img">

              <img
                src={optimizeImage(item.image)}
                alt={item.name}
                loading="lazy"
                onError={(e)=>{
                  e.target.src="/placeholder.png";
                }}
              />

              <span className="wishlist">
                <Heart size={18}/>
              </span>

            </div>

            <div className="product-info">

              <h3>{item.name}</h3>

              <p className="price">₹{item.price}</p>

              {getQty(item._id) === 0 ? (

                <button
                  className="cart-btn"
                  onClick={()=>openModal(item)}
                >
                  <ShoppingCart size={18}/> Add to Cart
                </button>

              ) : (

                <div className="qty-box">

                  <button
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_QTY",
                        payload: item._id
                      })
                    }
                  >
                    −
                  </button>

                  <span>{getQty(item._id)}</span>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_QTY",
                        payload: item._id
                      })
                    }
                  >
                    +
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>


      {/* MODAL */}

      {showModal && selectedProduct && (

        <div className="product-modal">

          <div className="modal-box">

            <button
              className="modal-close"
              onClick={()=>setShowModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">

              <img
                src={optimizeImage(selectedProduct.image)}
                alt={selectedProduct.name}
              />

              <div>

                <h2>{selectedProduct.name}</h2>

                <p className="modal-price">
                  ₹{selectedProduct.price}
                </p>

              </div>

            </div>


            <label>Choose Weight</label>

            <div className="option-row">

              {["500g","1kg","1.5kg"].map(w => (

                <button
                  key={w}
                  className={`option-pill ${
                    options.weight === w ? "active" : ""
                  }`}
                  onClick={() =>
                    setOptions({...options,weight:w})
                  }
                >
                  {w}
                </button>

              ))}

            </div>


            <label>Flavour</label>

            <div className="option-row">

              {["Chocolate","Vanilla","Butterscotch"].map(f => (

                <button
                  key={f}
                  className={`option-pill ${
                    options.flavour === f ? "active" : ""
                  }`}
                  onClick={() =>
                    setOptions({...options,flavour:f})
                  }
                >
                  {f}
                </button>

              ))}

            </div>


            <label>Delivery Date</label>

            <input
              type="date"
              className="modal-input"
              onChange={(e)=>
                setOptions({...options,date:e.target.value})
              }
            />

            <label>Delivery Slot</label>

            <select
              className="modal-input"
              onChange={(e)=>
                setOptions({...options,slot:e.target.value})
              }
            >
              <option>10AM - 1PM</option>
              <option>1PM - 4PM</option>
              <option>4PM - 7PM</option>
            </select>


            <label>Cake Message</label>

            <input
              className="modal-input"
              placeholder="Happy Birthday..."
              onChange={(e)=>
                setOptions({...options,message:e.target.value})
              }
            />


            <div className="modal-footer">

              <button
                className="confirm-btn"
                onClick={confirmAdd}
                disabled={adding}
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  );
};

export default Products;