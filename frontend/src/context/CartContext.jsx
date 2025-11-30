import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  const loadCartFromBackend = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await api.get('/cart');
      const items = response.data.items.map(item => ({
        _id: item._id,
        productId: item.product._id,
        product: item.product,
        size: item.size,
        quantity: item.quantity
      }));
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart from backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncCartWithBackend = async (localItems) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const items = localItems.map(item => ({
        productId: item.productId || item.product._id,
        size: item.size,
        quantity: item.quantity
      }));
      await api.post('/cart/sync', { items });
      localStorage.removeItem('cart');
      await loadCartFromBackend();
    } catch (error) {
      console.error('Error syncing cart with backend:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;

    if (user) {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        try {
          const localItems = JSON.parse(localCart);
          if (localItems.length > 0) {
            syncCartWithBackend(localItems);
          } else {
            loadCartFromBackend();
          }
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          localStorage.removeItem('cart');
          loadCartFromBackend();
        }
      } else {
        loadCartFromBackend();
      }
    } else {
      const localCart = localStorage.getItem('cart');
      if (localCart) {
        try {
          const parsedCart = JSON.parse(localCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error('Error parsing cart from localStorage:', error);
          localStorage.removeItem('cart');
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user, authLoading]);

  const addToCart = async (product, size, quantity = 1) => {
    const item = {
      _id: Date.now().toString(),
      productId: product._id,
      product,
      size,
      quantity
    };

    if (user) {
      setLoading(true);
      try {
        await api.post('/cart/add', {
          productId: product._id,
          size,
          quantity
        });
        await loadCartFromBackend();
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert(error.response?.data?.message || 'Failed to add item to cart');
      } finally {
        setLoading(false);
      }
    } else {
      const existingItemIndex = cartItems.findIndex(
        item => item.productId === product._id && item.size === size
      );

      let updatedItems;
      if (existingItemIndex > -1) {
        updatedItems = [...cartItems];
        updatedItems[existingItemIndex].quantity += quantity;
      } else {
        updatedItems = [...cartItems, item];
      }

      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (user) {
      setLoading(true);
      try {
        await api.put('/cart/update', { itemId, quantity });
        await loadCartFromBackend();
      } catch (error) {
        console.error('Error updating cart:', error);
        alert(error.response?.data?.message || 'Failed to update item');
      } finally {
        setLoading(false);
      }
    } else {
      const updatedItems = cartItems.map(item =>
        item._id === itemId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const removeFromCart = async (itemId) => {
    if (user) {
      setLoading(true);
      try {
        await api.delete('/cart/remove', { data: { itemId } });
        await loadCartFromBackend();
      } catch (error) {
        console.error('Error removing from cart:', error);
        alert(error.response?.data?.message || 'Failed to remove item');
      } finally {
        setLoading(false);
      }
    } else {
      const updatedItems = cartItems.filter(item => item._id !== itemId);
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    window.clearCart = clearCart;
    return () => {
      delete window.clearCart;
    };
  }, []);

  const getTotalItems = () => {
    return cartItems.length;
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    loadCartFromBackend
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

