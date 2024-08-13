import React from 'react';
import '../css/AdminDashboard.css'; // Import CSS for AdminDashboard
import '../pages/Home/Home.css'
import Home from './Home/Home';
const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Home />
    </div>
  );
};

export default AdminDashboard;
