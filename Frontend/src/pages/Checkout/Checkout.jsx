import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import API from "../../config/api";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const CheckoutPage = () => {

  const { state, dispatch } = useContext(StoreContext);
  const navigate = useNavigate();

  const cart = state.cart || [];

  const totalPrice = cart.reduce(
    (a, b) => a + b.price * b.quantity, 0
  );

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async () => {

    // 🔒 check login
    const token = sessionStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!form.name || !form.phone || !form.address) {
      alert("Please fill required fields");
      return;
    }

    try {

      setLoading(true);

      const orderData = {
  customer: {   // ✅ MUST be customer
    name: form.name,
    phone: form.phone,
    email: form.email,
    address: form.address,
    city: form.city,
    pincode: form.pincode,
    payment: form.payment
  },

  items: cart.map(item => ({
    _id: item._id,   // backend expects this
    quantity: item.quantity,
    weight: item.weight,
    flavour: item.flavour
  })),




        total: totalPrice
      };

      const res = await axios.post(
        `${API}/order`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}` // 🔥 FIXED
          }
        }
      );

      if (res.data.success) {

        dispatch({ type: "CLEAR_CART" });

        navigate("/order-success"); // ✅ clean redirect

      }

    } catch (err) {

      console.log(err);

      if (err.response?.status === 401) {
        alert("Session expired, login again");
        navigate("/login");
      } else {
        alert("Order failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }

  };

  return (

    <>
      <Navbar />

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
              checked={form.payment === "COD"}
              onChange={handleChange}
            />
            Cash On Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Online"
              checked={form.payment === "Online"}
              onChange={handleChange}
            />
            Online Payment
          </label>

        </div>

        {/* RIGHT SIDE */}
        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.map(item => (
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
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </div>

      </div>

      <Footer />
    </>
  );

};

export default CheckoutPage;