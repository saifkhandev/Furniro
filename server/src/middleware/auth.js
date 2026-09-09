import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // Read token from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      // Attach user to request (excluding password and refreshToken)
      req.user = await User.findById(decoded.id).select('-password -refreshToken');

      if (!req.user) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found',
        });
      }

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: 'error',
          message: 'Token expired',
        });
      }
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided',
    });
  }
};

// Admin-only middleware
export const admin = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Access denied: admin only',
    });
  }
  next();
};

export default { protect, admin };