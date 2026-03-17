import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../config/api";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./TrackOrder.css";

const TrackOrder = () => {

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrder = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get(
          `${API}/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setOrder(res.data);

      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchOrder();

  }, [id]);

  // 🔥 Order Steps
  const steps = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Out for Delivery",
    "Delivered"
  ];

  const currentStep = steps.indexOf(order?.status);

  const progressPercent =
    currentStep >= 0
      ? ((currentStep + 1) / steps.length) * 100
      : 0;

  return (
    <>
      <Navbar />

      <div className="track-container">
        <h2>Track Order</h2>

        {loading ? (
          <p className="info-text">Loading...</p>
        ) : !order ? (
          <p className="info-text">Order not found</p>
        ) : (
          <div className="track-card">

            {/* STATUS */}
            <h3 className="status-badge">
              {order.status}
            </h3>

            <p><strong>Total:</strong> ₹{order.total}</p>
            <p><strong>Name:</strong> {order.customer?.name}</p>

            {/* 🔥 PROGRESS TRACKER */}
            <div className="progress-wrapper">

              <div className="progress-line"></div>

              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>

              <div className="progress-steps">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className={`step ${
                      index <= currentStep ? "active" : ""
                    }`}
                  >
                    <div className="circle">{index + 1}</div>
                    <p>{step}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default TrackOrder;