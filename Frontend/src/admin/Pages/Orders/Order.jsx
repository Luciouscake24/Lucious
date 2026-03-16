import { useEffect,useState } from "react";
import axios from "axios";
import API from "../../../config/api";

const Orders = ()=>{

  const [orders,setOrders] = useState([]);

  const fetchOrders = async()=>{

    const res = await axios.get(
      `${API}/order`
    );

    setOrders(res.data);

  };

  useEffect(()=>{
    fetchOrders();
  },[]);

  const updateStatus = async(id,status)=>{

    await axios.put(
      `${API}/order/${id}`,
      {status}
    );

    fetchOrders();

  };

  return(

    <div className="admin-orders">

      <h2>Orders</h2>

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

              <td>{o.customer.name}</td>

              <td>₹{o.total}</td>

              <td>{o.status}</td>

              <td>

                <select
                onChange={(e)=>
                  updateStatus(
                    o._id,
                    e.target.value
                  )
                }
                >

                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>Out for delivery</option>
                  <option>Delivered</option>

                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );

};

export default Orders;