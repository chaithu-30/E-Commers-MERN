import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const { cartItems, getTotalPrice, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="spinner-container">
            <div className="spinner large"></div>
            <div className="spinner-text">Loading your cart...</div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/products')} className="shop-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <div className="price-display">
                <span className="price-symbol">₹</span>
                <span className="price-amount">{getTotalPrice().toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
              </div>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <div className="price-display">
                <span className="price-symbol">₹</span>
                <span className="price-amount">{getTotalPrice().toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
              </div>
            </div>
            
            <button onClick={handleCheckout} className="checkout-btn">
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            {!user && (
              <p className="guest-notice">
                <Link to="/login" style={{ color: '#007185', textDecoration: 'underline' }}>
                  Sign in
                </Link> to checkout and save your cart for later
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

