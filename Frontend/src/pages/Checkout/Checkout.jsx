import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import API from "../../config/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Checkout.css";

const CheckoutPage = () => {

  const { state, dispatch } = useContext(StoreContext);

  const cart = state.cart || [];

  const totalPrice = cart.reduce(
    (a,b)=> a + b.price * b.quantity,0
  );

  const [form,setForm] = useState({
    name:"",
    phone:"",
    email:"",
    address:"",
    city:"",
    pincode:"",
    payment:"COD"
  });

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const placeOrder = async ()=>{

    if(cart.length===0){
      alert("Cart is empty");
      return;
    }

    try{

      const order = {
        customer:form,
        items:cart,
        total:totalPrice
      };

      const res = await axios.post(
        `${API}/order`,
        order
      );

      alert("Order Placed Successfully 🎉");

      dispatch({ type:"CLEAR_CART" });

      console.log(res.data);

    }catch(err){

      console.log(err);
      alert("Order failed");

    }

  };

  return(

    <>
      <Navbar/>

      <div className="checkout-page">

        {/* LEFT SIDE */}

        <div className="checkout-form">

          <h2>Delivery Details</h2>

          <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          />

          <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          />

          <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          />

          <textarea
          name="address"
          placeholder="Full Address"
          value={form.address}
          onChange={handleChange}
          />

          <div className="row">

            <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            />

            <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            />

          </div>

          <h3>Payment Method</h3>

          <label className="payment-option">
            <input
            type="radio"
            name="payment"
            value="COD"
            checked={form.payment==="COD"}
            onChange={handleChange}
            />
            Cash On Delivery
          </label>

          <label className="payment-option">
            <input
            type="radio"
            name="payment"
            value="Online"
            checked={form.payment==="Online"}
            onChange={handleChange}
            />
            Online Payment
          </label>

        </div>


        {/* RIGHT SIDE */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map(item=>(
            <div
            key={item._id}
            className="summary-item"
            >

              <div>

                <h4>{item.name}</h4>

                {item.weight && <p>{item.weight}</p>}
                {item.flavour && <p>{item.flavour}</p>}

                <p>Qty: {item.quantity}</p>

              </div>

              <span>
                ₹{item.price * item.quantity}
              </span>

            </div>
          ))}

          <div className="summary-total">

            <span>Total</span>

            <strong>₹{totalPrice}</strong>

          </div>

          <button
          className="place-order-btn"
          onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

      <Footer/>
    </>
  );

};

export default CheckoutPage;