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

### Prerequisites

You'll need a few things installed before we get started:
- **Node.js** version 18 or newer (check with `node --version` if you're not sure)
- **MongoDB** database (MongoDB Atlas is free and works great, or you can run it locally)
- An **email account** for sending order confirmations (Gmail is the easiest option)



******
**IMPORTANT:-**
---
**Before starting setup i would like to request you to enable third party cookies in your 
  browser as per project requirements**
---
*******



### Step 1: Set Up the Backend

Let's start with the backend. Open your terminal and navigate into the backend folder:

```bash
cd backend
```

Now install all the required packages:

```bash
npm install
```
This might take a minute, but once it's done, we need to create a 
configuration file. Create a new file called `.env` in the backend folder and 
add these settings:

This might take a minute, but once it's done, we need to create a 
configuration file. Create a new file called `.env` in the backend folder and 
add these settings:
This might take a minute, but once it's done, we need to create a configuration file. 

**Recommended:** 
PORT=5000
MONGO_URI=mongodb+srv://bunny:Bunny30@cluster0.sivzqdl.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=vnbvurybfviuybrv
NODE_ENV=production
EMAIL_USER=srichaithanyakarri30@gmail.com
EMAIL_PASS=pjkndufxifzncgfx
EMAIL_SERVICE=gmail
EMAIL_FROM=srichaithanyakarri30@gmail.com
EMAIL_FROM_NAME=StyleVault
FRONTEND_URL=http://localhost:5173

**Or create it manually:** Create a new file called `.env` in the backend folder and use this exact format (all 10 lines):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=create_a_long_random_secret_key_here
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
EMAIL_SERVICE=gmail
EMAIL_FROM=your_email_address
EMAIL_FROM_NAME=StyleVault
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Make sure to replace all the placeholder values with your actual credentials. Keep this file secure and never commit it to version control.

**A few notes about these settings:**

For `MONGO_URI`, you have a couple of options:
- **MongoDB Atlas** (cloud): `mongodb+srv://username:password@cluster.mongodb.net/ecommerce`
- **Local MongoDB**: `mongodb://localhost:27017/ecommerce`

For `JWT_SECRET`, just generate a random string. Something like `mySuperSecretKey123456789` works fine for development.

For email setup with Gmail:
- You'll need to enable 2-Step Verification on your Google Account
- Then create an App Password (go to Google Account → Security → App Passwords)
- Use that App Password in `EMAIL_PASS`, not your regular Gmail password

Once your `.env` file is ready, let's populate the database with some sample products:

```bash
npm run seed
```

You should see a message saying it successfully seeded the products. This adds about 28 clothing items so you'll have something to browse when testing.

Now we're ready to start the server:

```bash
npm run dev
```

You should see a message saying "Connected to MongoDB" and "Server running on port 5000". Keep this terminal window open - the server needs to keep running.

### Step 2: Set Up the Frontend

Open a **new terminal window** (keep the backend running) and navigate to the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Once that's done, start the development server:

```bash
npm run dev
```

The terminal will show you a local URL (usually `http://localhost:5173`), and your browser should open automatically. If it doesn't, just visit that URL manually.

The frontend is now running! Any changes you make to the code will automatically refresh in your browser, which is really handy for development.

### Running the Application

With both servers running, you should have:
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:5173`

Just visit the frontend URL in your browser and you're good to go. The frontend will automatically communicate with the backend, so make sure both are running when you're testing the app.

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
