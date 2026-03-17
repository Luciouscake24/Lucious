import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../../config/api";

const Orders = () => {

  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);

  const fetchOrders = async()=>{

    try{

      const token = sessionStorage.getItem("token");

      const res = await axios.get(
        `${API}/order`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setOrders(res.data);

    }catch(err){
      console.log(err.response?.data || err.message);
    }finally{
      setLoading(false);
    }

  };

  useEffect(()=>{
    fetchOrders();
  },[]);

  const updateStatus = async(id,status)=>{

    try{

      const token = sessionStorage.getItem("token");

      await axios.put(
        `${API}/order/${id}`,
        { status },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchOrders();

    }catch(err){
      console.log(err.response?.data || err.message);
    }

  };

  return(

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
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.map(o=>(
              <tr key={o._id}>

                <td>{o.customer?.name}</td>
                <td>₹{o.total}</td>
                <td>{o.status}</td>

                <td>
                  <select
                    value={o.status}
                    onChange={(e)=>updateStatus(o._id,e.target.value)}
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