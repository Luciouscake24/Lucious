import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../config/api";
import "./Order.css";

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔔 Track previous order count
  const [prevCount, setPrevCount] = useState(0);

  const fetchOrders = async () => {

    try {

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${API}/order`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Orders:", res.data);

      setOrders(res.data);

    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {

    fetchOrders();

    // 🔄 Auto refresh every 5 sec
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  // 🔔 Detect new order
  useEffect(() => {

    if (prevCount !== 0 && orders.length > prevCount) {
      alert("🔔 New Order Received!");
    }

    setPrevCount(orders.length);

  }, [orders]);

  const updateStatus = async (id, status) => {

    try {

      const token = sessionStorage.getItem("token");

      await axios.put(
        `${API}/order/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchOrders();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }

  };

  return (

    <div className="admin-orders">

      <h2>Orders</h2>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((o) => (

              <tr key={o._id}>

                {/* 👤 CUSTOMER NAME */}
                <td>{o.customer?.name || "N/A"}</td>

                {/* 📞 PHONE */}
                <td>{o.customer?.phone || "N/A"}</td>

                {/* 📍 ADDRESS */}
                <td>
                  {o.customer
                    ? `${o.customer.address}, ${o.customer.city || ""} - ${o.customer.pincode || ""}`
                    : "N/A"}
                </td>

                {/* 🛒 ITEMS */}
                <td>
                  {o.items?.length > 0 ? (
                    o.items.map((item, i) => (
                      <div key={i}>
                        {item.name} x {item.quantity}
                      </div>
                    ))
                  ) : (
                    "No items"
                  )}
                </td>

                {/* 💰 TOTAL */}
                <td>₹{o.total}</td>

                {/* 📦 STATUS */}
                <td>
                  <span className={`status-badge ${o.status.replace(/\s/g, "")}`}>
                    {o.status}
                  </span>
                </td>

                {/* 🔄 ACTION */}
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o._id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

};

export default Orders;