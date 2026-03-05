import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSideBar/AdminSidebar";
import AdminNavbar from "../AdminNavbar/AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />
        <div className="admin-content">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;