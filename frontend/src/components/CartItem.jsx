import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.product.imageUrl} alt={item.product.name} />
      </div>
      
      <div className="item-details">
        <h3>{item.product.name}</h3>
        <p>Size: {item.size}</p>
        <div className="item-price">
          <span className="price-symbol">₹</span>
          <span className="price-amount">{item.product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
      </div>

      <div className="item-quantity">
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
          +
        </button>
      </div>

      <div className="item-total">
        <div className="price-display">
          <span className="price-symbol">₹</span>
          <span className="price-amount">{(item.product.price * item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item._id)}
        className="remove-btn"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;

