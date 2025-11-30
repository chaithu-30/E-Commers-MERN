import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https';
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    
    if (isProduction) {
      cookieOptions.secure = true;
      cookieOptions.sameSite = 'none';
    } else {
      cookieOptions.secure = false;
      cookieOptions.sameSite = 'lax';
    }
    
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    const isProduction = process.env.NODE_ENV === 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https';
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    
    if (isProduction) {
      cookieOptions.secure = true;
      cookieOptions.sameSite = 'none';
    } else {
      cookieOptions.secure = false;
      cookieOptions.sameSite = 'lax';
    }
    
    res.cookie('token', token, cookieOptions);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production' || req.secure || req.headers['x-forwarded-proto'] === 'https';
  const cookieOptions = {
    httpOnly: true,
    path: '/',
    expires: new Date(0)
  };
  
  if (isProduction) {
    cookieOptions.secure = true;
    cookieOptions.sameSite = 'none';
  } else {
    cookieOptions.secure = false;
    cookieOptions.sameSite = 'lax';
  }
  
  res.cookie('token', '', cookieOptions);
  res.json({ message: 'Logged out successfully' });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

