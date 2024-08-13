import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHeader from './components/AdminHeader'; // Adjusted import path
import AdminSidebar from './components/AdminSidebar'; // Adjusted import path
import AdminDashboard from './pages/AdminDashboard'; // Adjusted import path
import ProductManagement from './pages/ProductManagement'; // Adjusted import path
import OrderManagement from './pages/OrderManagement'; // Adjusted import path
import UserManagement from './pages/UserManagement'; // Adjusted import path
import AdminHomePage from './pages/AdminHomePage'; // Adjusted import path
import './App.css'; // Adjusted import path

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <AdminHeader />
        <div className="main-content">
          <AdminSidebar />
          <div className="content">
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/home" element={<AdminHomePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
