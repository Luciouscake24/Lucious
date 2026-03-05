import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./CartDrawer.css";

const CartDrawer = ({ open, setOpen }) => {
  const store = useContext(StoreContext) || {};
  const state = store.state || { cart: [] };
  const dispatch = store.dispatch || (() => {});

  const cart = state.cart || [];

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`drawer-overlay ${open ? "show" : ""}`}
      onClick={() => setOpen(false)}
    >
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="drawer-header">
          <h2>Cart ({totalItems})</h2>
          <span className="close-btn" onClick={() => setOpen(false)}>✕</span>
        </div>

        {/* ITEMS */}
        <div className="drawer-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty 😢</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="drawer-item">
                <img src={item.img} alt="" />

                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>

                  <div className="qty-box">
                    <button onClick={() => dispatch({ type:"DECREASE_QTY", payload:item.id })}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch({ type:"INCREASE_QTY", payload:item.id })}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            <h3>Total: ₹{totalPrice}</h3>
            <button className="checkout-btn">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;