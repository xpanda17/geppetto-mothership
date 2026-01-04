import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN_SECONDS = process.env.JWT_EXPIRES_IN || '15m';

/**
 * Generates a signed JWT for a user
 * @param {Object} user - User object containing id, username, fullName, and role
 */
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    fullName: user.fullName,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN_SECONDS
  });
};

/**
 * Verifies a given JWT token
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
