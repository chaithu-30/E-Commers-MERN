import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      console.log('=== AUTH FAILED ===');
      console.log('Cookies received:', req.cookies);
      console.log('Cookie header string:', req.headers.cookie || 'NO COOKIE HEADER');
      console.log('Request origin:', req.headers.origin);
      console.log('Request referer:', req.headers.referer);
      return res.status(401).json({ 
        message: 'Not authorized, no token',
        debug: {
          cookiesReceived: Object.keys(req.cookies),
          hasCookieHeader: !!req.headers.cookie
        }
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

