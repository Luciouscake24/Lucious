import { useState } from "react";
import axios from "axios";
import API from "../../config/api";

const TrackOrder = () => {

  const [orderId,setOrderId] = useState("");
  const [order,setOrder] = useState(null);

  const searchOrder = async()=>{

    const res = await axios.get(
      `${API}/order/${orderId}`
    );

    setOrder(res.data);

  };

  return (

    <div className="track-page">

      <h2>Track Your Order</h2>

      <input
      placeholder="Enter Order ID"
      value={orderId}
      onChange={(e)=>setOrderId(e.target.value)}
      />

      <button onClick={searchOrder}>
        Track
      </button>

      {order && (

        <div className="track-card">

          <h3>Status: {order.status}</h3>

          <p>Total: ₹{order.total}</p>

          <p>Customer: {order.customer.name}</p>

        </div>

      )}

    </div>

  );

};

export default TrackOrder;