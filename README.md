
# 👕 AH Clothes House – Full Stack E-commerce Clothing Website

AH Clothes House is a full-featured e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse clothing products, manage carts, register/login securely, and place orders. Admins can manage inventory, update product details, and monitor orders.

## 🚀 Features

### 🛍️ User Features
- User Registration & Login (with JWT & bcrypt)
- Browse and search clothing products
- Product categories & filters
- Add to Cart and Wishlist
- Secure Checkout and Order Placement
- Order History and Tracking

### 🔧 Admin Features
- Admin Login
- Add / Edit / Delete Products
- View & Manage Orders
- Manage Users
- Dashboard Analytics (basic)

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, Axios, Bootstrap/Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT, bcrypt
- **Deployment:** Vercel (Frontend), Render (Backend)
- **Others:** RESTful APIs, CORS, dotenv

## 🔌 API Working (Backend)

### Base URL:  
`https://your-backend-url.com/api`

### 🔐 Authentication
- `POST /auth/register` – Create new user  
- `POST /auth/login` – Login user & get JWT token  
- `GET /auth/user` – Get current user (with token)

### 🧾 Products
- `GET /products` – Get all products  
- `GET /products/:id` – Get product by ID  
- `POST /products` – Add product (admin only)  
- `PUT /products/:id` – Update product (admin only)  
- `DELETE /products/:id` – Delete product (admin only)

### 🛒 Cart
- `POST /cart` – Add item to cart  
- `GET /cart` – Get user's cart  
- `DELETE /cart/:id` – Remove item from cart

### 📦 Orders
- `POST /orders` – Place order  
- `GET /orders` – Get all orders (admin)  
- `GET /orders/user` – Get user's orders  
- `PUT /orders/:id` – Update order status (admin)

## 🖥️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/ah-clothes-house.git
cd ah-clothes-house

# Backend Setup
cd backend
npm install
npm start

# Frontend Setup
cd ../frontend
npm install
npm start
```

## 📎 Environment Variables

Create a `.env` file in the backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## 📦 Deployment

- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)

## 👨‍💻 Author

- **Aaditya Raaz** – [LinkedIn](https://linkedin.com/in/yourprofile) | [GitHub](https://github.com/yourusername)
