


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [form, setForm] = useState({
    adminId: '',
    image: null,
    name: '',
    price: '',
    total_price: '',
    status: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (currentProduct) {
      setForm({
        adminId: currentProduct.adminId,
        image: currentProduct.image,
        name: currentProduct.name,
        price: currentProduct.price,
        total_price: currentProduct.total_price,
        status: currentProduct.status,
      });
    } else {
      setForm({
        adminId: '',
        image: null,
        name: '',
        price: '',
        total_price: '',
        status: '',
      });
    }
  }, [currentProduct]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProduct) {
        await axios.put(`http://localhost:8080/api/products/${currentProduct.id}`, form);
      } else {
        await axios.post('http://localhost:8080/api/products', form);
      }
      fetchProducts();
      setCurrentProduct(null);
      setForm({
        adminId: '',
        image: null,
        name: '',
        price: '',
        total_price: '',
        status: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <input
          type="text"
          name="adminId"
          value={form.adminId}
          onChange={handleInputChange}
          placeholder="Admin ID"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
        />
        {form.image && <img src={form.image} alt="Preview" className="image-preview" />}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
        />
        <input
          type="text"
          name="total_price"
          value={form.total_price}
          onChange={handleInputChange}
          placeholder="Total Price"
        />
        <input
          type="text"
          name="status"
          value={form.status}
          onChange={handleInputChange}
          placeholder="Status"
        />
        <button type="submit">{currentProduct ? 'Update Product' : 'Add Product'}</button>
        {currentProduct && <button type="button" onClick={() => setCurrentProduct(null)}>Cancel</button>}
      </form>
      <div className="product-list">
        <h3>Product List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Admin ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.adminId}</td>
                <td><img src={product.image} alt={product.name} className="image-preview" /></td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.total_price ? `₹${product.total_price}` : '-'}</td>
                <td>{product.status || '-'}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
