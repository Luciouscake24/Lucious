import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { optimizeImage } from "../../utils/image";

import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Bookmark,
  RotateCcw
} from "lucide-react";

import "./CartDrawer.css";

const CartDrawer = ({ open, setOpen }) => {

  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const cart = state?.cart || [];
  const saveForLater = state?.saveForLater || [];

  const totalItems = cart.reduce((a,b)=> a + b.quantity,0);

  const totalPrice = cart.reduce(
    (a,b)=> a + b.price * b.quantity,0
  );

  /* ACTIONS */

  const increase = (key)=>{
    dispatch({type:"INCREASE_QTY",payload:key});
  };

  const decrease = (key)=>{
    dispatch({type:"DECREASE_QTY",payload:key});
  };

  const remove = (key)=>{
    dispatch({type:"REMOVE_FROM_CART",payload:key});
  };

  const saveItem = (key)=>{
    dispatch({type:"SAVE_FOR_LATER",payload:key});
  };

  const moveToCart = (key)=>{
    dispatch({type:"MOVE_TO_CART",payload:key});
  };

  const handleCheckout = ()=>{
    setOpen(false);
    navigate("/checkout");
  };

  return(

    <div
      className={`drawer-overlay ${open ? "show":""}`}
      onClick={()=>setOpen(false)}
    >

      <div
        className={`drawer ${open ? "open":""}`}
        onClick={(e)=>e.stopPropagation()}
      >

        {/* HEADER */}

        <div className="drawer-header">

          <h2>
            <ShoppingCart size={20}/> Cart ({totalItems})
          </h2>

          <button
            className="close-btn"
            onClick={()=>setOpen(false)}
          >
            <X size={18}/>
          </button>

        </div>


        {/* CART ITEMS */}

        <div className="drawer-items">

          {cart.length===0 && (
            <p className="empty-cart">
              <ShoppingCart size={20}/> Your cart is empty
            </p>
          )}

          {cart.map(item=>(

            <div
              key={item.cartKey}
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

                {/* QUANTITY */}

                <div className="qty-box">

                  <button onClick={()=>decrease(item.cartKey)}>
                    <Minus size={14}/>
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={()=>increase(item.cartKey)}>
                    <Plus size={14}/>
                  </button>

                </div>

              </div>

              {/* ACTIONS */}

              <div className="item-actions">

                <button
                  className="save-btn"
                  onClick={()=>saveItem(item.cartKey)}
                >
                  <Bookmark size={14}/> Later
                </button>

                <button
                  className="remove-btn"
                  onClick={()=>remove(item.cartKey)}
                >
                  <Trash2 size={16}/>
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* SAVED ITEMS */}

        {saveForLater.length>0 && (

          <div className="save-section">

            <h3>Saved For Later</h3>

            {saveForLater.map(item=>(

              <div
                key={item.cartKey}
                className="drawer-item saved"
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

                  <button
                    className="move-btn"
                    onClick={()=>moveToCart(item.cartKey)}
                  >
                    <RotateCcw size={14}/> Move to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}


        {/* FOOTER */}

        {cart.length>0 && (

          <div className="drawer-footer">

            <div className="total">
              <span>Total</span>
              <strong>₹{totalPrice}</strong>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

          </div>

        )}

      </div>

    </div>
  );
};

export default CartDrawer;