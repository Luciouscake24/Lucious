import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { optimizeImage } from "../../utils/image";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart
} from "lucide-react";

import "./CartDrawer.css";

const CartDrawer = ({ open, setOpen }) => {

  const { state, dispatch } = useContext(StoreContext);

  const cart = state?.cart || [];

  const totalItems = cart.reduce((a, b) => a + b.quantity, 0);

  const totalPrice = cart.reduce(
    (a, b) => a + b.price * b.quantity,
    0
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

          <h2>
            <ShoppingCart size={20} /> Cart ({totalItems})
          </h2>

          <button
            className="close-btn"
            onClick={() => setOpen(false)}
          >
            <X size={18} />
          </button>

        </div>

        {/* ITEMS */}

        <div className="drawer-items">

          {cart.length === 0 && (
            <p className="empty-cart">
              <ShoppingCart size={20} /> Your cart is empty
            </p>
          )}

          {cart.map((item) => (

            <div
              key={item._id + item.weight + item.flavour}
              className="drawer-item"
            >

              <img
                src={optimizeImage(item.image)}
                alt={item.name}
              />

              <div className="item-info">

                <h4>{item.name}</h4>

                <p className="price">
                  ₹{item.price}
                </p>

                {item.weight && (
                  <p className="cart-meta">
                    Weight: {item.weight}
                  </p>
                )}

                {item.flavour && (
                  <p className="cart-meta">
                    Flavour: {item.flavour}
                  </p>
                )}

                {item.deliveryDate && (
                  <p className="cart-meta">
                    Date: {item.deliveryDate}
                  </p>
                )}

                {item.deliverySlot && (
                  <p className="cart-meta">
                    Slot: {item.deliverySlot}
                  </p>
                )}

                {item.message && (
                  <p className="cart-meta">
                    Message: {item.message}
                  </p>
                )}

                {/* QTY */}

                <div className="qty-box">

                  <button onClick={() => decrease(item._id)}>
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increase(item._id)}>
                    <Plus size={14} />
                  </button>

                </div>

              </div>

              {/* REMOVE */}

              <button
                className="remove-btn"
                onClick={() => remove(item._id)}
              >
                <Trash2 size={16} />
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