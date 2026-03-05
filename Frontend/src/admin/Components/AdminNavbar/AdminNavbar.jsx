import "./AdminNavbar.css";
import { Bell, UserCircle } from "lucide-react";

const AdminNavbar = () => {
  return (
    <div className="admin-navbar">
      <h2>Dashboard</h2>

      <div className="admin-nav-right">
        <Bell size={20}/>
        <div className="admin-profile">
          <UserCircle size={28}/>
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;