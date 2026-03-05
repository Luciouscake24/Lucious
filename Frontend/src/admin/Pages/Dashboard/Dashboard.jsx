import "./Dashboard.css";
import { Cake, ShoppingCart, IndianRupee, Users, Plus } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="dashboard">

      <h1>Admin Dashboard 🎂</h1>
      <p className="sub">Welcome back, manage your cake shop easily.</p>

      {/* ================= STATS ================= */}
      <div className="stats-grid">

        <div className="stat-card">
          <Cake size={30}/>
          <div>
            <h2>120</h2>
            <p>Total Products</p>
          </div>
        </div>

        <div className="stat-card">
          <ShoppingCart size={30}/>
          <div>
            <h2>86</h2>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <IndianRupee size={30}/>
          <div>
            <h2>₹45,200</h2>
            <p>Total Revenue</p>
          </div>
        </div>

        <div className="stat-card">
          <Users size={30}/>
          <div>
            <h2>52</h2>
            <p>Customers</p>
          </div>
        </div>

      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <h2 className="section-title">Quick Actions</h2>

      <div className="quick-actions">
        <button><Plus size={18}/> Add New Product</button>
        <button>📦 View Orders</button>
        <button>📂 Manage Categories</button>
      </div>

      {/* ================= RECENT ORDERS ================= */}
      <h2 className="section-title">Recent Orders</h2>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#1023</td>
              <td>Rahul Sharma</td>
              <td>₹1299</td>
              <td className="pending">Pending</td>
            </tr>
            <tr>
              <td>#1022</td>
              <td>Pooja Das</td>
              <td>₹899</td>
              <td className="delivered">Delivered</td>
            </tr>
            <tr>
              <td>#1021</td>
              <td>Amit Roy</td>
              <td>₹1599</td>
              <td className="cancelled">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;