import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {

  const navigate = useNavigate();

  return (

    <div className="order-success">

      <div className="success-card">

        <h1>🎉 Order Placed!</h1>

        <p>Your cake order has been successfully placed.</p>

        <button
        onClick={()=>navigate("/")}
        >
          Continue Shopping
        </button>

        <button
        onClick={()=>navigate("/track-order")}
        >
          Track Order
        </button>

      </div>

    </div>

  );
};

export default OrderSuccess;