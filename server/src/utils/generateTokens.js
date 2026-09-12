import jwt from 'jsonwebtoken';

/**
 * Generate JWT Access Token
 * @param {string} userId
 * @param {string} role
 * @returns {string} Access Token
 */
export const generateAccessToken = (userId, role = 'user') => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_ACCESS_SECRET || 'fallback_access_secret',
    { expiresIn: '15m' }
  );
};

/**
 * Generate JWT Refresh Token
 * @param {string} userId
 * @returns {string} Refresh Token
 */
export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret',
    { expiresIn: '7d' }
  );
};
