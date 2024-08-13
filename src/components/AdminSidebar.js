import React from 'react';
import '../css/AdminSidebar.css'; // Import CSS for AdminSidebar

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li><a href="/admin">Dashboard</a></li>
        <li><a href="/admin/products">Manage Products</a></li>
        <li><a href="/admin/orders">Manage Orders</a></li>
        <li><a href="/admin/users">Manage Users</a></li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
