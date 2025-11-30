import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to login if not authenticated
  if (!authLoading && !user) {
    navigate('/login', { state: { from: { pathname: '/checkout' } } });
    return null;
  }

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.post('/orders');
      clearCart();
      navigate(`/order/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="checkout-page">
        <div className="container">
          <div className="spinner-container">
            <div className="spinner large"></div>
            <div className="spinner-text">Loading checkout...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <div className="checkout-content">
          <div className="order-summary">
            <h2>Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item._id} className="summary-item">
                <div>
                  <h4>{item.product.name}</h4>
                  <p>Size: {item.size} × {item.quantity}</p>
                </div>
                <div className="item-price">
                  <span className="price-symbol">₹</span>
                  <span className="price-amount">{(item.product.price * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                </div>
              </div>
            ))}
            
            <div className="summary-total">
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
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              onClick={handleCheckout}
              disabled={loading || cartItems.length === 0}
              className="place-order-btn"
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="spinner small" style={{ margin: 0, borderWidth: '2px', width: '16px', height: '16px' }}></span>
                  Placing Order...
                </span>
              ) : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

