import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { optimizeImage } from "../../utils/image";   // ⭐ NEW IMPORT
import "./CartDrawer.css";

const CartDrawer = ({ open, setOpen }) => {

  const { state, dispatch } = useContext(StoreContext);
  const cart = state?.cart || [];

  const totalItems = cart.reduce(
    (a, b) => a + b.quantity, 0
  );

  const totalPrice = cart.reduce(
    (a, b) => a + b.price * b.quantity, 0
  );

  const increase = (id) => {
    dispatch({ type: "INCREASE_QTY", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE_QTY", payload: id });
  };

  const remove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (

    <div
      className={`drawer-overlay ${open ? "show" : ""}`}
      onClick={() => setOpen(false)}
    >

      <div
        className={`drawer ${open ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="drawer-header">

          <h2>Cart ({totalItems})</h2>

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

        </div>

        {/* ITEMS */}

        <div className="drawer-items">

          {cart.length === 0 && (
            <p className="empty-cart">
              Your cart is empty 🛒
            </p>
          )}

          {cart.map(item => (

            <div
              key={item._id}
              className="drawer-item"
            >

              <img
                src={optimizeImage(item.image)}   // ⭐ OPTIMIZED IMAGE
                alt={item.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/cake-placeholder.jpg";
                }}
              />

              <div className="item-info">

                <h4>{item.name}</h4>

                <p className="price">
                  ₹{item.price}
                </p>

                <div className="qty-box">

                  <button
                    onClick={() => decrease(item._id)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increase(item._id)}
                  >
                    +
                  </button>

                </div>

              </div>

              <button
                className="remove-btn"
                onClick={() => remove(item._id)}
              >
                🗑
              </button>

            </div>

          ))}

        </div>

        {/* FOOTER */}

        {cart.length > 0 && (

          <div className="drawer-footer">

            <div className="total">
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>

            <button className="checkout-btn">
              Checkout
            </button>

          </div>

        )}

      </div>

    </div>

  );

};

export default CartDrawer;