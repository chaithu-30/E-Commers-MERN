import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { sendOrderEmail } from '../utils/sendEmail.js';

export const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      name: item.product.name,
      size: item.size,
      quantity: item.quantity,
      price: item.product.price
    }));

    const totalPrice = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice
    });

    cart.items = [];
    await cart.save();

    const user = await User.findById(req.user._id);

    try {
      const emailResult = await sendOrderEmail(order, user);
      if (!emailResult.success) {
        console.warn('Order created but email was not sent:', emailResult.message || emailResult.error);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

