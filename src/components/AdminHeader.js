import React from 'react';
import '../css/AdminHeader.css';
import logo from '../assets/image.png'; // Adjusted import path

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>QuickBox Management</h1>
    </header>
  );
};

export default AdminHeader;
