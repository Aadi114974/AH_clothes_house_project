// admin/src/pages/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../../App'; // Adjust path if needed (relative to admin folder)
import UpdateProduct from '../components/UpdateProduct'; // Import the UpdateProduct component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const token = localStorage.getItem('token'); // Or however you store your token in the admin panel

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/product/`); // Assuming you have a get all products endpoint
                setProducts(response.data.products); // Adjust based on your API response
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleUpdateClick = (productId) => {
        setSelectedProductId(productId);
    };

    const handleCloseUpdatePanel = () => {
        setSelectedProductId(null); // Clear the selected product ID to close the panel
    };

    return (
        <div>
            <h2>Product List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(product._id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedProductId && (
                <div className="update-panel"> {/* Add a container for styling */}
                    <h3>Update Product</h3>
                    <UpdateProduct productId={selectedProductId} token={token} />
                    <button onClick={handleCloseUpdatePanel}>Close</button> {/* Button to close the update panel */}
                </div>
            )}
        </div>
    );
};

export default ProductList;
