import { useNavigate, useParams } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  return (
    <div className="order-success-page">
      <div className="container">
        <div className="success-content">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          {orderId && (
            <p className="order-id">Order ID: {orderId}</p>
          )}
          <p className="success-message">
            Thank you for your order! A confirmation email has been sent to your email address.
          </p>
          <div className="success-actions">
            <button onClick={() => navigate('/products')} className="continue-shopping">
              Continue Shopping
            </button>
            <button onClick={() => navigate('/')} className="go-home">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

