import React from 'react';
import '../css/AdminHomePage.css'; // Import CSS for AdminHomePage
import Home from './Home/Home';
import '../pages/Home/Home.css'

const AdminHomePage = () => {
  return (
    <div className="admin-home-page">
      <Home />
    </div>
  );
};

export default AdminHomePage;
