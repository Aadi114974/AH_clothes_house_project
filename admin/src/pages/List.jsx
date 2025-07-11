import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ListItems = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedCategory, setUpdatedCategory] = useState("");

  const fetchAllProducts = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`, { headers: { token } });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [token]);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setUpdatedName(product.name);
    setUpdatedPrice(product.price);
    setUpdatedCategory(product.category);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${backendUrl}/api/product/update/${editingProduct._id}`, {
        name: updatedName,
        price: updatedPrice,
        category: updatedCategory,
      }, { headers: { token } });

      if (response.data.success) {
        toast.success("Product updated successfully!");
        setEditingProduct(null);
        fetchAllProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteClick = async (productId) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/delete/${productId}`, { headers: { token } });

      if (response.data.success) {
        toast.success("Product deleted successfully!");
        fetchAllProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h3>Product List</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">
                <img className="w-12" src={product.image} alt={product.name} />
              </td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <button className="p-2 bg-blue-500 text-white rounded" onClick={() => handleEditClick(product)}>Edit</button>
                <button className="p-2 bg-red-500 text-white rounded" onClick={() => handleDeleteClick(product._id)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingProduct && (
        <form onSubmit={handleUpdateSubmit} className="mt-5">
          <h3>Edit Product</h3>
          <label>Name:</label>
          <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <label>Price:</label>
          <input type="number" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
          <label>Category:</label>
          <input type="text" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)} />
          <button type="submit" className="p-2 bg-green-500 text-white rounded">Update</button>
        </form>
      )}
    </div>
  );
};

export default ListItems;
