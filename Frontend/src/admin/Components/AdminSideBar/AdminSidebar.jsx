import { Link } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2>Licious Admin</h2>

      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/add-product">Add Product</Link>
      <Link to="/admin/products">All Products</Link>
      <Link to="/admin/add-categories">Add Categories</Link>
      <Link to="/admin/add-collections">Add Collections</Link>
      <Link to="/admin/add-occasions">Add Occasions</Link>
      <Link to="/admin/add-tags">Add Tags</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/CakeFilter">Cake Filter</Link>
    </div>
  );
};

export default AdminSidebar;