import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const Products = () => {

  const store = useContext(StoreContext) || {};
  const state = store.state || { cart: [] };
  const dispatch = store.dispatch || (() => {});
  const cart = state.cart || [];

  const [products,setProducts] = useState([]);

  /* 🔥 Fetch BESTSELLER products from backend */
  useEffect(()=>{

    axios
      .get("http://localhost:5000/api/product/bestsellers")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  },[]);

  /* 🛒 Get quantity from cart */
  const getQty = (id)=>{
    const item = cart.find(p => p._id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section className="products">

      <h2>Bestseller Cakes</h2>

      <div className="product-row">

        {products.map((item) => (

          <div className="product-card" key={item._id}>

            {/* IMAGE */}

            <div className="product-img">

              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
              />

              <span className="wishlist">
                <Heart size={18}/>
              </span>

            </div>

            {/* INFO */}

            <div className="product-info">

              <h3>{item.name}</h3>

              <p className="price">₹{item.price}</p>

              {/* 🛒 ADD / STEPPER */}

              {getQty(item._id) === 0 ? (

                <button
                  className="cart-btn"
                  onClick={() =>
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: { ...item, quantity: 1 }
                    })
                  }
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

    </section>
  );
};

export default Products;