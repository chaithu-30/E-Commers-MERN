# StyleVault E-Commerce Application

A full-stack e-commerce website for a clothing brand built with the MERN stack. This application handles everything from user registration to order processing with email confirmations.

## What This Application Does

StyleVault is a complete online shopping platform where customers can browse clothing items, add products to their cart, and place orders. The system supports both guest users and registered accounts, with secure authentication and persistent shopping carts.

## Features

**User Accounts**
- Simple registration and login system
- Secure password storage
- User profiles and order history
- Session management with secure tokens

**Product Browsing**
- View all available clothing items
- Search products by name
- Filter by category, size, and price range
- Product detail pages with descriptions
- Pagination for easy navigation

**Shopping Cart**
- Add items to cart as a guest user (saved in browser)
- Cart syncs to your account when you log in
- Update quantities and remove items
- Persistent cart across sessions for logged-in users

**Checkout Process**
- Secure checkout page for order placement
- Order summary with itemized list
- Order confirmation emails sent automatically
- Order tracking with unique order IDs

**Additional Features**
- Responsive design that works on phones, tablets, and desktops
- Fast search and filtering
- Guest mode for browsing without an account
- Protected routes that require login for checkout
- Email notifications for order confirmations

## Technologies Used

**Backend**
- Node.js and Express.js for the server
- MongoDB database for storing data
- JWT authentication with secure cookie storage
- bcryptjs for password security
- Nodemailer for sending emails

**Frontend**
- React for the user interface
- Vite for fast development and builds
- React Router for page navigation
- Context API for managing app state
- Axios for API calls

## Project Structure

```
E-Commerce/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── utils/
│   │   └── sendEmail.js
│   ├── seedProducts.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── CartItem.jsx
│   │   │   ├── Filters.css
│   │   │   ├── Filters.jsx
│   │   │   ├── GuestAccessibleRoute.jsx
│   │   │   ├── Logo.jsx
│   │   │   ├── Navbar.css
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.css
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── AuthPage.css
│   │   │   ├── Cart.css
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.css
│   │   │   ├── Checkout.jsx
│   │   │   ├── Home.css
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── OrderSuccess.css
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── ProductDetail.css
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Products.css
│   │   │   ├── Products.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

The backend folder contains all server-side code. The config folder has database connection setup. Controllers handle the business logic for authentication, products, cart, and orders. Models define the database schemas. Routes set up the API endpoints. Middleware handles authentication and error handling. Utils contains helper functions like email sending. The seedProducts.js file populates the database with sample products.

The frontend folder contains the React application. Components are reusable UI elements like the navbar, product cards, and filters. Context manages global state for authentication and shopping cart. Pages are the main route components like home, products, cart, and checkout. Services handle API communication. The App.jsx file sets up routing, and main.jsx is the entry point.

## Getting Started

### What You Need

Before starting, make sure you have:
- Node.js version 18 or newer installed
- A MongoDB database (you can use MongoDB Atlas for free)
- An email account for sending order confirmation emails (Gmail works fine)

### Setting Up the Backend

First, open a terminal and navigate to the backend folder:

```
cd backend
```

Install all required packages:

```
npm install
```

Create a file named .env in the backend folder with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=create_a_long_random_secret_key_here
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
EMAIL_SERVICE=gmail
EMAIL_FROM=your_email_address
EMAIL_FROM_NAME=StyleVault
```

For the MongoDB connection string:
- If using MongoDB Atlas, it looks like: mongodb+srv://username:password@cluster.mongodb.net/ecommerce
- If using local MongoDB, it looks like: mongodb://localhost:27017/ecommerce

For email setup with Gmail:
- You'll need to create an App Password in your Google Account settings
- Enable 2-Step Verification first, then generate the App Password
- Use that App Password in EMAIL_PASS, not your regular Gmail password

For testing emails without sending real emails:
- You can use Mailtrap service which provides test credentials
- Set EMAIL_SERVICE=mailtrap and use Mailtrap's host and credentials

Once your .env file is set up, seed the database with sample products:

```
npm run seed
```

This will add about 26 clothing items to your database so you have products to display.

Now start the backend server:

```
npm run dev
```

The server will run on port 5000. You should see a message confirming the database connection and that the server is running.

### Setting Up the Frontend

Open a new terminal window and navigate to the frontend folder:

```
cd frontend
```

Install all required packages:

```
npm install
```

Start the development server:

```
npm run dev
```

The frontend will open in your browser at http://localhost:5173. The Vite development server automatically reloads when you make changes to the code.

## How to Use the Application

**Browse Products**
- The home page welcomes visitors with information about StyleVault
- Click "Shop Collection" to view all available products
- Use the search bar to find specific items
- Apply filters to narrow down by category, size, or price

**View Product Details**
- Click on any product card to see full details
- Select a size from the available options
- Choose quantity and add to cart

**Shopping Cart**
- Items added to cart are saved even if you're not logged in
- As a guest, your cart is stored in your browser
- When you log in, your cart automatically syncs to your account
- You can update quantities or remove items anytime

**Creating an Account**
- Click Register to create a new account
- Enter your name, email, and password
- After registration, you're automatically logged in
- Or use "Continue as Guest" to browse without an account

**Checkout Process**
- You must be logged in to checkout
- Review your order summary
- Place order to complete the purchase
- You'll receive an email confirmation with order details

**Order Confirmation**
- After placing an order, you'll see a success page
- Check your email for the order confirmation
- The email includes all order details and order ID

## API Endpoints

The backend provides several API endpoints:

Authentication endpoints handle user registration, login, logout, and profile access. Product endpoints return lists of products with filtering options or individual product details. Cart endpoints manage adding items, updating quantities, removing items, and syncing carts. Order endpoints handle creating new orders and retrieving order history.

All cart and order endpoints require authentication, meaning users must be logged in to access them.
