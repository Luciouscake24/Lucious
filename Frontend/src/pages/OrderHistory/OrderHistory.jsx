import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderHistory.css";

const OrderHistory = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          `${API}/order/my`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        console.log("Orders:", res.data); // 🔥 debug

        setOrders(res.data);

      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

  }, []);

  return (
    <>
      <Navbar />

      <div className="orders-container">
        <h2>My Orders</h2>

        {loading ? (
          <p className="info-text">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="info-text">No orders found</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">

              <div className="order-info">

                <p className="order-total">
                  <strong>Total:</strong> ₹{order.total}
                </p>

                <p className={`status ${order.status.replace(/\s/g, "")}`}>
                  {order.status}
                </p>

                {/* 🔥 ITEMS */}
                <div className="order-items">
                  {order.items?.map((item, index) => (
                    <div className="order-item" key={index}>

                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                      />

                      <div className="item-details">
                        <p className="item-name">
                          {item.name || "Item"}
                        </p>

                        <p className="item-qty">
                          Qty: {item.quantity || 1}
                        </p>

                        {item.price && (
                          <p className="item-price">
                            ₹{item.price}
                          </p>
                        )}
                      </div>

                    </div>
                  ))}
                </div>

              </div>

              <button
                onClick={() => navigate(`/track-order/${order._id}`)}
              >
                Track Order →
              </button>

            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default OrderHistory;